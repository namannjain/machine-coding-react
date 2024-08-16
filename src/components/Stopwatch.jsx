import React, { useEffect, useRef, useState } from 'react';
import '../styles/stopwatch.css';

function Stopwatch() {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const val = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[field] = val;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;

    setTime(copyTime);
  };

  const toggleStart = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime({
      hour: "",
      minute: "",
      second: "",
    });
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime };
          copyPrevTime.second--;
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--;
            copyPrevTime.second = 59;
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--;
              copyPrevTime.minute = 59;
              if (copyPrevTime.hour < 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                return {hour: "", minute: "", second: ""}
              }
            }
          }
          return copyPrevTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  return (
    <div className='stopwatch-container'>
      <div className="inputs-container">
        <input className='stopwatch-input' value={time.hour} onChange={(e) => handleChange(e, 'hour')} disabled={isRunning} type="text" placeholder='HH' />
        :
        <input className='stopwatch-input' value={time.minute} onChange={(e) => handleChange(e, 'minute')} disabled={isRunning} type="text" placeholder='MM' />
        :
        <input className='stopwatch-input' value={time.second} onChange={(e) => handleChange(e, 'second')} disabled={isRunning} type="text" placeholder='SS' />
      </div>
      <div className="btn-container">
        <button onClick={toggleStart} >{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset} >Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch