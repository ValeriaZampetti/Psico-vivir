import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/icons/menu.svg";

import Logo from "../../assets/react.svg";

function LandingHeader() {
  let links = [
    { name: "Sobre nosotros", link: "#AboutUs" },
    { name: "Servicios", link: "#Services" },
    { name: "Opiniones", link: "#Opinions" },
    { name: "Contacto", link: "#Contact" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-[99]">
      <header className="md:flex items-center justify-between bg-secondary-normal py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
    text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <img src={Logo} alt="logo" />
          </span>
          Designer
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <img src={Menu} alt="logo" className="h-8 w-auto" />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
          bg-secondary-normal md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-18" : "top-[-20rem]"
          }`}
        >
          {links.map((section) => (
            <li key={section.name} className="md:ml-8 text-xl md:my-0 my-7">
              <a
                href={section.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {section.name}
              </a>
            </li>
          ))}
          <Link
            className="rounded-lg px-4 py-2 border-2 border-primary-normal text-primary-strong bg-white
              hover:bg-primary-strong hover:text-white duration-300 font-[Poppins] md:ml-8 text-center
              active:scale-95 outline-none ring-offset-1 focus:ring-2 ring-primary-strong "
            to="/users/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="bg-primary-normal hover:bg-primary-light  drop-shadow-md 
                rounded-lg py-2 px-6 text-center duration-300 font-[Poppins] ml-5 
                active:scale-95 outline-none ring-offset-1 hover:ring-2 focus:ring-2 ring-primary-strong"
            to="/users/register"
          >
            Registrarse
          </Link>
        </ul>
      </header>
    </nav>
  );
}

export default LandingHeader;
