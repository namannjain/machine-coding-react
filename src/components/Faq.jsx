import React from 'react';
import data from '../data/faqData.json';
import Accordion from './Accordion';
import '../styles/faq.css';

function Faq() {
  return (
    <div>
      <h1>FAQ</h1>
      {data.faqs.map((faqObj, index) => {
        return <Accordion key={index} qna={faqObj} />
      })}
    </div>
  )
}

export default Faq