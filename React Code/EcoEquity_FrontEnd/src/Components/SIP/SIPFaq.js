import React, { useState } from 'react';
import './AccordionFAQ.css'; // Import your CSS styles

const SIPFAQ = () => {
  // Define the state to track which accordion items are open
  const [openItems, setOpenItems] = useState([]);

  // Define the FAQ data for SIP Calculator
  const sipFaqData = [
    {
      question: 'What is an SIP (Systematic Investment Plan) calculator?',
      answer:
        'An SIP calculator is a financial tool that helps individuals calculate the potential future value of their investments made through a Systematic Investment Plan. It takes into account factors like the investment amount, duration, and expected rate of return.',
    },
    {
      question: 'How does an SIP calculator work?',
      answer:
        'To use an SIP calculator, you input details such as your monthly investment amount, the expected rate of return, and the investment duration. The calculator then computes the estimated future value of your investments based on these inputs.',
    },
    {
      question: 'Why should I use an SIP calculator?',
      answer:
        'Using an SIP calculator can help you plan your financial goals more effectively. It provides you with a clear picture of how your investments will grow over time, allowing you to make informed decisions about your savings and investments.',
    },
    {
      question: 'What factors affect the SIP calculator results?',
      answer:
        'The results from an SIP calculator are influenced by several factors, including the monthly investment amount, the rate of return, the investment duration, and the compounding frequency (e.g., monthly, quarterly). Adjusting these parameters can impact the final outcome.',
    },
    {
      question: 'Can an SIP calculator guarantee returns?',
      answer:
        "No, an SIP calculator provides estimates based on the information you input. Actual returns may vary due to market fluctuations and other external factors. It's important to remember that all investments carry some level of risk.",
    },
    {
      question: 'How can I maximize my SIP returns?',
      answer:
        'To maximize your SIP returns, consider increasing your monthly investment amount, choosing investments that align with your financial goals and risk tolerance, and staying invested for the long term to benefit from compounding.',
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
      {sipFaqData.map((item, index) => (
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

export default SIPFAQ;
