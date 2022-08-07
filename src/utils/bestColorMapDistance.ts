// import colorEuclideanDistance from './colorEuclideanDistance';
import { RGB } from '../types/RGB';
import { ColorMap } from '../types/ColorMap';
import betterEuclideanDistance from './betterEuclideanDistance';

export default function bestColorMapDistance(color: RGB, colorMap: ColorMap) {
  const distanceMap = Object.entries(colorMap)
    .reduce<Record<string, number>>((acc, [key, value]) => ({
    ...acc,
    [key]: betterEuclideanDistance(color, value),
  }), {});

  const values = Object.values(distanceMap);

  const valueMin = Math.min(...values);
  const indexMin = values.indexOf(valueMin);
  return Object.keys(distanceMap)[indexMin];
}
