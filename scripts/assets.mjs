import sharp from 'sharp';
import { writeFileSync, unlinkSync, existsSync } from 'node:fs';

const SRC = 'C:/Users/pierca01/Downloads/_jan_source/Webpage/';
const OUT = 'C:/Users/pierca01/Downloads/kleinheisterkamp/public/images/';
const BORDEAUX = { r: 0x6b, g: 0x1f, b: 0x1f };

const save = async (pipeline, file) => {
  const tmp = OUT + file + '.tmp';
  const buf = await pipeline.toBuffer();
  writeFileSync(tmp, buf);
  if (existsSync(OUT + file)) unlinkSync(OUT + file);
  writeFileSync(OUT + file, buf);
  unlinkSync(tmp);
  console.log(file, (buf.length / 1024 | 0) + 'KB');
};

// --- Hero: panoramic château (wide) + a taller crop for mobile ---
await save(
  sharp(SRC + 'Pictures/Chateau/IMG_1800 copy.jpg')
    .resize({ width: 2600 })
    .modulate({ saturation: 0.82 })
    .linear(0.97, 6)
    .jpeg({ quality: 78, mozjpeg: true }),
  'chateau-hero.jpg'
);
await save(
  sharp(SRC + 'Pictures/Chateau/IMG_5587.jpg')
    .resize({ width: 1600, height: 2000, fit: 'cover', position: 'attention' })
    .modulate({ saturation: 0.82 })
    .jpeg({ quality: 78, mozjpeg: true }),
  'chateau-tall.jpg'
);

// --- Studio portraits: uniform 4:5, colour, gentle matched grade ---
const portraits = [
  ['Pictures/Jan - Tercafs final/jank 1.jpg', 'jan-portrait.jpg', 'top'],
  ['Pictures/Benedita e Carolina/PAV2021005G00009.jpg', 'carolina-portrait.jpg', 'top'],
  ['Pictures/Benedita e Carolina/PAV2021005G00016.jpg', 'benedita-portrait.jpg', 'top'],
  ['Pictures/Shaurya - 01_2022/DSC_3898 f.jpg', 'shaurya-portrait.jpg', 'top'],
];
for (const [src, file, pos] of portraits) {
  await save(
    sharp(SRC + src)
      .resize({ width: 1100, height: 1375, fit: 'cover', position: pos })
      .modulate({ saturation: 0.92, brightness: 1.02 })
      .linear(1.02, -2)
      .jpeg({ quality: 82, mozjpeg: true }),
    file
  );
}

// --- Lemniscate mark → clean transparent PNGs (bordeaux + white) ---
// Explicit white-key: load source, build RGBA where dark shape → solid colour,
// white background → transparent (feathered on the anti-aliased edge).
const { data: src, info: sInfo } = await sharp(SRC + 'Logo/Lemniscate.png')
  .flatten({ background: '#ffffff' })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const W = sInfo.width, H = sInfo.height, CH = sInfo.channels;

const makeMark = async (col, file) => {
  const px = W * H;
  const buf = Buffer.alloc(px * 4);
  for (let i = 0; i < px; i++) {
    const s = i * CH;
    const lum = 0.299 * src[s] + 0.587 * src[s + 1] + 0.114 * src[s + 2];
    // lum 255 (white bg) → alpha 0 ; lum 0 (black ink) → alpha 255
    let a = Math.round(255 - lum);
    a = a < 14 ? 0 : a > 245 ? 255 : a;
    const o = i * 4;
    buf[o] = col[0];
    buf[o + 1] = col[1];
    buf[o + 2] = col[2];
    buf[o + 3] = a;
  }
  const out = await sharp(buf, { raw: { width: W, height: H, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 560 })
    .png({ compressionLevel: 9 })
    .toBuffer();
  const tmp = OUT + file + '.tmp';
  writeFileSync(tmp, out);
  if (existsSync(OUT + file)) unlinkSync(OUT + file);
  writeFileSync(OUT + file, out);
  unlinkSync(tmp);
  console.log(file, (out.length / 1024 | 0) + 'KB', `${W}x${H}`);
};
await makeMark([0x6b, 0x1f, 0x1f], 'logo-mark.png');
await makeMark([0xfa, 0xf8, 0xf4], 'logo-mark-white.png');

console.log('assets done');
