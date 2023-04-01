import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import k from "../../assets/images/default.png";
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor } from "../../interfaces/Client";
import StarRating from "../../components/forms/StarRating";
import { storage } from "../../firebase/config";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";

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

  const gsReference = ref(
      storage,
      `gs://psico-vivir.appspot.com/imagesUsers/${id}`
    );
  
  const defaultGsReference = ref(
  storage,
  "gs://psico-vivir.appspot.com/imagesUsers/default.png"
  );
  
  const img = document.getElementById("profile-pic");
  
  getMetadata(gsReference)
  .then(() => {
  
  getDownloadURL(gsReference).then((url) => {
    img?.setAttribute("src", url);
  });
  })
  .catch((error) => {
  console.log(error);
  
  getDownloadURL(defaultGsReference).then((url) => {
    img?.setAttribute("src", url);
  });
  }); 
  }, []);

  const handleReserveButton = () => {
    navigate(`/psico/schedule/${id}`);
    console.log("Reservar");
  };

  return (
    <div className="px-14 py-7 bg-quaternary-normal">
      <div
        className="backdrop-blur-lg bg-white  drop-shadow-lg
          p-6 rounded-2xl justify-center"
      >
        <div className="py-5 md:flex">
          <div className="flex justify-center w-full md:w-1/3">
            <div className="w-2/3 ">
              <div
              className="border-8 border-primary-normal 
                    rounded-full aspect-square w-full max-w-xs m-auto flex justify-center items-center overflow-hidden"
              >
                <img src={k}/>
              </div>
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
            </section>

            <section className="flex flex-col gap-y-2">
              <h1 className="font-bold text-3xl">Biografia</h1>
              <p className="text-lg">{doctor?.biography}</p>
            </section>

            <section className="flex flex-col gap-y-2">
              <h1 className="font-bold text-3xl">Contactos</h1>

              <div className="flex flex-col gap-2 ">
                <h2 className="text-lg">
                  Telefono: <span className="font-medium">{doctor?.phone}</span>
                </h2>

                <h2 className="text-lg">
                  Correo: <span className="font-medium">{doctor?.email}</span>
                </h2>
              </div>
            </section>

            {/* <section className="w-full flex flex-col items-center md:flex-row md:gap-8">
        <h2 className="text-2xl">Contactos</h2>
        <h1 className="text-xl">
          Precio de consulta: <span className="font-bold">$20</span>
        </h1>
      </section> */}

            <button
              onClick={handleReserveButton}
              className="bg-secondary-normal h-12 w-32 border-4 border-primary-normal self-center rounded-2xl text-primary-normal font-bold md:my-0 hover:scale-105"
            >
              ¡Reserva ya!
            </button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileDoctor;
