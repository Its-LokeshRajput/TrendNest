import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TrendNestSVG = () => {
  const textPathRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textPathRef.current,
      { strokeDasharray: 500, strokeDashoffset: 500 }, // Start completely hidden
      { 
        strokeDashoffset: 0, 
        duration: 5,  // Super slow motion effect
        ease: "linear", // Ensures even speed
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse the animation after completing
        repeatDelay: 0, // Adds a 2s pause before repeating
      }
    );
  }, []);

  return (
    <svg
      width="250"
      height="75"
      viewBox="0 0 400 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="80"
        fontWeight="normal"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        ref={textPathRef}
        fontFamily="Arial, sans-serif"
      >
        TrendNest
      </text>
    </svg>
  );
};

export default TrendNestSVG;
