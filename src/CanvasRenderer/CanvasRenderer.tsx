/* eslint-disable no-void */
import React, {
  ChangeEvent, ReactEventHandler, useCallback, useEffect, useState,
} from 'react';

import WHATSAPP_WIDTH from '../constants/whatsapp';

import './CanvasRenderer.css';
import { ColorMap } from '../types/ColorMap';
import dotColorMap from '../constants/dotColorMap';
import bestColorMapDistance from '../utils/bestColorMapDistance';
import base64img from '../utils/base64img';

interface CanvasRendererProps {
  colorMap?: ColorMap
}

const defaultFile = base64img;

export default function CanvasRenderer(
  { colorMap = dotColorMap }: CanvasRendererProps,
) {
  const [imgFile, setImgFile] = useState<string>(defaultFile);
  const [text, setText] = useState<string[]>([]);

  const handleLoad = useCallback(((event) => {
    const img = event.target as HTMLImageElement;
    const canvas = document.querySelector('.CanvasRenderer > canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.height = canvas.width * (img.height / img.width);
    const oc = document.createElement('canvas') as HTMLCanvasElement;
    const octx = oc.getContext('2d') as CanvasRenderingContext2D;

    const factor = Math.ceil((img.width / WHATSAPP_WIDTH));
    const resizeFactor = 1 / factor;

    oc.width = Math.ceil(img.width * resizeFactor);
    oc.height = Math.ceil(img.height * resizeFactor);
    octx.drawImage(img, 0, 0, oc.width, oc.height);
    const { data, width, height } = octx.getImageData(0, 0, oc.width, oc.height, {
      colorSpace: 'srgb',
    });

    const distances = [];

    for (let i = 0; i < width * height * 4; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const rgb = { r, g, b };
      distances.push(bestColorMapDistance(rgb, colorMap));
    }

    setText(distances);

    ctx.drawImage(
      oc,
      0,
      0,
      oc.width,
      oc.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }) as ReactEventHandler<HTMLImageElement>, [colorMap]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList && fileList.item(0)) {
      const file = fileList.item(0);

      const reader = new FileReader();
      if (file && file.type.match('image.*')) {
        reader.readAsDataURL(file);
      }
      reader.addEventListener('loadend', () => {
        setImgFile(reader.result as string);
      });
    }
  }, []);

  useEffect(() => {
    const element = document.querySelector('img');
    if (element) {
      handleLoad({
        target: element,
      } as any);
    }
  }, [colorMap]);

  return (
    <div className="CanvasRenderer">
      <input type="file" onChange={handleChange} />
      <br />
      <img src={imgFile} alt="tmp" onLoad={handleLoad} />
      <canvas id="canvas" />
      <div>
        {text.reduce<any>((acc, e, i) => {
          if (i % 13 === 0) {
            return [...acc, <br />, e];
          }

          acc[acc.length - 1] = acc[acc.length - 1] + e;
          return acc;
        }, []).map((e: string, i: number) => <span key={`${e}-${String(i)}`}>{e}</span>)}
      </div>
    </div>
  );
}
