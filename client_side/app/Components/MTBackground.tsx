"use client";
import React, { useState, useEffect, useRef } from "react";

type Position = {
  x: number;
  y: number;
};

const MTBackground: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null); // Create a ref for the div

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (divRef.current) {
      // Calculate width as a percentage of the viewport width
      const widthPercentage = (position.x / window.innerWidth) * 100;
      divRef.current.style.width = `${widthPercentage}%`;
    }
  }, [position]); // This effect updates whenever the position state changes

  return (
    <section className="w-full h-full bg-blue-900 overflow-hidden absolute">
      <div
        ref={divRef}
        className="h-full bg-white transition-width duration-1000 ease-out"
        style={{ width: '50%', minWidth: '40%', maxWidth: '60%' }}
      >
      </div>
    </section>
  );
};

export default MTBackground;