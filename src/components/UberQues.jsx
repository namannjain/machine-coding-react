//asked in a lot of companies
// u are given a grid (eg 3x3 or might be a C shape or O shape or D shape of a grid)
// u click on elements and they get colored
//after all cells are colored, start removing color of cells (in FIFO manner or LIFO manner)
import React, { useEffect, useRef, useState } from 'react';
import '../styles/uberques.css';

function UberQues() {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  );
  const queue = useRef([]);
  const timerRef = useRef([]);

  const handleOnClick = (rowIdx, colIdx, flag) => {
    if (grid[rowIdx][colIdx] && flag) {
      //preventing multiple clicks on same cell
      return;
    }

    // const gridDeepCopy = grid.map((row) => [...row]);
    // gridDeepCopy[rowIdx][colIdx] = flag;
    // if (flag) {
    //   queue.current.push([rowIdx, colIdx]);
    // }
    // setGrid(gridDeepCopy);

    //the above code doesn't work because useEffect settimoue mei ek callback which is setting state
    //it gets value of grid which was at the time setTimeout async code was pushed in microtask queue
    //to handle this setGrid pas a callback instead of directly setting like setGrid(gridDeepCopy) X
    setGrid((prevGrid) => {
      //this console log will be called once on click if StrictMode is not set in react index.js file
      //if it is set, it will be called twice on every cell click. I dont know why - find out
      console.log("called");
      const gridDeepCopy = prevGrid.map((row) => [...row]);
      gridDeepCopy[rowIdx][colIdx] = flag;
      if (flag) {
        queue.current.push([rowIdx, colIdx]);
      }
      return gridDeepCopy;
    });
  };

  useEffect(() => {
    if (queue.current.length === 9) {
      console.log(queue.current);
      queue.current.forEach(([rowIdx, colIdx], idx) => {
        timerRef.current[idx] = setTimeout(() => handleOnClick(rowIdx, colIdx, false), 1000 * (idx+1));
      });
      queue.current = [];
    }
  }, [grid]);

  //cleanup on unmount
  useEffect(() => {
    return () => {
      timerRef.current.forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

  return (
    <div className="container">
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div className={`cell ${cell ? "active" : ""}`} key={`${rowIdx}-${colIdx}`} onClick={() => handleOnClick(rowIdx, colIdx, true)} ></div>
          )
        })
      })}
    </div>
  )
}

export default UberQues