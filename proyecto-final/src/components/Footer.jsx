import React from "react";
import { TiSocialTwitter, TiSocialFacebook, TiSocialYoutube } from "react-icons/ti";

function Footer() {
  return (
    <footer className="bg-[#050c1a] border-t-2 border-[#DEB992] w-full mt-10 flex-shrink-0">
      <div className="max-w-[1240px] mx-auto py-8 px-4">
        <div className="mb-8">
          <h3 className="text-xl text-white font-semibold mb-4">Enlaces</h3>
          <ul className="text-white space-y-2">
            <li>
              <a href="#">Contacto</a>
            </li>
            <li>
              <a href="#">Privacidad</a>
            </li>
            <li>
              <a href="#">Aviso Legal</a>
            </li>
          </ul>
          <p className="text-gray-400 mt-4">
            &copy; {new Date().getFullYear()} UltimaGuias. Todos los derechos
            reservados.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-white font-semibold mb-4">
            Redes Sociales
          </h3>
          <div className="flex gap-4">
            <a href="#">
              <TiSocialTwitter className="bg-[#DEB992] h-8 w-8 rounded-xl" />
            </a>
            <a href="#">
              <TiSocialYoutube className="bg-[#DEB992] h-8 w-8 rounded-xl" />
            </a>
            <a href="#">
              <TiSocialFacebook className="bg-[#DEB992] h-8 w-8 rounded-xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
