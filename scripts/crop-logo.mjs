import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logoPath = path.join(__dirname, '..', 'public', 'logo.png');

const BLACK_THRESHOLD = 35; // Pixels with r,g,b below this become transparent

async function cropLogo() {
  const image = sharp(logoPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  // Replace black / near-black pixels with transparent
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      data[i + 3] = 0;
    }
  }

  const noBlack = sharp(data, {
    raw: { width, height, channels },
  });

  // Trim transparent borders and get dimensions from trim result
  const trimmedResult = await noBlack.trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const trimmed = trimmedResult.data;
  const trimmedInfo = trimmedResult.info;
  const tw = trimmedInfo.width || width;
  const th = trimmedInfo.height || height;

  const size = Math.max(tw, th);
  const left = Math.floor((size - tw) / 2);
  const top = Math.floor((size - th) / 2);

  // Build trimmed image as PNG for composite
  const trimmedPng = await sharp(trimmed, {
    raw: { width: tw, height: th, channels: 4 },
  })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: trimmedPng, left, top }])
    .png()
    .toFile(logoPath);

  console.log('Logo cropped, black removed (transparent), saved to public/logo.png');
}

cropLogo().catch((err) => {
  console.error(err);
  process.exit(1);
});
