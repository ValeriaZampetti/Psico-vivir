import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import Profile from "../../assets/mock/pic.jpg";
import { Doctor } from "../../interfaces/Client"; // Pasarle el nombre del doc auto
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

function WriteReview() {
  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const [success, setSuccess] = useState(false);

  const [danger, setDanger] = useState(false);

  const commentRef = useRef();

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();

  //   if (comment === '') {
  //     setDanger(true);
  //   } else {
  //     setTimeout(() => {
  //       setComment('');
  //     }, 2000);
  
  //     setSuccess(true);
  //   }
  //   setTimeout(() => {
  //     setDanger(false);
  //     setSuccess(false);
  //   }, 4000);

  // }





  useEffect(() => {
    console.log(rating);
  }, [rating]);

  const sendComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();



    const commentToSend = comment;
    const ratingToSend = rating;
    setComment("");
    setRating(0);
    await addDoc(collection(db, "feedback"), {
      id: "dsa",
      appointmentId: "fasdfasdf",
      rating: ratingToSend,
      message: commentToSend,
    });
  };

  return (
    <div className="p-5 lg:p-10">
      <div className="relative flex items-center text-center text-3xl md:text-4xl lg:text-5xl font-bold border-solid drop-shadow-md mb-8 md:mb-10">
        Califique su experiencia
      </div>

      <div className="flex flex-col items-center mb-10">
        <img
          src={Profile}
          alt="doctor-profile-pic"
          className="h-40 md:h-48 lg:h-64 rounded-full border-rose-300 border-8 mb-4 md:mb-6"
        />

        <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-center border-solid drop-shadow-md mb-2 md:mb-4">
          Dr. Juan Perez
        </div>

        <div className="flex flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center">
            <StarRating
              currentRating={rating}
              handleCurrentRating={(newRating: number) => setRating(newRating)}
              svgClass="h-7 md:h-9 w-10 md:w-12"
            />
          </div>
        </div>

        <div className="text-xl md:text-2xl font-bold mt-6 border-solid drop-shadow-md">
          Comentarios
        </div>

        <textarea
          placeholder="Escribe tu comentario aqui..."
          className="rounded-lg px-4 resize-none h-24 md:h-32 w-full md:w-2/3 border-2 border-rose-300 outline-none mt-4 md:mt-6"
          // ref={commentRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="button"
          className="bg-rose-300 rounded-lg px-4 py-2 mt-8 md:mt-10 text-white font-bold w-full md:w-auto text-xl md:text-2xl"
          onClick={sendComment}
        >
          Enviar
        </button>

        <div className="w-full relative mt-3 flex justify-center">

          {danger && <div id="danger" className="text-red-500 text-2xl absolute transition duration-300 animate-buttons hidden">Error, por favor escriba un mensaje.</div>}
          
          {success && <div id="" className="text-green-500 text-2xl absolute animate-buttons hidden">Tu mensaje ha sido enviado con exito!</div>}

        </div>
      </div>
    </div>
  );
}

export default WriteReview;