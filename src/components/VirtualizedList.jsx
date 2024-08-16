import React, { useState } from 'react';
//quesion is basically you are given 100000 items but at one point only 25 of them are visible
//would you create 100000 divs and use intersection observer ? - NO - too many divs rendering will cause website to hang
const defaultList = Array.from({ length: 10000 }, (_, index) => index + 1);

//one performance issue in below code is position absolute is used - translateY() will be better in terms of speed

function VirtualizedList({ list = defaultList, containerHeight, containerWidth, itemHeight }) {
  const [indices, setIndices] = useState([0, Math.floor(containerHeight / itemHeight)]);

  const visibleList = list.slice(indices[0], indices[1] + 1);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndindex = newStartIndex + Math.floor(containerHeight / itemHeight);
    setIndices([newStartIndex, newEndindex]);
  };

  return (
    //overflow auto will give scrollbar
    <div className="virtualized-container"
      style={{
        height: containerHeight,
        width: containerWidth,
        backgroundColor: 'gray',
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{height: list.length * itemHeight}}>
        {
          visibleList.map((item, index) => {
            return <div className="item" style={{
              height: itemHeight,
              backgroundColor: 'coral',
              borderTop: '2px solid gray',
              position: 'absolute',
              top: (indices[0] + index) * itemHeight,
              width: '100%',
              textAlign: 'center',
            }}>{"Item" + item}</div>
          })
        }
      </div>
    </div>
  )
}

export default VirtualizedList