import { RGB } from '../types/RGB';

export default (rgb1: RGB, rgb2: RGB) => Math.sqrt(
  (rgb2.r - rgb1.r) ** 2
  + (rgb2.g - rgb1.g) ** 2
  + (rgb2.b - rgb1.b) ** 2,
);
