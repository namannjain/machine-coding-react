import { useCallback, useEffect, useState } from "react";

export const useDebounce = (fn, delay) => {
  let timerRef = useRef(null);

  let debounce = useCallback(function(){
    const context = this;
    const args = arguments; //arguments keyword is available for a function declared as a normal function - contains all args
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fn.apply(context, args);
    }, delay);

  }, [fn, delay]);

  return debounce;
}

//how to use in component
// const onChange = (e) => {console.log(e.target.value);}
//const debouncedSearch = useDebounce(onChange, 1000);

//implementation 2 - maybe not good
// export const useDebounce = (inputVal, delay) => {
//   const [debounceVal, setDebounceVal] = useState(inputVal);

//   useEffect(() => {
//     const timer = setTimeout(() => setDebounceVal(inputVal), delay);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [inputVal, delay]);

//   return debounceVal;
// };