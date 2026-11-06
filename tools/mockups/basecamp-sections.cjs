/*
 * Cuts Basecamp's redesigned landing page (public/work/basecamp/cs/bc-page.webp, 1234 × 5810) into its sections,
 * in page order, for the case study's walkthrough. y ranges measured on the full page.
 */
const sharp = require("sharp");
const path = require("path");
const dir = path.join(__dirname, "../../public/work/basecamp/cs");
const SECTIONS = {
  "bc-s1-promise": [0, 600],
  "bc-s2-project": [585, 2420],
  "bc-s3-integrations": [2860, 3500],
  "bc-s4-jobs": [3510, 4170],
  "bc-s5-proof": [4170, 4590],
  "bc-s6-next": [4612, 4880],
};
(async () => {
  for (const [name, [a, b]] of Object.entries(SECTIONS)) {
    await sharp(path.join(dir, "bc-page.webp")).extract({ left: 0, top: a, width: 1234, height: b - a }).webp({ quality: 88 }).toFile(path.join(dir, `${name}.webp`));
    console.log(name, b - a);
  }
})();
