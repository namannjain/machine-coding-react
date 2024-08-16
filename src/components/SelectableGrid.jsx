import React, { useEffect, useState } from 'react';
import '../styles/selectableGrid.css';

const SIZE = 10;
const DEFAULT_GRID = Array.from({ length: SIZE }, () => new Array(SIZE).fill(false));

function SelectableGrid() {
  const [grid, setGrid] = useState(DEFAULT_GRID);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  const handleDrag = (x, y) => {
    setStart([x, y]);
    setGrid(DEFAULT_GRID);
  }

  const handleDragOver = (x,y) => {
    setEnd([x, y]);
  }

  useEffect(() => {
    const fillColor = () => {
      const [startX, startY] = start;
      const [endX, endY] = end;
      const gridDeepCopy = grid.map((row) => [...row]);

      for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++){
        for (let j = Math.min(startY, endY); j <= Math.max(startY, endY); j++){
          gridDeepCopy[i][j] = true;
        }
      }

      setGrid(gridDeepCopy);
    }
    fillColor();
  }, [start,end]);

  return (
    <div className="selectable-grid-container">
      <h1>Selectable Grid</h1>
      <div className="selectable-grid">
        {grid.map((row, xc) => {
          return row.map((cell, yc) => {
            return (
              <div key={`${xc}${yc}`}
                className={`selectable-grid-cell ${cell ? 'selected-cell' : ''}`}
                draggable
                onDrag={() => handleDrag(xc, yc)}
                onDragOver={() => handleDragOver(xc, yc)}
              ></div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default SelectableGrid