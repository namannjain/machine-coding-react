import React from 'react';

//similar to copy source code functionality in websites like any documentation with code, eg, Material ui etc
const useCopy = () => {
  //clipboard copying is asynchronous so thats why making function async
  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.err("Error copying text: ", err);
    }

    return copy;
  }
}

//inside component u can  do
// const copyFn = useCopy()
//button onClick=(() => copy(value)) where value will be a state variable of a text area

export default useCopy