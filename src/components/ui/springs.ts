/*
 * Springs in Apple's terms (WWDC "Designing Fluid Interfaces"): damping ratio + response (seconds),
 * converted to the stiffness/damping Framer Motion expects (mass 1).
 * damping 1.0 = critically damped, no overshoot (the default); ~0.8 only after a gesture carried momentum.
 */
export function spring(dampingRatio = 1, response = 0.4) {
  const stiffness = (2 * Math.PI / response) ** 2;
  return { stiffness, damping: 4 * Math.PI * dampingRatio / response, mass: 1 };
}

export const SETTLE = spring(1, 0.4);
export const THROW = spring(0.8, 0.4);
