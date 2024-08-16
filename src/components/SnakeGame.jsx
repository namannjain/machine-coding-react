import React from 'react';

const GRID_SIZE = 15;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);
const INITIAL_SNAKE = [[5, 5]];

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE);
  const y = Math.floor(Math.random() * GRID_SIZE);
  return [x, y];
};

function SnakeGame() {
  return (
    <div className="snake-container">
      {GAMEGRID.map((row, yc) => {
        return row.map((cell, xc) => {
          return <div className='snake-cell'>{ cell }</div>
        });
      })}
    </div>
  )
}

export default SnakeGame