import React, { useState } from 'react';
import './AccordionFAQ.css'; // Import your CSS styles

const ROIFAQ = () => {
  // Define the state to track which accordion items are open
  const [openItems, setOpenItems] = useState([]);

  // Define the FAQ data for ROI
  const roiFaqData = [
    {
      question: 'What is ROI (Return on Investment)?',
      answer:
        'ROI, or Return on Investment, is a financial metric that measures the profitability of an investment. It is typically calculated as the ratio of the net gain or loss from an investment to the initial investment cost.',
    },
    {
      question: 'How is ROI calculated?',
      answer:
        'ROI is calculated using the formula: ROI = ((Net Gain or Loss) / Initial Investment) * 100%. It is expressed as a percentage.',
    },
    {
      question: 'Why is ROI important in finance and investing?',
      answer:
        'ROI is important because it helps investors assess the efficiency and profitability of their investments. It provides a standardized way to compare the returns of different investment opportunities.',
    },
    {
      question: 'What is a good ROI?',
      answer:
        "A 'good' ROI depends on various factors, including the industry, the risk associated with the investment, and the investor's goals. In general, a positive ROI indicates a profitable investment, while a negative ROI indicates a loss.'",
    },
    {
      question: 'How can I improve my ROI?',
      answer:
        'To improve your ROI, you can focus on increasing the returns from your investments while minimizing costs. This may involve diversifying your portfolio, optimizing asset allocation, and reducing expenses.',
    },
    {
      question: 'Is a high ROI always better?',
      answer:
        "Not necessarily. While a high ROI can be attractive, it often comes with higher risk. It's essential to consider both the risk and return of an investment when evaluating its attractiveness.",
    }
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
      {roiFaqData.map((item, index) => (
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

export default ROIFAQ;
