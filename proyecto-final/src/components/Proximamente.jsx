import React from 'react';
import bloodBorneC from '../assets/Cover/Proximamente/bloodBorneC.jpg';
import hellBlade2C from '../assets/Cover/Proximamente/hellBlade2C.jpg';
import lolC from '../assets/Cover/Proximamente/lolC.jpg';
import pragmataC from '../assets/Cover/Proximamente/pragmataC.jpg';
import silkSongC from '../assets/Cover/Proximamente/silkSongC.jpg';

function Proximamente() {
  return (
    <div className="max-w-[1240px] mx-auto mt-20 px-4">
      <span className="relative text-[#1BA098] text-3xl font-bold mb-4">
        Próximamente
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[#cbd5e1]"></span>
      </span>
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={bloodBorneC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" 
            alt="Bloodborne" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Bloodborne
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={hellBlade2C} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" 
            alt="Hellblade 2" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Hellblade 2
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={lolC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="League of Legends" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            League of Legends
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={pragmataC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Pragmata" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Pragmata
          </h2>
        </div>

        <div className="rounded-xl">
          <div className="rounded-xl overflow-hidden group">
            <img src={silkSongC} className="w-full h-auto object-cover transform transition-transform duration-300 group-hover:scale-105" alt="Hollow Knight: Silksong" />
          </div>
          <h2 className="text-[#cbd5e1] text-2xl md:text-2xl font-medium mt-2 text-center">
            Hollow Knight: Silksong
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Proximamente;
