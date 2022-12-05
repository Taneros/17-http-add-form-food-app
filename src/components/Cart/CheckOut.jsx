import styles from './CheckOut.module.css';

import React from 'react';

const CheckOut = (props) => {
  const handleConfirm = (event) => {
    event.prevent.default();
  };

  return (
    <form onSubmit={handleConfirm}>
      <div>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button type="submit">Confirm</button>
    </form>
  );
};

export default CheckOut;
