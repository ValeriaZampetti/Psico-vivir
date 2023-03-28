import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import React from "react";
import DoctorCard from "../../components/DoctorCard";
import { getDoctorsPaginated } from "../../firebase/api/userService";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { Doctor } from "../../interfaces/Client";

function Searcher() {
  const {
    items,
    lastItemRef,
  }: {
    items: Doctor[];
    loadItems: () => Promise<DocumentSnapshot<DocumentData>[]>;
    lastItemRef: (node: any) => void;
  } = useInfiniteLoading({
    getItems: getDoctorsPaginated,
  });

  const cards = items.map((doctor, index) => {
    if (index === items.length - 1) {
      return (
        <div ref={lastItemRef} key={doctor.id}>
          <DoctorCard doctor={doctor} />
        </div>
      );
    }

    return <DoctorCard key={doctor.id} doctor={doctor} />;
  });

  return (
    <>
      <div className="flex justify-between items-center px-8 ">
        <h1 className="text-7xl">Doctores disponibles</h1>

        <p>Ordenar por</p>
      </div>

      <section className="flex flex-wrap px-16 mt-10 gap-4 justify-center">
        {cards}
      </section>
    </>
  );
}

export default Searcher;
