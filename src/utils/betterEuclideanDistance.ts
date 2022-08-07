import { RGB } from '../types/RGB';

export default (rgb1: RGB, rgb2: RGB) => {
  const rFactor = (1 / 2) * (rgb1.r + rgb2.r);
  const deltaR = (rgb1.r - rgb2.r);
  const deltaG = (rgb1.g - rgb2.g);
  const deltaB = (rgb1.b - rgb2.b);

  return Math.sqrt(
    ((2 + (rFactor / 256)) * (deltaR ** 2))
      + (4 * (deltaG ** 2))
      + ((2 + (255 - rFactor) / 256) * (deltaB ** 2)),
  );
};
