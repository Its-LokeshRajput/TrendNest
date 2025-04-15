import React, { useEffect, useRef } from 'react'
import './Footer.css'
import TrendNestSVG from '../TrendNestSVG'
import gsap from 'gsap';

const Footer = () => {

  const textPathRef = useRef(null);

  let lokeshWaghAbsBoxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      textPathRef.current,
      { strokeDasharray: 500, strokeDashoffset: 500 }, // Start completely hidden
      {
        strokeDashoffset: 0,
        duration: 7,  // Super slow motion effect
        ease: "ease", // Ensures even speed
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse the animation after completing
        repeatDelay: 0, // Adds a 2s pause before repeating
      }
    );
  }, []);

  return (
    <div id='footer-container'>
      {/* <h1 id='company-name'>Cloths shop</h1> */}
      <h1 id='company-name' style={{ textTransform: 'capitalize' }}>
        <svg
          width="600"
          height="0"
          viewBox="0 0 1000 150"
          fill="none"
        // xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="60%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="180"
            fontWeight="800"
            // fill="white"
            stroke="white"
            strokeWidth="5"
            ref={textPathRef}
            fontFamily="Arial, sans-serif"
          >
            TrendNest
          </text>
        </svg>
      </h1>
      <p id='slogun-text'>TrendNest – A hub for all the latest fashion trends.</p>

      <p id='copy-right-text'>Copyright © 2025 TrendNest.com</p>

      <div id='footer-contact-details-container'>
        <p id='footer-contact-details'>Company Email : <a href="mailto:lokeshwaght5072@gmail.com">lokeshwaght5072@gmail.com</a></p>
        <p>Address : RainBow Plaza, Konkane Chowk, Pune, 411017</p>
        <p style={{ position: 'relative' }}>Developer :

          <span
            id="lokesh-wagh-actual-box"
            onMouseMove={(e) => {
              if (!lokeshWaghAbsBoxRef.current) return;

              let x = e.clientX - 150
              let y = (e.clientY / 4) - 150

              console.log("X:", x, " Y:",y)

              lokeshWaghAbsBoxRef.current.style.transform = `translate(${x}%, ${y}%)`;
            }}
            style={{
              textDecoration: "underline",
              cursor: "crosshair",
              position: "relative",
            }}
          >
            Lokesh Wagh
            <span
              ref={lokeshWaghAbsBoxRef}
              id="lokesh-wagh-on-hover-abs-box"
              style={{
                display: "inline-block",
              }}
            ></span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Footer