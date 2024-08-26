import React from 'react';
import { TiSocialTwitter, TiSocialFacebook, TiSocialYoutube } from "react-icons/ti";

function Contacto() {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold text-[#DEB992] mb-4 text-center">Contacto</h1>
      <p className="text-gray-300 text-lg mb-8 text-center">
        Si deseas colaborar, aportar sugerencias, o simplemente ponerte en contacto con nosotros, 
        puedes hacerlo a través de los siguientes medios.
      </p>
      <div className=" border-2 border-[#DEB992] rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#1BA098] mb-4">Información de Contacto</h2>
        <p className="text-gray-300 text-lg"><b>Correo Electrónico:</b> contacto@ultimaguias.com</p>
        <p className="text-gray-300 text-lg"><b>Teléfono:</b> +123 456 7890</p>
      </div>
      <div className=" border-2 border-[#DEB992] rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#1BA098] mb-4">Redes Sociales</h2>
        <div className="flex gap-4 justify-center">
          <a href="#" className="text-2xl text-[#1BA098] hover:text-[#DEB992] transition-colors"><TiSocialTwitter /></a>
          <a href="#" className="text-2xl text-[#1BA098] hover:text-[#DEB992] transition-colors"><TiSocialFacebook /></a>
          <a href="#" className="text-2xl text-[#1BA098] hover:text-[#DEB992] transition-colors"><TiSocialYoutube /></a>
        </div>
      </div>
      <div className=" border-2 border-[#DEB992] rounded-lg p-8">
        <h2 className="text-2xl font-bold text-[#1BA098] mb-4">Colaboraciones</h2>
        <p className="text-gray-300 text-lg mb-4">
          Si quieres colaborar con nosotros y ayudar a mantener el sitio, 
          puedes hacer una donación a través del siguiente enlace de PayPal:
        </p>
        <a href="#" className="text-[#1BA098] text-lg underline hover:text-[#DEB992] transition-colors">Donar a través de PayPal</a>
      </div>
    </div>
  );
}

export default Contacto;
