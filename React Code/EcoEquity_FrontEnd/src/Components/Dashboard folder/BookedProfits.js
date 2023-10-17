import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookedProfits = () => {
  const [totalRealisedValue, setTotalRealisedValue] = useState(0);
  const userName = localStorage.getItem('user');

  useEffect(() => {
    const fetchTotalRealisedValue = async () => {
      try {
        const response = await axios.get("http://localhost:8086/stocks/" + userName + "/totalRealisedValue");
        setTotalRealisedValue(response.data);
      } catch (error) {
        console.error('Error fetching total realised value:', error);
      }
    };

    fetchTotalRealisedValue();
  }, []);

  return (
    <div>
      <h1>{(totalRealisedValue).toFixed(2)}</h1>
    </div>
  );
};

export default BookedProfits;
