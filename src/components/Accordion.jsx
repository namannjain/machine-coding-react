import React, { useState } from 'react';
import '../styles/faq.css';

function Accordion({ qna }) {
  const [show, setShow] = useState(false);
  return (
    <div className="accordion">
      <h3>
        {qna.question}{" "}
        <span className='faq-span' onClick={() => setShow(!show)} >{show ? '-' : '+'}</span>
      </h3>
      {show ? <p>{qna.answer}</p> : ""}
    </div>
  )
}

export default Accordion