import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../assets/icons/menu.svg";
import Logo from "../../assets/images/psicovivircompleto.png";
import LogoResponsive from "../../assets/images/psicovivirxiquito.png";
import { useAuth } from "../../hooks/useAuth";

function LandingHeader() {
  const links = [
    { name: "Sobre nosotros", link: "#AboutUs" },
    { name: "Opiniones", link: "#Opinions" },
  ];

  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  const buttonLogOut = (
    <li className="md:ml-8 md:my-0 my-7">
      <button
        className="bg-[#ed4747] drop-shadow-md text-white border-2 border-primary-light
        rounded-lg text-center duration-300 font-[Poppins] ml-3 
        outline-none ring-offset-1 hover:ring-2 focus:ring-2 
        ring-[#ed4747] h-11 w-24 text-sm flex justify-center items-center xl:w-32 xl:text-lg
        font-bold hover:scale-105   active:bg-white active:text-[#ed4747] active:scale-95"
        onClick={logOut}
      >
        Cerrar sesión
      </button>
    </li>
  );

  const buttonsNotLogIn = (
    <>
      <li className="md:ml-2 md:my-0 my-7">
        <Link
          className="bg-white rounded-lg border-2 border-primary-normal text-primary-normal
          duration-300 font-[Poppins] text-sm 
          outline-none ring-offset-1 focus:ring-2 ring-primary-strong 
          h-11 w-24 flex justify-center items-center xl:w-32 xl:text-lg hover:ring-2 
          font-bold hover:scale-105 active:bg-primary-normal active:text-white active:scale-95"
          to="/users/login"
        >
          Iniciar sesión
        </Link>
      </li>

      <li className="md:my-0 my-7">
        <Link
          className="bg-primary-normal drop-shadow-md text-white border-2 border-primary-strong
            rounded-lg text-center duration-300 font-[Poppins] text-sm
            outline-none ring-offset-1 hover:ring-2 focus:ring-2 
            ring-primary-strong h-11 w-24  flex justify-center items-center xl:w-32 xl:text-lg
            font-bold hover:scale-105   active:bg-white active:text-primary-normal active:scale-95"
          to="/users/register"
        >
          Registrarse
        </Link>
      </li>
    </>
  );

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-[99]">
      <header className="md:flex items-center justify-between bg-secondary-normal py-3 md:px-10 px-7 h-[71px]">
        <Link to={"/landing"} className="">
          <img src={Logo} alt="logo" className="w-64 h-auto hidden md:block" />
          <img
            src={LogoResponsive}
            alt="logo"
            className="h-12 block md:hidden"
          />
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <img src={Menu} alt="logo" className="h-8 w-auto" />
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static gap-4
          bg-secondary-normal md:z-auto z-[-1] left-0 w-3/4 md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-18" : "top-[-24rem] text-base lg:text-xl"
          }`}
        >
          {links.map((section) => (
            <li key={section.name} className="md:my-0 my-7">
              <a
                href={section.link}
                className="text-black hover:text-primary-strong duration-500"
              >
                {section.name}
              </a>
            </li>
          ))}
          {user != null ? (
            <>
              <li key="Chat" className="md:my-0 my-7">
                <Link
                  to={`/psico/chat/`}
                  className="text-black hover:text-primary-strong duration-500"
                >
                  Chat
                </Link>
              </li>
              <li key="Perfil" className="md:my-0 my-7">
                <Link
                  to={`/psico/profile/${user?.id}`}
                  className="text-black hover:text-primary-strong duration-500"
                >
                  Perfil
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {user ? buttonLogOut : buttonsNotLogIn}
        </ul>
      </header>
    </nav>
  );
}

export default LandingHeader;
