import React, { useState } from 'react';

const ModalComponent = ({ width, height, heading, footer, modalClose, handleOutput, children }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    modalClose();
    setOpen(false);
  };

  return (
    <div className="modal-box">
      <header>
        <span>{heading}</span>
        <span></span>
      </header>
      <div className="model-content">

      </div>
      <footer>
        <button></button>
      </footer>
    </div>
  )
}

export default ModalComponent;