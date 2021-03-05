import React from 'react';
import { TIME_RESET } from './index';

const HourSelects = () => {
  return (
    <>
      <option value={TIME_RESET}>----</option>
      {Array.from(Array(24), (v, i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </>
  );
};

export default HourSelects;
