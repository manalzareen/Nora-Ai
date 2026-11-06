let cachedDataUrl: string | null = null;

/**
 * Removes the pure white background from the uploaded 3D robot render
 * so NORA floats seamlessly on the midnight-navy theme.
 */
export function getTransparentNoraImage(callback: (url: string) => void) {
  if (cachedDataUrl) {
    callback(cachedDataUrl);
    return;
  }

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/assets/aistudio/Screenshot_2026-11-06_193710_92bf6ec4.png';

  img.onload = () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        callback(img.src);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Crop out white background and right-edge blur artifact
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const x = (i / 4) % canvas.width;

        // Pure white background
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0;
        } else if (x > canvas.width * 0.76 || x < canvas.width * 0.15) {
          // Artifact on right crop margin (adjacent screenshot bleed)
          data[i + 3] = 0;
        } else if (r > 220 && g > 220 && b > 220 && (x > canvas.width * 0.72 || x < canvas.width * 0.2)) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      cachedDataUrl = canvas.toDataURL('image/png');
      callback(cachedDataUrl);
    } catch {
      callback(img.src);
    }
  };

  img.onerror = () => {
    callback('/assets/aistudio/Screenshot_2026-11-06_193710_92bf6ec4.png');
  };
}
