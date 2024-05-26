import React from 'react';
import alanWake2C from '../assets/Cover/alanWake2C.jpeg';
import deadSpaceC from '../assets/Cover/deadSpaceC.jpg';
import hollowKnightC from '../assets/Cover/hollowKnightC.jpg';
import liesOfPC from '../assets/Cover/liesOfPC.jpg';
import lordsOfTheFallenC from '../assets/Cover/lordsOfTheFallenC.jpg';
import stellarBladeC from '../assets/Cover/stellarBladeC.jpg';
import { Link } from 'react-router-dom';

function Recientes() {
  return (
    <div className="max-w-[1240px] mx-auto mt-20 px-4">
      <span className="relative text-[#1BA098] text-3xl font-bold mb-4">
        Últimas Guias
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#cbd5e1]"></span>
      </span>
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl">
          <Link to="./guia/alan-wake-2">
            <div className="rounded-xl overflow-hidden group">
              <img src={alanWake2C} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Alan Wake 2" />
            </div>
            <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
              Alan Wake 2
            </h2>
          </Link>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={deadSpaceC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Dead Space Remake" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Dead Space Remake
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={hollowKnightC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Hollow Knight" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Hollow Knight
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={liesOfPC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Lies of P" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Lies of P
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={lordsOfTheFallenC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Lords of the Fallen" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Lords of the Fallen
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={stellarBladeC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Stellar Blade" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Stellar Blade
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Recientes;
