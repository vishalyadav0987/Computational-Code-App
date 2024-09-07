import React from 'react';
import './VerticalLines.css'; // Import the corresponding CSS

const VerticalLines = () => {
  return (
    <div className="vertical-lines">
      {Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className="vertical-line"></div>
      ))}
    </div>
  );
};

export default VerticalLines;
