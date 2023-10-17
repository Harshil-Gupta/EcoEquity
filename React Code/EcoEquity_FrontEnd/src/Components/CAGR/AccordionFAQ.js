import React, { useState } from 'react';
import './AccordionFAQ.css'; // You can define your CSS styles

const AccordionFAQ = () => {
  // Define the state to track which accordion items are open
  const [openItems, setOpenItems] = useState([]);

  // Define the FAQ data
  const faqData = [
    {
      question: 'What is CAGR, and what does it measure?',
      answer:
        'CAGR stands for Compound Annual Growth Rate. It is a financial metric that measures the annual growth rate of an investment or asset over a specified period, assuming that the investment has been compounding over time.',
    },
    {
      question: 'How is CAGR calculated?',
      answer:
        'CAGR is calculated using the formula: CAGR = [(Ending Value / Beginning Value) ^ (1 / Number of Years)] - 1. Where "Ending Value" is the final value of the investment, "Beginning Value" is the initial value, and "Number of Years" is the investment period.',
    },
    {
      question: 'Why is CAGR important in finance and investing?',
      answer:
        'CAGR is important because it provides a single, consistent metric for measuring and comparing the growth rates of different investments or assets. It helps investors understand the true annualized return on an investment, even when the growth rate is not constant.',
    },
    {
      question: 'How does CAGR differ from other measures of investment return, such as the average annual return?',
      answer:
        'CAGR accounts for the compounding effect, which makes it more accurate than the simple average annual return. The average annual return doesn\'t consider the compounding effect and can be misleading for long-term investments.',
    },
    {
      question: 'Is a higher CAGR always better for an investment?',
      answer:
        'Not necessarily. While a higher CAGR indicates faster growth, it also often comes with higher risk. Investors should consider their risk tolerance and investment goals when evaluating CAGR. It\'s essential to assess the risk-return trade-off.',
    },
    {
      question: 'Can CAGR be negative?',
      answer:
        'Yes, CAGR can be negative if the investment has experienced a decrease in value over the specified period. A negative CAGR indicates a loss rather than a gain in the investment.',
    },
  ];

  // Function to handle toggling the accordion item
  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className="accordion">
      {faqData.map((item, index) => (
        <div className={`accordion-item ${openItems.includes(index) ? 'open' : ''}`} key={index}>
          <div className="accordion-header" onClick={() => toggleItem(index)}>
            <h5>{item.question}</h5>
          </div>
          <div className="accordion-content">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionFAQ;
