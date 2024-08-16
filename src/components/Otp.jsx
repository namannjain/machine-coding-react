import React, { useState, useRef, useEffect } from 'react';
import '../styles/otp.css';

function Otp({ otpLength = 6 }) {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  useEffect(() => {
    ref.current["0"].focus();
  }, []);

  const handleKeyDown = (e, ind) => {
    const key = e.key;
    const copyOtpFields = [...otpFields];

    if (key === "ArrowLeft") {
      ref.current[Math.max(0, ind - 1)].focus();
      return;
    }

    if (key === "ArrowRight") {
      ref.current[Math.min(otpLength-1, ind + 1)].focus();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      copyOtpFields[ind] = "";
      setOtpFields(copyOtpFields);
      ref.current[Math.max(0, ind - 1)].focus();
      return;
    }

    if (isNaN(key)) {
      return;
    }
    copyOtpFields[ind] = key;
    ref.current[Math.min(ind+1, otpLength-1)].focus();
    setOtpFields(copyOtpFields);
  }

  return (
    <div className="container">
      {otpFields.map((val, ind) => {
        return <input key={ind} className='otp-input' value={val} type="text" onKeyDown={(e) => handleKeyDown(e,ind)} ref={(currentInput) => (ref.current[ind] = currentInput)} />
      })}
    </div>
  )
}

export default Otp