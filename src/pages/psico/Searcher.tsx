import {
  DocumentData,
  DocumentSnapshot,
  QueryFieldFilterConstraint,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import { getDoctorsPaginated } from "../../firebase/api/userService";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { Doctor } from "../../interfaces/Client";

function Searcher() {
  const [search, setSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [optionalWheres, setOptionalWheres] = useState<
    QueryFieldFilterConstraint[]
  >([]);

  function applyFilters(e: any) {
    e.preventDefault();
    // resetItems();
    removeFilters(e);

    if (search !== "") {
      const query = where("name", "==", search);
      setOptionalWheres(prev => [...prev, query]);
    }

    if (selectedSpecialties.length !== 0) {
      const query = where(
        "specialties",
        "array-contains-any",
        selectedSpecialties
      );
      setOptionalWheres(prev => [...prev, query]);
    }

  
    resetItems()
    
    setSearch("");
    setSelectedSpecialties([]);

  }

  function removeFilters(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setOptionalWheres([]);

  }

  const { items, lastItemRef, resetItems, loadItems } = useInfiniteLoading({
    getItems: getDoctorsPaginated,
    optionalWheres,
  });

  const cards = items.map((doctor, index) => {
    if (index === items.length - 1) {
      return (
        <div ref={lastItemRef} key={doctor.id}>
          <DoctorCard doctor={doctor as Doctor} />
        </div>
      );
    }

    return <DoctorCard key={doctor.id} doctor={doctor as Doctor} />;
  });

  return (
    <>
      <h1 className="text-7xl text-primary-normal text-center">
        Doctores disponibles
      </h1>

      <div className="flex flex-wrap flex-row justify-between items-center px-8 gap-y-4 mt-6">
      <button
          type="submit"
          className="text-black bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300
          font-medium rounded-lg px-4 py-2 active:scale-90"
          onClick={removeFilters}
        >
          Remover filtros
        </button>

        <section className="w-[60%]" id="search">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>

            <input
              type="text"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg 
              bg-gray-50 outline-none focus:ring-2 ring-offset-2 focus:ring-offset-whiet
              focus:border-primary-normal"
              placeholder="Escribe el nombre del doctor que quieras buscar"
              value={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  applyFilters(e);
                }
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <p>Ordenar por</p>

        <button
          type="submit"
          className="text-black bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300
          font-medium rounded-lg px-4 py-2 active:scale-90"
          onClick={applyFilters}
        >
          Aplicar filtros
        </button>
      </div>

      <section className="flex flex-wrap px-16 mt-10 gap-4 justify-center">
        {cards}
      </section>
    </>
  );
}

export default Searcher;
