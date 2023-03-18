import React, { useEffect, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import Profile from "../../assets/mock/pic.jpg";
import { Doctor } from "../../interfaces/Client"; // Pasarle el nombre del doc auto

function WriteReview() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="h-16 p-5 relative top-8 left-7 font-bold text-4xl flex items-center text-center border-solid drop-shadow-md mb-10">
        Califique su experiencia
      </div>

      <div className="flex flex-col items-center mb-10">
        <img
          src={Profile}
          alt="doctor-profile-pic"
          className="h-48 rounded-full border-rose-300 border-8"
        />

        <div>
          <div className="text-3xl font-medium mt-5 border-solid drop-shadow-md">
            Dr. Juan Perez
          </div>
        </div>

        <div className="position-absolute p-5 left-264 top-366 flex flex-row items-start gap-10">
          <StarRating
            currentRating={rating}
            handleCurrentRating={(newRating: number) => setRating(newRating)}
            svgClass="h-9 w-12"
          />
        </div>

        <div className="p-2 font-bold mt-5 border-solid drop-shadow-md">
          Comentarios
        </div>

        <textarea
          name=""
          id=""
          placeholder="Escribe tu comentario aqui..."
          className="rounded-lg px-4 resize-none h-20 w-1/2 border-2 border-rose-300 outline-none"
        ></textarea>

        <button type="button" className="bg-rose-300 rounded-lg px-4 py-2 mt-5 text-white font-bold w-44 text-2xl">
          Enviar
        </button>

      </div>
    </div>
  );
}

export default WriteReview;
