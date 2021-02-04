import React, { useState, useEffect } from 'react';
import { TIME_RESET } from './index';

const HourSelects = () => {
  const [arrayOfHours, setArrayOfHours] = useState<number[]>();

  useEffect(() => {
    setArrayOfHours(Array.from(Array(24), (v, i) => i));
  }, []);

  return (
    <>
      <option value={TIME_RESET}>----</option>
      {arrayOfHours?.map((hour, index) => (
        <option key={index} value={hour}>
          {hour}
        </option>
      ))}
    </>
  );
};

export default HourSelects;
