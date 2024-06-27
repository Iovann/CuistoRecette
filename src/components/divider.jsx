import React from 'react';

const DividerWithText = ({ text }) => {
  return (
    <div className="divider-container">
      <hr className="divider" />
      <span className="divider-text">{text}</span>
      <hr className="divider" />
    </div>
  );
};

export default DividerWithText;
