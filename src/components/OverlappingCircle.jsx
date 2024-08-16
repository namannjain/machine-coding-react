import React, { useState, useEffect } from 'react';

const RAD = 50;

const Circle = ({top, left, background}) => {
  return (
    <div style={{position: 'absolute', width: RAD*2, height: RAD*2, border: '2px solid black', borderRadius: '50%', top, left, background}}></div>
  )
};

const ElementsOverlap = (ele1, ele2) => {
  const isColliding = true;
  return isColliding;
}

const OverlappingCircle = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    document.addEventListener('click', drawCircle);

    () => document.removeEventListener('click', drawCircle);
  }, []);

  const drawCircle = (e) => {
    const { clientX, clientY } = e;

    const newCircleCords = {
      top: clientY - RAD,
      left: clientX - RAD,
      bottom: clientY + RAD,
      right: clientX + RAD,
      background: 'red',
    };

    setCircles((prevCircles) => {
      for (let i = 0; i < prevCircles.length; i++){
        const isColliding = ElementsOverlap(newCircleCords, prevCircles[i]);
        if (isColliding) {
          newCircleCords.background = 'green';
          break;
        }
      }
      return [...prevCircles, newCircleCords];
    });
  };

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <h1 style={{ textAlign: 'center' }}>Naman Jain</h1>
      {circles.map((circle) => <Circle {...circle} key={circle.top + circle.left + circle.background} />)}
    </div>
  )
}

export default OverlappingCircle