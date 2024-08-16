import React, { useEffect, useState } from 'react';

const useInView = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = new IntersectionObserver(([entry]) => {
    setIntersecting(entry.isIntersecting);
  }, { threshold: 1.0 });

  //now observer is ready and we have to attach it to our 'ref'
  useEffect(() => {
    observer.observe(ref.current);

    () => observer.unobserve(ref.current);
  }, []);

  return isIntersecting;
}

export default useInView

/*
example how to use in component
const Element = ({index}) => {
  const ref = useRef();
  const isInViewPort = useOnScreen(ref);
  if(isInViewPort){
    console.log(index);
  }
  
  return <div ref={ref} class="block" key={index}>{index}</div>
}

const App = () => {
  const blocks = [];
  for(let i = 0; i < 20; i++){
    blocks.push(<Element index={i+1}/>);
  }
  
  return <div class="wrapper">{blocks}</div>;
};
*/