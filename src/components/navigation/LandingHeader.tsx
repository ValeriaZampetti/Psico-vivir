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
      <header className="md:flex items-center justify-between bg-secondary-normal py-4 md:px-10 px-7">
        <Link to={"/landing"}>
            <img src={Logo} alt="logo" className="h-10 md" />
            <img src={Logo1} alt="logo" className="h-10 hidden md:block" />
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <img src={Menu} alt="logo" className="h-8 w-auto" />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static
          bg-secondary md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-18 " : "top-[-20rem]"
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
          <button
            className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500"
          >
            Get started
          </button>
        </ul>
      </header>
    </nav>
  );
}

export default LandingHeader;
