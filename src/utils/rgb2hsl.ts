export default function RGBToHSL(r:number, g:number, b: number) {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const cmin = Math.min(r1, g1, b1);
  const cmax = Math.max(r1, g1, b1);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r1) {
    h = ((g1 - b1) / delta) % 6;
  } else if (cmax === g1) {
    h = (b1 - r1) / delta + 2;
  } else {
    h = (r1 - g1) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;

  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s: Math.round(s), l: Math.round(l) };
}
