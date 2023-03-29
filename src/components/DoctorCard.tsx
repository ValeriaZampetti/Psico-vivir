import React from "react";
import Profile from "../assets/mock/profile.png";
import { Doctor } from "../interfaces/Client";
import StarRating from "./forms/StarRating";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  doctor: Doctor;
}

function DoctorCard(props: DoctorCardProps) {
  const [ranking, setRanking] = React.useState<number>(props.doctor.ranking);
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border-secondary-normal border-4 rounded-3xl p-4 backdrop-filter backdrop-blur-lg
      flex flex-col justify-center w-80"
    >
      <img src={Profile}></img>
      <h1 className="font-semibold text-3xl self-center">{props.doctor.name}</h1>
      <section className="flex flex-wrap gap-2 my-2 justify-center">
      {
        props.doctor.specialties.map((specialty, index) => {
          return (
            <p className="bg-secondary-normal rounded-lg  px-4 py-2
            font-semibold  text-center" key={index}>{specialty}</p>
          );
        })
      }
      </section>

      {/* TODO - Componente readonly de ranking */}
      <StarRating
        svgClass="h-[2rem]"
        currentRating={ranking}
        handleCurrentRating={(rating: number) => {
          setRanking(rating);
        }}
        readonly={false}
      />
      {/* TODO - Poner máximo de lineas */}
      <p className="text-gray-700 text-center mt-2 text-lg line-clamp-3">{props.doctor.biography}</p>
      <button
        className="w-full py-3 text-black font-bold uppercase rounded-lg shadow-lg duration-300
        bg-primary-light hover:bg-primary-normal hover:scale-95 active:scale-90
        hover:ring-4 ring-primary-strong ring-offset-2 ring-offset-gray-100
          mt-4" onClick={() => navigate(`/psico/doctor/${props.doctor.id}`)}
      >
        Ver perfil
      </button>
    </div>
  );
}

export default DoctorCard;
