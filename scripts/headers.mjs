import sharp from 'sharp';
import { writeFileSync, unlinkSync, existsSync } from 'node:fs';

const SRC = 'C:/Users/pierca01/Downloads/_jan_source/Webpage/Pictures/';
const OUT = 'C:/Users/pierca01/Downloads/kleinheisterkamp/public/images/';

// Unified family: the Château estate, its rooms and grounds — one calm,
// slightly desaturated editorial grade across every page header.
const map = [
  ['Others/IMG_1368.JPG', 'header-about.jpg', 'centre'], // château facade
  ['Chateau/IMG_5585.jpg', 'header-team.jpg', 'centre'], // the office room
  ['Chateau/IMG_5587.jpg', 'header-practice.jpg', 'centre'], // office room (variant)
  ['Chateau/IMG_1603.jpg', 'header-experience.jpg', 'centre'], // château facade (variant)
  ['Webpage deco/IMG_2903.jpg', 'header-scholarship.jpg', 'top'], // wrought-iron gate
  ['Others/IMG_8241.JPG', 'header-contact.jpg', 'centre'], // wooded grounds
];

for (const [src, file, position] of map) {
  const buf = await sharp(SRC + src)
    .resize({ width: 2200, height: 1240, fit: 'cover', position })
    .modulate({ saturation: 0.72, brightness: 1.0 })
    .linear(0.96, 4)
    .jpeg({ quality: 76, mozjpeg: true })
    .toBuffer();
  const tmp = OUT + file + '.tmp';
  writeFileSync(tmp, buf);
  if (existsSync(OUT + file)) unlinkSync(OUT + file);
  writeFileSync(OUT + file, buf);
  unlinkSync(tmp);
  console.log(file, (buf.length / 1024 | 0) + 'KB');
}
console.log('headers done');
