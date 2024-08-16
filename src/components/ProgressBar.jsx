import React, { useEffect, useState } from 'react';
import '../styles/progress.css';

function ProgressBar() {
  const [bar, setBar] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBar((prevBarValue) => {
        if (prevBarValue >= 100) {
          clearInterval(intervalId);
          return prevBarValue;
        }
        return prevBarValue + 5
      });
    }, 250);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div className='container'>
      <div style={{transform: `translateX(${bar - 100}%)`}} className="progress">
      </div>
    </div>
  )
}

export default ProgressBar