import React from 'react';
import './spinner.scss';

export const Spinner = () => {
  return (
    <div className='lds-ring-wrapper'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
