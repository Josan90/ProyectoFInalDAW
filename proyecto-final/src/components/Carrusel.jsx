import React, { useState, useEffect } from 'react'
import image1 from '../assets/Grandes/alanWake2G.jpg'
import image2 from '../assets/Grandes/hollowKnightG.jpg'
import image3 from '../assets/Grandes/deadSpaceG.jpeg'

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);

  // Efecto transicion de imagenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
    }, 4000); //Intervalo de tiempo

    return () => clearInterval(interval);
  }, [childrenArray.length]);

  return (
    <div className="relative w-full container mx-auto mt-6 overflow-hidden rounded-2xl max-w-[1200px] z-10">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {childrenArray.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + childrenArray.length) % childrenArray.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-20">
        ‹
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % childrenArray.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none z-20">
        ›
      </button>
    </div>
  );
};

export function Carrusel() {
  return (
    <Carousel>
      <img
        src={image1}
        alt="Portada de Alan Wake 2"
        className="h-full w-full object-cover"
      />
      <img
        src={image2}
        alt="Portada de Hollow Knight"
        className="h-full w-full object-cover"
      />
      <img
        src={image3}
        alt="Portada de Dead Space Remake"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
