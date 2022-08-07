import React, { ChangeEventHandler, useState } from 'react';
import './App.css';
import CanvasRenderer from './CanvasRenderer/CanvasRenderer';
import dotColorMap from './constants/dotColorMap';
import heartColorMap from './constants/heartColorMap';
import blockColorMap from './constants/blockColorMap';
import { ColorMap } from './types/ColorMap';

const colorMaps = {
  dotColorMap,
  heartColorMap,
  blockColorMap,
} as Record<string, ColorMap>;

function App() {
  const [colorMap, setColorMap] = useState('dotColorMap');

  const handleChange = ((event) => {
    setColorMap(event.target.value);
  }) as ChangeEventHandler<HTMLSelectElement>;

  return (
    <div className="App">
      <header className="App-header">
        <select value={colorMap} onChange={handleChange}>
          <option value="dotColorMap">{Object.keys(dotColorMap)[0]}</option>
          <option value="heartColorMap">{Object.keys(heartColorMap)[0]}</option>
          <option value="blockColorMap">{Object.keys(blockColorMap)[0]}</option>
        </select>
        <CanvasRenderer colorMap={colorMaps[colorMap]} />
      </header>
    </div>
  );
}

export default App;
