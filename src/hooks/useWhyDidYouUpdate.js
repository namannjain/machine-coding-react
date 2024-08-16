import { useEffect, useState, useRef } from "react";


//it tells what change made component to update and rerender
const useWhyDidYouUpdate = (name, props) => {
  const prevProps = useRef();

  useRef(() => {
    if (prevProps.current) {
      const keys = Object.keys({ ...prevProps.current, ...props });
      const whyUpdated = {};

      keys.forEach((key) => {
        //have to check separately for object
        if (typeof prevProps.current[key] === 'object' && props[key] === 'object') {
          //deep check is needed here
          if (JSON.stringify(prevProps.current[key]) !== JSON.stringify(props[key])) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        } else {
          if (prevProps.current[key] !== props[key]) {
            whyUpdated[key] = {
              from: prevProps.current[key],
              to: props[key],
            };
          }
        }
      });

      if (Object.keys(whyUpdated).length) {
        console.log("Re-render caused in: ", name, " Component caused by ", whyUpdated);
      }
    }

    prevProps.current = props;
  }, [name, props]);
}

export default useWhyDidYouUpdate;