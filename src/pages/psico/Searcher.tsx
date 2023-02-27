import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import { getDoctors } from "../../firebase/api";
import { Doctor } from "../../interfaces/Client";

function Searcher() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const initializeDoctors = async () => {
    const doctorsSnapshot = await getDoctors();

    const docs: Doctor[] = [];
    doctorsSnapshot.forEach((doctor) => {
      docs.push({ id: doctor.id, ...doctor.data() } as Doctor);
    });
    
    setDoctors(docs);
  };

  useEffect(() => {
    initializeDoctors();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center px-8">
        <h1 className="text-7xl">Doctores disponibles</h1>

        <p>Ordenar por</p>
      </div>

      <section>
        <div className="flex flex-wrap px-16 mt-10">
          {doctors.map((doctor) => (
            <DoctorCard 
            key={doctor.id}
            doctor={doctor} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Searcher;
