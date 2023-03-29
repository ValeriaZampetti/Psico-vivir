import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import k from "../../assets/mock/pic.jpg";
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor } from "../../interfaces/Client";
import StarRating from "../../components/forms/StarRating";

function ProfileDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();

  const initializeDoctor = async () => {
    const doctor = await getDoctorById(id ?? "");
    setDoctor(doctor);
  };

  useEffect(() => {
    initializeDoctor();
  }, []);

  const handleReserveButton = () => {
    navigate(`/psico/schedule/${id}`);
    console.log("Reservar");
  };

  function setRanking(rating: number) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="py-5 md:flex">
      <div className="flex justify-center w-full md:w-1/3">
        <div className="w-2/3 ">
          <img
            src={k}
            alt=""
            className="border-8 border-primary-normal 
                        rounded-full aspect-square w-full max-w-xs m-auto"
          />
        </div>
      </div>

      <main className="md:w-2/3 px-6 flex flex-col gap-y-5 justify-center">
        <section className="flex justify-center mt-6 flex-col gap-y-2">
          <h1 className="font-bold text-4xl md:text-5xl text-center md:text-start">
            Dr. {doctor?.name}
          </h1>

          <div className="flex justify-center md:justify-start">
            <StarRating
              svgClass="h-10 md:h-12 "
              currentRating={doctor?.ranking ?? 0}
              readonly={true}
            />
          </div>
        </section>

        <section className="flex flex-col gap-y-2">
          <h1 className="font-bold text-3xl">Especialidades</h1>
          <div className="flex flex-row flex-wrap gap-2 w-[80%] ">
            {doctor?.specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-quaternary-normal px-4 py-1 rounded-xl
                  flex flex-row justify-center items-center gap-2"
              >
                <p className="text-black">{specialty}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-2">
            <h1 className="font-bold text-3xl">Biografia</h1>
            <p className="text-lg">{doctor?.biography}</p>
          </div>
        </section>

        <div className="w-full flex flex-col items-center justify-center md:flex-row md:gap-8">
          <h1 className="text-xl p-4 justify-center">
            Precio de consulta: <span className="font-bold">$20</span>
          </h1>

        </div>
          <button
            onClick={handleReserveButton}
            className="bg-secondary-normal my-3 mb-6 h-12 w-32 border-4 border-primary-normal rounded-2xl text-primary-normal font-bold md:my-0 hover:scale-105"
          >
            ¡Reserva ya!
          </button>
      </main>
    </div>
  );
}

export default ProfileDoctor;
