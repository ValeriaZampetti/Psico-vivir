import React from "react";
import Landing1 from "../assets/images/Landing1.jpg";
import Google from "../assets/icons/google.svg";
import Arrow from "../assets/icons/arrow.svg";
import Opinion from "../assets/images/opinion.png";
import { Link } from "react-router-dom";
import image from "../assets/images/psicoLogin.png"

function Landing() {
  const circleSteps = [
    {
      id: 1,
      title: "Crea una cuenta",
    },
    {
      id: 2,
      title: "Selecciona tu terapeuta",
    },
    {
      id: 3,
      title: "Agenda tu cita",
    },
    {
      id: 4,
      title: "Comienza tu terapia",
    },
  ];

  const opinions = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati",
      user: {
        name: "Juan Perez",
        rol: "Psicologo",
      },
    },
    {
      id: 2,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati",
      user: {
        name: "Juan Perez",
        rol: "Psicologo",
      },
    },
    {
      id: 3,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati",
      user: {
        name: "Juan Perez",
        rol: "Psicologo",
      },
    },
  ];

  return (
    <div className="flex flex-col bg-primary-light justify-center pt-10">
      <section className="mt-3">
        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-center text-6xl">
              ¡Bienvenido al cambio!
            </h1>

            <div className="flex flex-col gap-2 justify-center text-lg w-[25rem] self-center min-[1100px]:self-auto">
              {/* TODO - En el responsive se debe centrar */}
              <p>
                Prepárate para la{" "}
                <span className="font-bold">
                  mejor experiencia terapéutica{""}
                </span>
                , da el primer paso registrándote
              </p>
              <div className="bg-primary-normal border-primary-normal w-96 border-[7px]  "></div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Link
                className="bg-secondary-normal hover:bg-secondary-strong  drop-shadow-md duration-300 
                hover:scale-95 active:scale-90 hover:ring-4 ring-secondary-strong ring-offset-2 ring-offset-gray-100
                rounded-lg py-2 px-10 text-lg  w-[18rem] text-center font-bold"
                to="/users/register"
              >
                Registrarse con email
              </Link>

              <button
                className="flex gap-1 bg-white hover:bg-gray-100 active:ring-1 drop-shadow-md duration-300 
                hover:scale-95 active:scale-90 hover:ring-4 ring-gray-200 ring-offset-2 ring-offset-white
                rounded-lg py-2 px-4  text-lg w-[18rem]"
              >
                <img src={Google} />
                <span className="font-bold">Registrarse con Google</span>
              </button>
            </div>
          </div>

          <img
            src={Landing1}
            alt="logo"
            className="flex self-center h-auto w-80 md:w-96 rounded-2xl"
          />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-8 justify-center mt-12 z-1">
          {circleSteps.map((step) => (
            <div
              key={step.id}
              className="h-56 w-56 bg-secondary-normal rounded-[50%] relative flex flex-wrap justify-center content-center"
            >
              <h2 className="absolute top-[-1.75rem]  font-bold text-7xl text-center">
                {step.id}
              </h2>
              <h2 className="font-bold text-4xl text-center">{step.title}</h2>
            </div>
          ))}
        </div>
      </section>

      <section id="AboutUs">
      <div className="flex flex-col gap-3 mt-20">
            <h1 className="font-bold text-center text-6xl">Sobre nosotros</h1>

            <div className="flex flex-col gap-2 justify-center text-lg self-center">
              {/* TODO - En el responsive se debe centrar */}
              <p className="flex justify-center">Conoce más de nosotros</p>
              <div className="bg-primary-normal border-primary-normal w-96 border-[7px]  "></div>
            </div>
          </div>
        <div className="h-auto mb-20 mt-12 flex flex-col items-center md:flex-row md:gap-x-4 md:px-2 md:justify-around">
          <div className="md:h-[496px] w-11/12 flex flex-col max-w-sm mt-6 md:mt-0 md:max-w-xs
           bg-white border-2 border-gray-200 p-4 shadow-md rounded-3xl hover:scale-110 transition-all">
              <img src={image} alt="img-a"  className="h-auto"/>
              <h1 className="text-4xl flex justify-center font-extrabold">Psicologos</h1>
              <p className="text-3xl my-5 md:text-xl">Contamos con psicólogos colegiados con amplia
               experiencia en diversas áreas y enfoques terapéuticos.</p>
          </div>
          <div className="md:h-[496px] w-11/12 flex flex-col max-w-sm mt-6 md:mt-0 md:max-w-xs
           bg-white border-2 border-gray-200 p-4 shadow-md rounded-3xl hover:scale-110 transition-all">
              <img src={image} alt="img-a"  className="h-auto"/>
              <h1 className="text-3xl flex justify-center font-extrabold lg:text-3xl md:text-2xl">Online/presencial</h1>
              <p className="text-3xl my-5 md:text-xl">Elige como realizar la terapia, ya sea online 
              (chat, teléfono, videoconferencia) o presencial.</p>
          </div>
          <div className="md:h-[496px] w-11/12 flex flex-col max-w-sm mt-6 md:mt-0 md:max-w-xs
           bg-white border-2 border-gray-200 p-4 shadow-md rounded-3xl hover:scale-110 transition-all">
              <img src={image} alt="img-a"  className="h-auto"/>
              <h1 className="text-4xl flex justify-center font-extrabold">Comodidad</h1>
              <p className="text-3xl my-5 md:text-xl">Todo desde tu navegador: calendario de citas,
               gestión segura de pagos, mensajería con el psicólogo, materiales</p>
          </div>
        </div>
      </section>

      <section id="Opinions">
        <div className="mb-4">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-center text-6xl">Opiniones</h1>

            <div className="flex flex-col gap-2 justify-center text-lg self-center">
              {/* TODO - En el responsive se debe centrar */}
              <p className="flex justify-center">Conoce las opiniones de nuestros pacientes</p>
              <div className="bg-primary-normal border-primary-normal w-96 border-[7px]  "></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center my-12 z-1">
            {opinions.map((opinion) => (
              <div
                key={opinion.id}
                className="bg-quaternary-normal h-72 w-72 p-8 rounded-2xl"
              >
                <p className="text-gray-700">"{opinion.title}".</p>

                <div className="flex flex-row gap-2 mt-4">
                  <img src={Opinion} alt="opinion" className="" />

                  <div className="flex flex-col">
                    <p className="font-bold">{opinion.user.name}</p>
                    <p className="text-gray-800">{opinion.user.rol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
