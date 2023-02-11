import React from "react";
import Landing1 from "../assets/images/Landing1.jpg";
import Google from "../assets/icons/google.svg";
import Arrow from "../assets/icons/arrow.svg";

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
  return (
    <div className="flex flex-col bg-primary justify-center">
      <section className="mt-3">
        <div className="flex flex-col md:flex-row gap-10 justify-center">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-center text-6xl">
              Bienvenido al cambio!
            </h1>

            <div className="flex flex-col gap-2 text-lg w-[17rem] ">
              {/* TODO - En el responsive se debe centrar */}
              <p>
                Prepárate para la{" "}
                <span className="font-bold">
                  mejor experiencia terapéutica{" "}
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
            <div className="h-56 w-56 bg-[#F0D575] rounded-[50%] relative flex flex-wrap justify-center content-center">
              <h2 className="absolute top-[-1.75rem]  font-bold text-7xl text-center">
                {step.id}
              </h2>
              <h2 className="font-bold text-4xl text-center">{step.title}</h2>
            </div>
          ))}
        </div>
      </section>

      <section>hola</section>
    </div>
  );
}

export default Landing;
