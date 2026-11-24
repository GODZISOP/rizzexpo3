import { useEffect, useRef, useState } from 'react';
import { Film, FlipHorizontal, RotateCcw, Sparkles, Upload, X } from 'lucide-react';

interface Manifest1D {
  mode: '1d';
  frames: string[];
  invertX?: boolean;
}

interface Manifest2D {
  mode: '2d';
  rows: string[][];
  invertX?: boolean;
  invertY?: boolean;
}

type FrameManifest = Manifest1D | Manifest2D;

interface DogFrameStageProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

/**
 * Production-ready Cursor-Tracked Dog Stage:
 * 1. Automatically loads `/frames/manifest.json` (1D Left<->Right or 2D grid frames) onto a 60fps HiDPI <canvas>.
 * 2. Lets you drag-and-drop an MP4 video or multi-frame image folder directly in the browser to preview immediately.
 * 3. While frames are being generated, renders an expressive 2.5D cursor-following Border Collie ("Biscuit")
 *    with smooth head parallax, pupil tracking, ear perk, natural blinking, breathing, and wagging tail!
 */
export function DogFrameStage({ heroRef }: DogFrameStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Loaded frame bitmaps: rows[rowIndex][colIndex]
  const framesRef = useRef<HTMLImageElement[][]>([]);
  const [frameCount, setFrameCount] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [invertX, setInvertX] = useState(false);
  const [featherEdges, setFeatherEdges] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [extractingMsg, setExtractingMsg] = useState<string | null>(null);

  // Normalized smooth gaze state (-1..+1); default slightly left toward hero headline like PAWZO
  const targetGaze = useRef({ x: -0.32, y: 0.04 });
  const currentGaze = useRef({ x: -0.32, y: 0.04 });
  const [gaze, setGaze] = useState({ x: -0.32, y: 0.04, near: false });
  const [isBlinking, setIsBlinking] = useState(false);

  // Natural blinking timer for the fallback dog
  useEffect(() => {
    if (frameCount > 0) return;
    let timeoutId = 0;
    const scheduleBlink = () => {
      const delay = 2600 + Math.random() * 2800;
      timeoutId = window.setTimeout(() => {
        setIsBlinking(true);
        window.setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 145);
      }, delay);
    };
    scheduleBlink();
    return () => window.clearTimeout(timeoutId);
  }, [frameCount]);

  // Auto-load `/frames/manifest.json` if the user has placed frames in `public/frames/`
  useEffect(() => {
    let cancelled = false;

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    fetch('/frames/manifest.json')
      .then((res) => (res.ok ? res.json() : null))
      .then(async (manifest: FrameManifest | null) => {
        if (!manifest || cancelled) return;

        if (manifest.mode === '1d' && manifest.frames?.length) {
          const imgs = await Promise.all(
            manifest.frames.map((f) => loadImage(f.startsWith('/') ? f : `/frames/${f}`))
          );
          if (cancelled) return;
          framesRef.current = [imgs];
          setRowCount(1);
          setFrameCount(imgs.length);
          if (manifest.invertX) setInvertX(true);
        } else if (manifest.mode === '2d' && manifest.rows?.length) {
          const rows = await Promise.all(
            manifest.rows.map((row) =>
              Promise.all(row.map((f) => loadImage(f.startsWith('/') ? f : `/frames/${f}`)))
            )
          );
          if (cancelled) return;
          framesRef.current = rows;
          setRowCount(rows.length);
          setFrameCount(rows.reduce((sum, r) => sum + r.length, 0));
          if (manifest.invertX) setInvertX(true);
        }
      })
      .catch(() => {
        // No manifest yet — stay in interactive 2.5D Biscuit mode cleanly
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Track pointer across window and run smooth 60fps loop
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      // Anchor focal center near the dog's face on the right third of the hero
      const nx = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      const ny = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1;
      targetGaze.current.x = Math.max(-1, Math.min(1, nx));
      targetGaze.current.y = Math.max(-1, Math.min(1, ny));
    };

    const onPointerLeave = () => {
      targetGaze.current.x = -0.22;
      targetGaze.current.y = 0.04;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    const renderCanvasFrame = (gx: number, gy: number) => {
      const canvas = canvasRef.current;
      const rows = framesRef.current;
      if (!canvas || rows.length === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;
      if (displayW === 0 || displayH === 0) return;

      if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
        canvas.width = Math.round(displayW * dpr);
        canvas.height = Math.round(displayH * dpr);
      }

      const normX = (invertX ? -gx : gx) * 0.5 + 0.5; // 0..1
      const normY = gy * 0.5 + 0.5; // 0..1

      const rowIdx = Math.min(rows.length - 1, Math.max(0, Math.round(normY * (rows.length - 1))));
      const row = rows[rowIdx];
      if (!row || row.length === 0) return;
      const colIdx = Math.min(row.length - 1, Math.max(0, Math.round(normX * (row.length - 1))));
      const img = row[colIdx];
      if (!img || !img.complete) return;

      // Full-bleed object-fit: cover math (right-biased so dog stays framed cleanly on narrow screens)
      const cw = canvas.width;
      const ch = canvas.height;
      const imgRatio = img.naturalWidth / Math.max(1, img.naturalHeight);
      const canvasRatio = cw / Math.max(1, ch);

      let drawW = cw;
      let drawH = ch;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        offsetY = (ch - drawH) * 0.45;
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        // Anchor towards right (74%) on tall/mobile screens so dog remains centered in view
        offsetX = (cw - drawW) * 0.74;
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    };

    let lastReactPush = 0;
    const tick = (now: number) => {
      const ease = reducedMotion ? 1 : 0.12;
      currentGaze.current.x += (targetGaze.current.x - currentGaze.current.x) * ease;
      currentGaze.current.y += (targetGaze.current.y - currentGaze.current.y) * ease;

      if (framesRef.current.length > 0) {
        renderCanvasFrame(currentGaze.current.x, currentGaze.current.y);
      } else if (now - lastReactPush > 16) {
        lastReactPush = now;
        const distFromDog = Math.hypot(currentGaze.current.x - 0.42, currentGaze.current.y - 0.05);
        setGaze({
          x: currentGaze.current.x,
          y: currentGaze.current.y,
          near: distFromDog < 0.45,
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [heroRef, invertX]);

  // Handle user selecting multiple extracted frame images directly in browser
  const handleSelectFrames = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const sorted = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    if (sorted.length === 0) return;
    setExtractingMsg(`Loading ${sorted.length} frames...`);

    try {
      const imgs = await Promise.all(
        sorted.map(
          (file) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const url = URL.createObjectURL(file);
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = url;
            })
        )
      );
      framesRef.current = [imgs];
      setRowCount(1);
      setFrameCount(imgs.length);
      // Automatically suggest edge feathering if frame is narrower than 16:9
      const ratio = imgs[0].naturalWidth / Math.max(1, imgs[0].naturalHeight);
      setFeatherEdges(ratio < 1.45);
      setExtractingMsg(null);
    } catch {
      setExtractingMsg('Could not read those image files.');
    }
  };

  // Handle user dropping an MP4 video directly — extracts 48 smooth frames right in the browser!
  const handleSelectVideo = async (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    setExtractingMsg('Extracting 48 smooth frames from video...');

    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    const url = URL.createObjectURL(file);
    video.src = url;

    try {
      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error('Video load failed'));
      });

      const totalFrames = 48;
      const duration = Math.max(0.2, video.duration);
      const offscreen = document.createElement('canvas');
      const maxW = 1280;
      const scale = Math.min(1, maxW / Math.max(1, video.videoWidth));
      offscreen.width = Math.round(video.videoWidth * scale);
      offscreen.height = Math.round(video.videoHeight * scale);
      const octx = offscreen.getContext('2d');
      if (!octx) throw new Error('Canvas unsupported');

      const extracted: HTMLImageElement[] = [];

      for (let i = 0; i < totalFrames; i++) {
        const t = (i / (totalFrames - 1)) * Math.max(0.05, duration - 0.04);
        await new Promise<void>((resolve) => {
          const onSeeked = () => {
            video.removeEventListener('seeked', onSeeked);
            resolve();
          };
          video.addEventListener('seeked', onSeeked);
          video.currentTime = t;
        });

        octx.drawImage(video, 0, 0, offscreen.width, offscreen.height);
        const dataUrl = offscreen.toDataURL('image/webp', 0.86);
        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = dataUrl;
        });
        extracted.push(img);
        setExtractingMsg(`Extracting frames... ${i + 1}/${totalFrames}`);
      }

      URL.revokeObjectURL(url);
      framesRef.current = [extracted];
      setRowCount(1);
      setFrameCount(extracted.length);
      const ratio = video.videoWidth / Math.max(1, video.videoHeight);
      setFeatherEdges(ratio < 1.45);
      setExtractingMsg(null);
    } catch {
      URL.revokeObjectURL(url);
      setExtractingMsg('Could not decode video. Try MP4 (H.264) or image frames.');
    }
  };

  const resetToInteractiveDog = () => {
    framesRef.current = [];
    setFrameCount(0);
    setRowCount(0);
    setExtractingMsg(null);
  };

  // Derived parallax offsets for the interactive 2.5D Border Collie ("Biscuit")
  const headX = gaze.x * 16;
  const headY = gaze.y * 10;
  const headTilt = gaze.x * 6.5;
  const muzzleX = gaze.x * 24;
  const muzzleY = gaze.y * 13;
  const eyeSocketX = gaze.x * 18;
  const eyeSocketY = gaze.y * 10;
  const pupilX = gaze.x * 8.5;
  const pupilY = gaze.y * 6;
  const earOffset = gaze.x * 9;

  return (
    <>
      {/* MODE 1: Full-Bleed 16:9 Cursor-Scrubbed Canvas (Active as soon as frames or MP4 are loaded) */}
      {frameCount > 0 && (
        <div
          className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${
            featherEdges ? 'frame-feather-mask' : ''
          }`}
        >
          <canvas
            ref={canvasRef}
            className="h-full w-full block"
            aria-label="Interactive dog following your cursor"
          />
          {/* Gentle left-side scrim so hero typography stays razor legible over any video */}
          <div className="hero-vignette absolute inset-0" />
        </div>
      )}

      {/* MODE 2: Interactive 2.5D Border Collie ("Biscuit") — Live until your AI video frames drop in */}
      {frameCount === 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-full items-end justify-center lg:w-[54%] lg:justify-center lg:pr-8"
        >
          {/* Warm sunlit halo behind Biscuit */}
          <div
            className="absolute bottom-8 h-[430px] w-[430px] rounded-full opacity-55 blur-3xl transition-transform duration-300 lg:h-[540px] lg:w-[540px]"
            style={{
              background: 'radial-gradient(circle, #FFE599 0%, rgba(235,181,64,0) 70%)',
              transform: `translate3d(${gaze.x * -14}px, ${gaze.y * -10}px, 0)`,
            }}
          />

          <svg
            viewBox="0 0 520 620"
            className="relative h-[430px] w-auto max-w-[92vw] select-none drop-shadow-[0_32px_42px_rgba(68,45,8,0.42)] sm:h-[510px] lg:h-[min(85vh,650px)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="furDark" cx="42%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#3B3D47" />
                <stop offset="55%" stopColor="#23252C" />
                <stop offset="100%" stopColor="#14161B" />
              </radialGradient>
              <radialGradient id="furWhite" cx="50%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="68%" stopColor="#F3EFE7" />
                <stop offset="100%" stopColor="#D9D1C3" />
              </radialGradient>
              <linearGradient id="collarBlue" x1="165" y1="322" x2="355" y2="364" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F97D8" />
                <stop offset="50%" stopColor="#2F76B8" />
                <stop offset="100%" stopColor="#1D4E89" />
              </linearGradient>
              <linearGradient id="tonguePink" x1="255" y1="276" x2="275" y2="338" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF969E" />
                <stop offset="65%" stopColor="#EC6A77" />
                <stop offset="100%" stopColor="#C84B59" />
              </linearGradient>
              <radialGradient id="noseGrad" cx="42%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#7C564C" />
                <stop offset="55%" stopColor="#4A2E28" />
                <stop offset="100%" stopColor="#2A1713" />
              </radialGradient>
              <radialGradient id="amberIris" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#D69542" />
                <stop offset="65%" stopColor="#8A4F1C" />
                <stop offset="100%" stopColor="#3D1F08" />
              </radialGradient>
            </defs>

            {/* Ground Contact Shadow */}
            <ellipse cx="262" cy="596" rx="158" ry="20" fill="#5D3F10" fillOpacity="0.45" />

            {/* Wagging Fluffy Tail behind body */}
            <g
              style={{
                transformOrigin: '340px 510px',
                transform: `rotate(${(gaze.near ? Math.sin(Date.now() / 110) * 14 : gaze.x * 10).toFixed(1)}deg)`,
                transition: 'transform 120ms ease-out',
              }}
            >
              <path
                d="M342 522C398 510 442 465 446 416C448 396 426 392 414 410C398 436 376 468 336 484Z"
                fill="url(#furDark)"
              />
              <path
                d="M424 402C438 394 449 404 446 420C444 434 434 444 422 442C416 428 416 412 424 402Z"
                fill="url(#furWhite)"
              />
            </g>

            {/* Sitting Torso & Haunches (Subtle breathing parallax) */}
            <g
              style={{
                transform: `translate3d(${(gaze.x * 4).toFixed(1)}px, ${(gaze.y * 2).toFixed(1)}px, 0)`,
              }}
            >
              {/* Back haunches */}
              <ellipse cx="176" cy="512" rx="68" ry="82" fill="url(#furDark)" />
              <ellipse cx="348" cy="512" rx="68" ry="82" fill="url(#furDark)" />

              {/* Main Torso */}
              <path
                d="M150 375C148 320 202 296 262 296C322 296 376 320 374 375L388 538C390 572 356 594 316 594H208C168 594 134 572 136 538L150 375Z"
                fill="url(#furDark)"
              />

              {/* Fluffy White Chest Ruff */}
              <path
                d="M196 346C216 332 308 332 328 346C344 398 334 480 262 518C190 480 180 398 196 346Z"
                fill="url(#furWhite)"
              />

              {/* Left Front Leg & White Paw */}
              <path
                d="M180 426C174 476 172 536 176 574C178 588 192 596 212 596C232 596 244 584 242 568L238 430Z"
                fill="url(#furDark)"
              />
              <path
                d="M175 520C194 514 222 514 240 520L242 570C244 586 232 596 210 596C188 596 174 588 175 572Z"
                fill="url(#furWhite)"
              />
              {/* Paw toe creases */}
              <path d="M197 576V594M216 576V594" stroke="#CEC5B6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Right Front Leg & White Paw */}
              <path
                d="M344 426C350 476 352 536 348 574C346 588 332 596 312 596C292 596 280 584 282 568L286 430Z"
                fill="url(#furDark)"
              />
              <path
                d="M349 520C330 514 302 514 284 520L282 570C280 586 292 596 314 596C336 596 350 588 349 572Z"
                fill="url(#furWhite)"
              />
              <path d="M327 576V594M308 576V594" stroke="#CEC5B6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Sky-Blue Collar + Hanging Cream Bone Tag */}
              <path
                d="M167 328C204 352 320 352 357 328C364 338 364 352 354 360C314 384 210 384 170 360C160 352 160 338 167 328Z"
                fill="url(#collarBlue)"
              />
              <path
                d="M178 336C214 354 310 354 346 336"
                stroke="#7CC0F5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeOpacity="0.65"
              />
              {/* Gold ring & bone charm */}
              <circle cx="262" cy="378" r="8" stroke="#F5C542" strokeWidth="4" />
              <g
                style={{
                  transformOrigin: '262px 382px',
                  transform: `rotate(${(-gaze.x * 7).toFixed(1)}deg)`,
                }}
              >
                <rect x="234" y="384" width="56" height="22" rx="11" fill="#FFF8E8" stroke="#DFC89B" strokeWidth="1.5" />
                <circle cx="235" cy="388" r="7" fill="#FFF8E8" />
                <circle cx="235" cy="402" r="7" fill="#FFF8E8" />
                <circle cx="289" cy="388" r="7" fill="#FFF8E8" />
                <circle cx="289" cy="402" r="7" fill="#FFF8E8" />
                <text
                  x="262"
                  y="399"
                  textAnchor="middle"
                  fill="#7A5B22"
                  fontSize="8.5"
                  fontWeight="800"
                  letterSpacing="0.8"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  RIZZEXPO
                </text>
              </g>
            </g>

            {/* HEAD GROUP — Smoothly tracks Bone Cursor in 2.5D */}
            <g
              style={{
                transformOrigin: '262px 245px',
                transform: `translate3d(${headX.toFixed(1)}px, ${headY.toFixed(1)}px, 0) rotate(${headTilt.toFixed(2)}deg)`,
              }}
            >
              {/* Left Perked Floppy Ear */}
              <g
                style={{
                  transformOrigin: '184px 128px',
                  transform: `rotate(${(-earOffset * 0.8 - (gaze.near ? 6 : 0)).toFixed(1)}deg)`,
                }}
              >
                <path
                  d="M196 116C166 76 118 82 104 118C94 144 114 176 142 174C162 172 176 154 190 144Z"
                  fill="url(#furDark)"
                />
                <path
                  d="M174 126C154 102 128 106 120 128C116 142 128 156 146 154C158 152 166 140 174 126Z"
                  fill="#4A3A3D"
                  fillOpacity="0.45"
                />
              </g>

              {/* Right Perked Floppy Ear */}
              <g
                style={{
                  transformOrigin: '340px 128px',
                  transform: `rotate(${(-earOffset * 0.8 + (gaze.near ? 6 : 0)).toFixed(1)}deg)`,
                }}
              >
                <path
                  d="M328 116C358 76 406 82 420 118C430 144 410 176 382 174C362 172 348 154 334 144Z"
                  fill="url(#furDark)"
                />
                <path
                  d="M350 126C370 102 396 106 404 128C408 142 396 156 378 154C366 152 358 140 350 126Z"
                  fill="#4A3A3D"
                  fillOpacity="0.45"
                />
              </g>

              {/* Main Cranium & Fluffy Cheeks */}
              <path
                d="M164 196C156 132 198 86 262 86C326 86 368 132 360 196C374 234 364 282 326 306C296 324 228 324 198 306C160 282 150 234 164 196Z"
                fill="url(#furDark)"
              />

              {/* Warm Rim Light Halo on Fur */}
              <path
                d="M170 162C176 116 212 90 262 90C312 90 348 116 354 162"
                stroke="#FFD873"
                strokeWidth="3"
                strokeOpacity="0.32"
                strokeLinecap="round"
              />

              {/* Classic Border Collie White Forehead Blaze (shifts with muzzle parallax!) */}
              <g
                style={{
                  transform: `translate3d(${(muzzleX * 0.45).toFixed(1)}px, ${(muzzleY * 0.35).toFixed(1)}px, 0)`,
                }}
              >
                <path
                  d="M250 94C256 90 268 90 274 94C278 138 282 184 294 212H230C242 184 246 138 250 94Z"
                  fill="url(#furWhite)"
                />
              </g>

              {/* EYES & BROWS — Direct Cursor Tracking */}
              <g
                style={{
                  transform: `translate3d(${(eyeSocketX * 0.45).toFixed(1)}px, ${(eyeSocketY * 0.45).toFixed(1)}px, 0)`,
                }}
              >
                {/* Expressive Eyebrows */}
                <path
                  d="M196 164C208 154 224 154 234 162"
                  stroke="#535664"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ transform: `translateY(${gaze.near ? -4 : 0}px)`, transition: 'transform 180ms' }}
                />
                <path
                  d="M290 162C300 154 316 154 328 164"
                  stroke="#535664"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{ transform: `translateY(${gaze.near ? -4 : 0}px)`, transition: 'transform 180ms' }}
                />

                {/* Left Eye */}
                <g transform="translate(216 192)">
                  <ellipse cx="0" cy="0" rx="22" ry={isBlinking ? 2 : 23} fill="#FFFDF8" />
                  {!isBlinking && (
                    <g transform={`translate(${pupilX.toFixed(1)} ${pupilY.toFixed(1)})`}>
                      <circle cx="0" cy="0" r="13.5" fill="url(#amberIris)" />
                      <circle cx="0" cy="0" r="7.5" fill="#17120E" />
                      <circle cx="-4.5" cy="-4.5" r="4" fill="#FFFFFF" />
                      <circle cx="4" cy="4" r="1.8" fill="#FFFFFF" fillOpacity="0.7" />
                    </g>
                  )}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="22"
                    ry={isBlinking ? 2 : 23}
                    stroke="#1C1D22"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </g>

                {/* Right Eye */}
                <g transform="translate(308 192)">
                  <ellipse cx="0" cy="0" rx="22" ry={isBlinking ? 2 : 23} fill="#FFFDF8" />
                  {!isBlinking && (
                    <g transform={`translate(${pupilX.toFixed(1)} ${pupilY.toFixed(1)})`}>
                      <circle cx="0" cy="0" r="13.5" fill="url(#amberIris)" />
                      <circle cx="0" cy="0" r="7.5" fill="#17120E" />
                      <circle cx="-4.5" cy="-4.5" r="4" fill="#FFFFFF" />
                      <circle cx="4" cy="4" r="1.8" fill="#FFFFFF" fillOpacity="0.7" />
                    </g>
                  )}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="22"
                    ry={isBlinking ? 2 : 23}
                    stroke="#1C1D22"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </g>
              </g>

              {/* SNOUT, HAPPY SMILE & TONGUE (strongest 2.5D depth shift toward bone) */}
              <g
                style={{
                  transform: `translate3d(${(muzzleX * 0.62).toFixed(1)}px, ${(muzzleY * 0.55).toFixed(1)}px, 0)`,
                }}
              >
                {/* White Muzzle & Cheek Puffs */}
                <path
                  d="M196 248C196 218 224 202 262 202C300 202 328 218 328 248C328 282 298 308 262 308C226 308 196 282 196 248Z"
                  fill="url(#furWhite)"
                />

                {/* Happy Open Mouth Cavity */}
                <path
                  d="M214 256C228 294 296 294 310 256C290 264 234 264 214 256Z"
                  fill="#4B1D24"
                />

                {/* Cute Pink Tongue (perks slightly when bone is near!) */}
                <path
                  d="M242 268C242 262 282 262 282 268C284 294 282 324 262 324C242 324 240 294 242 268Z"
                  fill="url(#tonguePink)"
                  style={{
                    transformOrigin: '262px 268px',
                    transform: `scaleY(${gaze.near ? 1.1 : 1}) rotate(${(gaze.x * 5).toFixed(1)}deg)`,
                    transition: 'transform 180ms ease-out',
                  }}
                />
                <path d="M262 272V312" stroke="#C94E5C" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />

                {/* Smiling Upper Lip */}
                <path
                  d="M212 252C226 266 250 266 262 254C274 266 298 266 312 252"
                  stroke="#2B2120"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Glossy 3D Wet Nose */}
                <path
                  d="M236 226C236 212 248 206 262 206C276 206 288 212 288 226C288 240 274 250 262 250C250 250 236 240 236 226Z"
                  fill="url(#noseGrad)"
                />
                <ellipse cx="252" cy="218" rx="10" ry="4.5" fill="#FFFFFF" fillOpacity="0.38" />
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* Discreet Bottom-Right Frame-Drop Studio Pill (For instant MP4 or extracted frames testing!) */}
      <div className="pointer-events-auto absolute bottom-5 right-5 z-30 flex flex-col items-end gap-2">
        {studioOpen && (
          <div className="w-80 rounded-2xl border border-white/25 bg-[#1D160B]/90 p-4 text-xs text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-[#FFD866]">
                <Film className="h-4 w-4" />
                <span>Dog Frame Scrubber Studio</span>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(false)}
                className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close frame studio"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-3 leading-relaxed text-white/75">
              Drop your <strong>16:9 dog video (MP4)</strong> or select your extracted{' '}
              <strong>WebP/JPG frames</strong> to preview live 60fps cursor scrubbing right here — or place them in{' '}
              <code className="rounded bg-white/10 px-1 py-0.5 text-[#FFD866]">public/frames/</code>.
            </p>

            {extractingMsg && (
              <div className="mb-3 rounded-xl bg-[#FFD866]/15 px-3 py-2 text-[#FFD866] font-medium">
                {extractingMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#F5C542] px-3 py-2 font-semibold text-[#1B1712] transition hover:bg-[#FFD768]"
              >
                <Film className="h-3.5 w-3.5" />
                Load MP4
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-semibold text-white transition hover:bg-white/20"
              >
                <Upload className="h-3.5 w-3.5" />
                Load Frames
              </button>
            </div>

            {frameCount > 0 && (
              <div className="mt-3 space-y-2 border-t border-white/15 pt-3">
                <div className="flex items-center justify-between text-white/80">
                  <span>
                    Active: <strong className="text-[#FFD866]">{frameCount} frames</strong>
                    {rowCount > 1 ? ` (${rowCount} rows 2D)` : ' (1D sweep)'}
                  </span>
                  <button
                    type="button"
                    onClick={resetToInteractiveDog}
                    className="inline-flex items-center gap-1 text-white/70 hover:text-white"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setInvertX((v) => !v)}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 font-medium transition ${
                      invertX
                        ? 'border-[#F5C542] bg-[#F5C542]/20 text-[#FFD866]'
                        : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10'
                    }`}
                  >
                    <FlipHorizontal className="h-3.5 w-3.5" />
                    Invert Left/Right
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeatherEdges((v) => !v)}
                    className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 font-medium transition ${
                      featherEdges
                        ? 'border-[#F5C542] bg-[#F5C542]/20 text-[#FFD866]'
                        : 'border-white/15 bg-white/5 text-white/75 hover:bg-white/10'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Edge Feather
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleSelectFrames(e.target.files)}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              className="hidden"
              onChange={(e) => handleSelectVideo(e.target.files)}
            />
          </div>
        )}

        <button
          type="button"
          onClick={() => setStudioOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#2A1E0A]/65 px-3.5 py-2 text-xs font-semibold text-white/90 shadow-lg backdrop-blur-md transition hover:bg-[#2A1E0A]/90"
        >
          <Film className="h-3.5 w-3.5 text-[#FFD866]" />
          <span>{frameCount > 0 ? `${frameCount} Frames Live` : 'Load Dog Frames / MP4'}</span>
        </button>
      </div>
    </>
  );
}
