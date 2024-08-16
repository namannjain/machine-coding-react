import React, { useState, useRef } from 'react'
import '../styles/toast.css';

const TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const handleClose = (id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    console.log(timersRef.current);
    // const filteredToasts = toasts.filter((toast) => {
    //   return toast.id !== id;
    // });
    // setToasts(filteredToasts);

    setToasts((prevToasts) => {
      const filteredToasts = prevToasts.filter((toast) => {
        return toast.id !== id;
      });
      return filteredToasts;
    });
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toasts, { id, message, type }];
    setToasts(newToasts);
    //asynchronous code k callback mei vahi state yaad rkhega jo us time thi
    //thats why instead of setToasts(filteredToasts) in handleClose()
    //we are passing a callback
    timersRef.current[id] = setTimeout(() => handleClose(id), 3000);
  }

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast toast-${type}`}>
              {message}
              <span onClick={ () => handleClose(id)}>X</span>
            </div>
          );
        })}
      </div>
      <div className="btn-container">
        <button onClick={ () => handleAdd('Success Toast', TYPE.SUCCESS) }>Success Toast</button>
        <button onClick={ () => handleAdd('Info Toast', TYPE.INFO) }>Info Toast</button>
        <button onClick={ () => handleAdd('Warning Toast', TYPE.WARNING) }>Warning Toast</button>
        <button onClick={ () => handleAdd('Error Toast', TYPE.ERROR) }>Error Toast</button>
      </div>
    </div>
  )
}

export default ToastContainer