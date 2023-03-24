import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/icons/menu.svg";
import Logo from "../../assets/images/psicovivircompleto.png";
import Logo1 from "../../assets/images/psicovivirxiquito.png";


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
      <header className="md:flex items-center justify-between bg-secondary-normal py-3 md:px-10 px-7 h-[71px]">
        <Link to={"/landing"} className="">
            <img src={Logo} alt="logo" className="w-64 h-auto hidden md:block" />
            <img src={Logo1} alt="logo" className="h-12 block md:hidden" />
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <img src={Menu} alt="logo" className="h-8 w-auto" />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
          bg-secondary-normal md:z-auto z-[-1] left-0 w-3/4 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-18" : "top-[-20rem] text-base lg:text-xl"
          }`}
        >
          {links.map((section) => (
            <li key={section.name} className="md:ml-8 md:my-0 my-7">
              <a
                href={section.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {section.name}
              </a>
            </li>
          ))}
          <Link
            className="rounded-lg border-2 border-primary-normal text-primary-strong bg-white
              hover:bg-primary-strong duration-300 font-[Poppins] md:ml-6
              active:scale-95 outline-none ring-offset-1 focus:ring-2 ring-primary-strong text-xs 
              h-11 w-24 flex justify-center items-center xl:w-32 xl:text-lg hover:ring-2 
              xl:hover:font-bold xl:hover:scale-105"
            to="/users/login"
          >
            Iniciar sesión
          </Link>
          <Link
            className="bg-primary-normal hover:bg-primary-light drop-shadow-md 
                rounded-lg text-center duration-300 font-[Poppins] ml-3 
                active:scale-95 outline-none ring-offset-1 hover:ring-2 focus:ring-2 
                ring-primary-strong h-11 w-24 text-sm flex justify-center items-center xl:w-32 xl:text-lg
                xl:hover:font-bold xl:hover:scale-105 text-white"
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
