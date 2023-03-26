import React, { useEffect, useRef, useState } from "react";
import StarRating from "../../components/forms/StarRating";
import { Doctor } from "../../interfaces/Client";

interface DoctorCardProps {
  doctor: Doctor;
}

function PatientsReviews() {
  const [ranking, setRanking] = useState(4);

  return (
    <div className="p-5 lg:p-10">

      <div className="relative flex items-center text-center text-3xl md:text-4xl lg:text-5xl font-bold border-solid drop-shadow-md mb-8 md:mb-10">
        Reviews de Pacientes
      </div>

    </div>
  );

}

export default PatientsReviews;
