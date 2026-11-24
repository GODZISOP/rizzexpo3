HOW TO PLUG IN YOUR DOG VIDEO FRAMES (RIZZEXPO HERO)
=====================================================

Option 1 (Automatic Folder Load):
1. Drop your extracted frames into this folder (`public/frames/`) named:
   frame_001.webp, frame_002.webp, ..., frame_060.webp
   (or .jpg / .png)
2. Create or update `public/frames/manifest.json` with:
   {
     "mode": "1d",
     "frames": ["frame_001.webp", "frame_002.webp", "..."]
   }
   For full 2D Up/Down + Left/Right tracking (3 rows: top, middle, bottom):
   {
     "mode": "2d",
     "rows": [
       ["top_001.webp", "top_002.webp"],
       ["mid_001.webp", "mid_002.webp"],
       ["bot_001.webp", "bot_002.webp"]
     ]
   }

Option 2 (Instant Browser Test — No Config Needed!):
Click the "Load Dog Frames" button in the bottom-right corner of the Hero section
and select all your frame images (or drop an MP4 video directly) to test live immediately!
