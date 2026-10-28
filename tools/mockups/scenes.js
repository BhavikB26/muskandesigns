/*
 * One product shot per case study thumbnail. Devices wear real finishes (titanium, aluminium) chosen to sit well
 * on the tile's gem; screens are the case study's own files. The browser bar only names a URL when the site
 * is real (gusto.com, basecamp.com, the Zero Noise site); otherwise the laptop shows just the menu bar.
 * pos/rot: units of 100 mm and degrees (Y, X, Z order). The ground is y = 0.
 */

const W = "/public/work";

/** Three phones in a shallow fan, floating just above the ground. */
const fan = (screens, finish, extra = {}) => [
  { type: "phone", finish, pos: [-0.98, 0.9, -0.42], rot: [22, -6, 3], ...screens[0], ...extra },
  { type: "phone", finish, pos: [0.98, 0.9, -0.42], rot: [-22, -6, -3], ...screens[2], ...extra },
  { type: "phone", finish, pos: [0, 0.96, 0.2], rot: [0, -6, 0], ...screens[1], ...extra },
];
const fanCam = { pos: [0, 2.3, 8.6], target: [0, 0.86, 0], fov: 19 };

/** Laptop at three-quarters, seen from the given side, with room for a phone in front of it. */
const deskCam = (side = 1) => ({ pos: [side * 6, 4.3, 11.8], target: [side * 0.42, 0.88, 0.1], fov: 19 });

export const SCENES = {
  wildflower: {
    camera: fanCam,
    objects: fan(
      [
        { src: `${W}/wildflower/frame-2.webp`, crop: [22, 20, 393, 860] },
        { src: `${W}/wildflower/frame-1.webp`, crop: [22, 20, 393, 860] },
        { src: `${W}/wildflower/frame-3.webp`, crop: [22, 20, 393, 858] },
      ],
      "desert",
      { island: false },
    ),
  },
  "ratings-reviews": {
    camera: fanCam,
    objects: fan(
      [{ src: `${W}/ratings-reviews/frame-2.webp` }, { src: `${W}/ratings-reviews/frame-1.webp` }, { src: `${W}/ratings-reviews/frame-3.webp` }],
      "black",
      { island: false },
    ),
  },
  internshala: {
    camera: { pos: [0, 2.2, 7.4], target: [0, 0.86, 0], fov: 19 },
    objects: [
      { type: "phone", finish: "white", island: false, src: `${W}/internshala/cs/in-onboarding-2.webp`, crop: [10, 10, 246, 542], pos: [-0.5, 0.92, -0.15], rot: [14, -6, 2] },
      { type: "phone", finish: "white", island: false, src: `${W}/internshala/cs/in-tracking.webp`, crop: [10, 10, 246, 542], pos: [0.5, 0.92, 0.15], rot: [-14, -6, -2] },
    ],
  },
  "swiping-loop": {
    camera: { pos: [0, 2.2, 7.4], target: [0, 0.86, 0], fov: 19 },
    preload: [`${W}/swiping-loop/illustration.webp`],
    objects: [
      { type: "phone", finish: "natural", chrome: "phone", statusBar: "#faf7f5", screen: { kind: "swipe", photo: `${W}/swiping-loop/illustration.webp`, name: "Swipe, match, repeat", line: "28 of 32 hadn't found a partner on the apps" }, pos: [-0.5, 0.92, 0.15], rot: [14, -6, 2] },
      { type: "phone", finish: "natural", chrome: "phone", statusBar: "#f7f4f2", screen: { kind: "chat" }, pos: [0.5, 0.92, -0.15], rot: [-14, -6, -2] },
    ],
  },
  "zero-noise": {
    camera: deskCam(1),
    objects: [
      { type: "laptop", finish: "silver", src: `${W}/zero-noise/home.webp`, url: "ishikaa-jain.vercel.app", pos: [-0.25, 0, -0.15], rot: [14, 0, 0] },
      { type: "phone", finish: "natural", chrome: "phone", statusBar: "#fff7fa", src: `${W}/zero-noise/m-estimate.webp`, pos: [1.95, 0.9, 1.0], rot: [-16, -7, -2] },
    ],
  },
  gusto: {
    camera: deskCam(-1),
    objects: [
      { type: "laptop", finish: "silver", src: `${W}/gusto/final-desktop.png`, url: "gusto.com", pos: [0.25, 0, -0.15], rot: [-14, 0, 0] },
      { type: "phone", finish: "natural", chrome: "phone", statusBar: "#f6f6f6", src: `${W}/gusto/howworks-mobile.png`, crop: [0, 30, 375, 1682], pos: [-1.95, 0.9, 1.0], rot: [16, -7, 2] },
    ],
  },
  therabody: {
    camera: deskCam(1),
    objects: [
      { type: "laptop", finish: "silver", chrome: "mac", src: `${W}/therabody/test1.png`, crop: [143, 35, 726, 471], pos: [-0.25, 0, -0.15], rot: [14, 0, 0] },
      { type: "phone", finish: "black", chrome: "phone", src: `${W}/therabody/frame-2.webp`, crop: [18, 70, 396, 792], pos: [1.95, 0.9, 1.0], rot: [-16, -7, -2] },
    ],
  },
  "ai-mentor": {
    camera: { pos: [-3.9, 3.9, 11.4], target: [-0.05, 0.92, 0], fov: 19 },
    objects: [{ type: "laptop", finish: "silver", chrome: "mac", src: `${W}/ai-mentor/exact/sol1.png`, pos: [0, 0, 0], rot: [-10, 0, 0] }],
  },
  basecamp: {
    camera: { pos: [3.9, 3.9, 11.4], target: [0.05, 0.92, 0], fov: 19 },
    objects: [{ type: "laptop", finish: "spaceBlack", src: `${W}/basecamp/frame-1.webp`, url: "basecamp.com", pos: [0, 0, 0], rot: [10, 0, 0] }],
  },
  "studio-store": {
    camera: { pos: [3.9, 3.9, 11.4], target: [0.05, 0.92, 0], fov: 19 },
    objects: [{ type: "laptop", finish: "silver", chrome: "mac", src: `${W}/studio-store/frame-4.webp`, pos: [0, 0, 0], rot: [10, 0, 0] }],
  },
  "builder-university": {
    camera: { pos: [-3.9, 3.9, 11.4], target: [-0.05, 0.92, 0], fov: 19 },
    objects: [{ type: "laptop", finish: "silver", chrome: "mac", src: `${W}/builder-university/frame-1.webp`, pos: [0, 0, 0], rot: [-10, 0, 0] }],
  },
  "builder-design-system": {
    camera: { pos: [4.6, 4.1, 12.2], target: [0.45, 0.95, 0.1], fov: 19 },
    objects: [
      { type: "laptop", finish: "silver", chrome: "mac", src: `${W}/builder-design-system/img-colors.webp`, pos: [-0.45, 0, -0.2], rot: [12, 0, 0] },
      { type: "tablet", finish: "silver", src: `${W}/builder-design-system/ds/var-spacing.webp`, pos: [2.0, 1.12, 0.85], rot: [-18, -8, -2], scale: 0.86 },
    ],
  },
};
