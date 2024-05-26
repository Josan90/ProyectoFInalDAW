import React, { useState } from 'react';

function AlanWake2Guide() {
  const [currentSection, setCurrentSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introducción', image: '/images/alan-wake-2/portadaAW2.jpg' },
    { id: 'chapter0', title: 'El regreso 0: La secta', image: '/images/alan-wake-2/chapter0.jpg' },
    { id: 'chapter1', title: 'El regreso 1: Invitación (Saga)', image: '/images/alan-wake-2/chapter1.jpg' },
    { id: 'chapter2', title: 'El regreso 2: El Corazón (Saga)', image: '/images/alan-wake-2/chapter2.jpg' },
    { id: 'chapter3', title: 'La iniciación 1: De madrugada (Alan)', image: '/images/alan-wake-2/chapter3.jpg' },
    { id: 'chapter4', title: 'La iniciación 2: Casey (Alan)', image: '/images/alan-wake-2/chapter4.jpg' },
    { id: 'chapter5', title: 'La iniciación 3: Encantador (Alan)', image: '/images/alan-wake-2/chapter5.jpg' },
    { id: 'chapter6', title: 'El regreso 3: Chica local (Saga)', image: '/images/alan-wake-2/chapter6.jpg' },
    { id: 'chapter7', title: 'El regreso 4: Ni de coña (Saga)', image: '/images/alan-wake-2/chapter7.jpg' },
    { id: 'chapter8', title: 'La iniciación 4: Cantamos (Alan)', image: '/images/alan-wake-2/chapter8.jpg' },
    { id: 'chapter9', title: 'La iniciación 5: Habitación 665 (Alan)', image: '/images/alan-wake-2/chapter9.jpg' },
    { id: 'chapter10', title: 'La iniciación 6: Regreso (Alan)', image: '/images/alan-wake-2/chapter10.jpg' },
    { id: 'chapter11', title: 'El regreso 5: Old Gods (Saga)', image: '/images/alan-wake-2/chapter11.jpg' },
    { id: 'chapter12', title: 'El regreso 6: Scratch (Saga)', image: '/images/alan-wake-2/chapter12.jpg' },
    { id: 'chapter13', title: 'La iniciación 7: Máscaras (Alan)', image: '/images/alan-wake-2/chapter13.jpg' },
    { id: 'chapter14', title: 'La iniciación 8: Peli de Zane (Alan)', image: '/images/alan-wake-2/chapter14.jpg' },
    { id: 'chapter15', title: 'El regreso 7: Invocación (Saga)', image: '/images/alan-wake-2/chapter15.jpg' },
    { id: 'chapter16', title: 'La iniciación 9: Fuera (Alan)', image: '/images/alan-wake-2/chapter16.jpg' },
    { id: 'chapter17', title: 'El regreso 8: Festival (Alan)', image: '/images/alan-wake-2/chapter17.jpg' },
    { id: 'chapter18', title: 'El regreso 9: A casa (Saga)', image: '/images/alan-wake-2/chapter18.jpg' },
    {
      id: 'secondary', title: 'Contenido Secundario', image: '/images/alan-wake-2/secondary.jpg', isDropdown: true, dropdownItems: [
        { id: 'weapons', title: 'Armas' },
        { id: 'charms', title: 'Amuletos' },
        { id: 'powerWords', title: 'Palabras de poder' },
        { id: 'nurseryRhymes', title: 'Canciones infantiles' },
        { id: 'ads', title: 'Anuncios de hermanos Koskela' },
        { id: 'chests', title: 'Cofres de la secta' },
        { id: 'lunchBoxes', title: 'Fiambreras' },
        { id: 'deerHeads', title: 'Cabezas de ciervo' },
        { id: 'manuscriptPages', title: 'Páginas del manuscrito' },
        { id: 'maps', title: 'Mapas' },
        { id: 'inventoryUpgrades', title: 'Mejoras de inventario' },
        { id: 'trophies', title: 'Trofeos / Logros' }
      ]
    }
  ];

  const renderSection = () => {
    const section = sections.find(sec => sec.id === currentSection);
    return (
      <section className="mb-8 max-w-[1200px]">
        {currentSection === 'introduction' && (
          <div>
            <h1 className="text-3xl font-bold text-[#DEB992] mb-4">Guía de Alan Wake 2</h1>
            <img src={section.image} alt={section.title} className="w-full h-64 object-cover mb-4 rounded-xl" />
            <h2 className="text-2xl font-bold text-[#DEB992] mb-2">Introducción</h2>
            <div className="border-b-2 border-[#DEB992] mb-4"></div>
            <p className="text-gray-200">
              Bienvenido a la guía completa de Alan Wake 2. En esta guía, encontrarás todo lo necesario para completar el juego, desde consejos básicos hasta estrategias avanzadas.
            </p>
            <h2 className="text-2xl font-bold text-[#DEB992] mt-8 mb-2">Índice</h2>
            <div className="border-b-2 border-[#DEB992] mb-4"></div>
            <table className="table-auto w-full text-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-2 py-2 w-1/12">✔</th>
                  <th className="px-4 py-2">Título del Capítulo</th>
                  <th className="px-4 py-2">Coleccionables</th>
                  <th className="px-4 py-2">Duración</th>
                </tr>
              </thead>
              <tbody>
                {sections.filter(sec => !sec.isDropdown).map((sec, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-2 text-center"><input type="checkbox" /></td>
                    <td className="border px-4 py-2">{sec.title}</td>
                    <td className="border px-4 py-2 text-center">{Math.floor(Math.random() * 10)}</td>
                    <td className="border px-4 py-2 text-center">{Math.floor(Math.random() * 5) + 1}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="text-2xl font-bold text-[#DEB992] mt-8 mb-2">Antes de jugar</h2>
            <div className="border-b-2 border-[#DEB992] mb-4"></div>
            <p className="text-gray-200">
              Antes de sumergirte en el mundo de Alan Wake 2, es importante que sepas algunas cosas. Este juego combina elementos de acción y terror psicológico, así que prepárate para enfrentar tanto enemigos físicos como desafíos mentales. Mantén tu linterna y tus baterías siempre listas, y no olvides explorar cada rincón para encontrar recursos valiosos.
            </p>
          </div>
        )}
        {currentSection !== 'introduction' && !section.isDropdown && (
          <div>
            <h2 className="text-2xl font-bold text-[#DEB992] mb-2">{section.title}</h2>
            <div className="border-b-2 border-[#DEB992] mb-4"></div>
            <img src={section.image} alt={section.title} className="w-full h-64 object-cover mb-4 rounded" />
            <p className="text-gray-200">
              Contenido del capítulo: {section.title}.
            </p>
          </div>
        )}
        {section.isDropdown && section.dropdownItems.map(item => (
          <div key={item.id}>
            <h2 className="text-2xl font-bold text-[#DEB992] mb-2">{item.title}</h2>
            <div className="border-b-2 border-[#DEB992] mb-4"></div>
            <p className="text-gray-200">
              Contenido del apartado: {item.title}.
            </p>
          </div>
        ))}
      </section>
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      <nav className="w-full md:w-1/4 bg-[#051622] p-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => setCurrentSection(section.id)}
                className={`w-full text-left p-2 rounded-md transition-colors duration-300 ${currentSection === section.id ? 'bg-[#1BA098] text-white' : 'text-gray-200 hover:bg-[#1BA098] hover:text-white'}`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full md:w-3/4 p-8">
        {renderSection()}
      </div>
    </div>
  );
}

export default AlanWake2Guide;
