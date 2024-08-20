"use client";
import React, { useState, useEffect, useRef } from "react";
import BgImage from "../../public/images/bg1.jpg";
import BgImage2 from "../../public/images/bg_s.jpg";
import Image from "next/image";
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
    <section className="w-screen h-screen bg-blue-900 overflow-hidden absolute">
      <Image src={BgImage} width={1920} height={1080} alt="bg image" className="min-w-max h-auto"/>
      <div
        ref={divRef}
        className="h-screen bg-white transition-width duration-1000 overflow-hidden ease-out absolute top-0 left-0"
        style={{ width: "50%", minWidth: "40%", maxWidth: "60%" }}
      >
        <div className="relative">
        <Image src={BgImage2} width={1920} height={1080} alt="bg image" className="h-auto min-w-max absolute"/>     

        </div>
      </div>
    </section>
  );
};

export default MTBackground;
