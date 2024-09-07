import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedBoxes.css'; // Add your custom CSS here

const languages = ['JavaScript', 'Python', 'C++', 'Java', 'Ruby','C#','Kotlin','Go'];

const randomHorizontalPosition = () => Math.floor(Math.random() * 100);

const AnimatedBoxes = () => {
  return (
    <div className="hero-section">
    {/* Grid Background */}
    <div className="grid-background">
      {Array.from({ length: 60 }).map((_, index) => (
        <div key={index} className={`grid-cell ${index % 2 === 0 ? 'dark-cell' : 'light-cell'}`}></div>
      ))}
    </div>
    {/* <h1>Welcome to the Coding Platform</h1> */}
    {/* Falling Language Bubbles */}
    {languages.map((language, index) => (
      <motion.div
        key={index}
        className="bubble"
        initial={{ opacity: 0, y: '-10vh', x: `${randomHorizontalPosition()}vw` }}
        animate={{
          opacity: 1,
          y: '100vh',
          transition: {
            duration: 10,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: 'loop',
          },
        }}
      >
        {language}
      </motion.div>
    ))}
  </div>
  );
};

export default AnimatedBoxes;
