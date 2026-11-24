import { useEffect, useRef, useState } from 'react';

interface BoneCursorProps {
  active: boolean;
}

export function BoneCursor({ active }: BoneCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    let rafId = 0;
    let targetX = -200;
    let targetY = -200;
    let curX = -200;
    let curY = -200;
    let curRot = -18;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });

    const tick = () => {
      const dx = targetX - curX;
      curX += dx * 0.24;
      curY += (targetY - curY) * 0.24;
      const targetRot = -16 + Math.max(-22, Math.min(22, dx * 0.65));
      curRot += (targetRot - curRot) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) rotate(${curRot.toFixed(2)}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-200 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`relative transition-transform duration-150 ${
          pressed ? 'scale-90' : 'scale-100'
        }`}
      >
        {/* Subtle warm glint dot matching the PAWZO playful bone cursor */}
        <span className="absolute -right-1.5 -top-1.5 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]" />
        <svg
          width="46"
          height="26"
          viewBox="0 0 64 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_6px_12px_rgba(61,39,7,0.45)]"
        >
          <defs>
            <linearGradient id="boneFill" x1="12" y1="4" x2="50" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="60%" stopColor="#F8EDD6" />
              <stop offset="100%" stopColor="#E4CFA9" />
            </linearGradient>
          </defs>
          <path
            d="M15.5 11.5C15.5 7.36 12.14 4 8 4C3.86 4 0.5 7.36 0.5 11.5C0.5 14.37 2.11 16.86 4.48 18C2.11 19.14 0.5 21.63 0.5 24.5C0.5 28.64 3.86 32 8 32C12.14 32 15.5 28.64 15.5 24.5C15.5 24.16 15.48 23.83 15.43 23.5H48.57C48.52 23.83 48.5 24.16 48.5 24.5C48.5 28.64 51.86 32 56 32C60.14 32 63.5 28.64 63.5 24.5C63.5 21.63 61.89 19.14 59.52 18C61.89 16.86 63.5 14.37 63.5 11.5C63.5 7.36 60.14 4 56 4C51.86 4 48.5 7.36 48.5 11.5C48.5 11.84 48.52 12.17 48.57 12.5H15.43C15.48 12.17 15.5 11.84 15.5 11.5Z"
            fill="url(#boneFill)"
            stroke="#D6BE93"
            strokeWidth="1.2"
          />
          {/* Specular glossy highlight */}
          <path
            d="M18 15.5H46"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
