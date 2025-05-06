
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="w-10 h-10 relative">
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        {/* Rod of Asclepius symbol */}
        <circle cx="20" cy="20" r="18" fill="#2E7D32" />
        <path 
          d="M20 5 A1 1 0 0 1 20 35 A1 1 0 0 1 20 5"
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <path 
          d="M20 8 Q26 14 20 20 Q14 26 20 32"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="18" cy="14" r="1.5" fill="white" />
        <circle cx="22" cy="26" r="1.5" fill="white" />
      </svg>
    </div>
  );
};

export default Logo;
