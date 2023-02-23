import React from "react";
import Landing1 from "../assets/images/Landing1.jpg";
import Google from "../assets/icons/google.svg";
import Arrow from "../assets/icons/arrow.svg";
import Opinion from "../assets/images/opinion.png";

function Landing() {
  const circleSteps = [
    {
      id: 1,
      title: "Crea una cuenta!",
    },
    {
      id: 2,
      title: "Selecciona tu terapeuta!",
    },
    {
      id: 3,
      title: "Agenda tu cita!",
    },
    {
      id: 4,
      title: "Comienza tu terapia!",
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
    <div className="flex flex-col bg-primary justify-center">
      <section className="mt-3">
        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-center text-6xl">
              Bienvenido al cambio!
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
              <div className="bg-white border-white w-96 border-[7px]  "></div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button className="bg-secondary rounded-lg py-2 px-10 text-lg w-[18rem]">
                <span className="font-bold">Registrarse con email</span>
              </button>

              <button className="flex gap-1 bg-white rounded-lg py-2 px-4  text-lg w-[18rem]">
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
              className="h-56 w-56 bg-[#F0D575] rounded-[50%] relative flex flex-wrap justify-center content-center"
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
        <div>hola</div>
      </section>

      <section id="Opinions">
        <div className="mb-4">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-center text-6xl">Opiniones</h1>

            <div className="flex flex-col gap-2 justify-center text-lg self-center">
              {/* TODO - En el responsive se debe centrar */}
              <p>Conoce las opiniones de nuestros pacientes</p>
              <div className="bg-white border-white w-96 border-[7px]  "></div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mt-12 z-1">
            {opinions.map((opinion) => (
              <div
                key={opinion.id}
                className="bg-[#FFF2C8] h-72 w-72 p-8 rounded-md"
              >
                <p className="text-gray-400">"{opinion.title}".</p>

                <div className="flex flex-row gap-2 mt-4">
                  <img src={Opinion} alt="opinion" className="" />

                  <div className="flex flex-col">
                    <p className="font-bold">{opinion.user.name}</p>
                    <p className="text-gray-400">{opinion.user.rol}</p>
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
