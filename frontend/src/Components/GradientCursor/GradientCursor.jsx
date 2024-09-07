import React, { useEffect, useRef } from 'react';
import './GradientCursor.css'; // Assuming you save the CSS in a file named GradientCursor.css

const GradientCursor = ({ isVisible, color1 }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        // Update the gradient position on mouse move
        cursorRef.current.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Gradient Element */}
      {isVisible && <div ref={cursorRef}
        className="blob"
        style={{
          backgroundImage: `linear-gradient(${color1} 10%,rgba(0,0,0,0.1))`
        }}
      ></div>}
    </>
  );
};

export default GradientCursor;
