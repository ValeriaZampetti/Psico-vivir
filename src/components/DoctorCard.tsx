import React from "react";
import Profile from "../assets/mock/profile.png"; 
import { Doctor } from "../interfaces/Client";

interface DoctorCardProps {
  doctor: Doctor;
}

function DoctorCard(props: DoctorCardProps) {
  return (
    <div
      className="bg-white border-gray-400 border-2 rounded-lg p-4 
      flex flex-col justify-center w-80"
    >
      <img src={Profile}></img>
      <h1 className="font-bold text-3xl self-center">{props.doctor.name}</h1>
      <p className="self-center">{props.doctor.specialties.join(", ")}</p>
      {/* TODO - Componente readonly de ranking */}
      <span className="self-center">{props.doctor.ranking}</span>
      <p className="text-gray-700">{props.doctor.biography}</p>
    </div>
  );
}

export default DoctorCard;
