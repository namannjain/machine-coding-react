import { useEffect, useRef, useState } from "react";

//here value means callback function for event to throttle on
const useThrottle = (value, delay) => {
  const [throttledVal, setVal] = useState(value);

  const lastExecutedRef = useRef(Date.now());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const now = Date.now();
      const timeElapsed = now - lastExecutedRef.current;

      if (timeElapsed >= delay) {
        setVal(value);
        lastExecutedRef.current = now;
      }
    }, delay - (Date.now() - lastExecutedRef.current));

    return () => clearTimeout(timer);
  }, [delay, value]);

  return throttledVal;
}

export default useThrottle

/* example of how to use in code - can be used for resizing as well
import useThrottle from "./hooks/use-throttle";

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // any expensive operation or API Call
  };

  const throttledHandleResize = useThrottle(handleResize, 1000);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);

    return () => {
      window.removeEventListener("resize", throttledHandleResize);
    };
  }, []);

  return (
    <div>
      Window Size: {windowSize.width} x {windowSize.height}
    </div>
  );
}

export default App;
*/