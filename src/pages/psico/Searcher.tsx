import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard";
import { Dropdown } from "../../components/forms/Dropdown";
import {
  getDoctors,
  getSpecialties,
} from "../../firebase/api/userService";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { Doctor } from "../../interfaces/Client";
import { Specialty } from "../../interfaces/Specialty";
import xImage from "../../assets/icons/x.svg";
import { toast } from "react-toastify";

// function Searcher() {
//   const [search, setSearch] = useState("");
//   const [originalSpecialties, setOriginalSpecialties] = useState<Specialty[]>([]);
//   const [specialties, setSpecialties] = useState<Specialty[]>([]);
//   const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

//   const [optionalWheres, setOptionalWheres] = useState<
//     QueryFieldFilterConstraint[]
//   >([]);

//   async function initalizeSpecialties() {
//     const specialties  = await getSpecialties();
//     setSpecialties(specialties);
//     setOriginalSpecialties(specialties);
//   }

//   useEffect(() => {
//     initalizeSpecialties();
//   }, []);

//   function applyFilters(e: any) {
//     e.preventDefault();
//     setOptionalWheres([]);
//     console.log("search", optionalWheres);
//     removeFilters(e);

//     if (search !== "") {
//       const query = where("name", "==", search);
//       setOptionalWheres((prev) => [...prev, query]);
//     }

//     if (selectedSpecialties.length !== 0) {
//       const query = where(
//         "specialties",
//         "array-contains-any",
//         selectedSpecialties
//       );
//       setOptionalWheres((prev) => [...prev, query]);
//     }

//     resetItems();

//     setSelectedSpecialties([]);
//     setSpecialties(originalSpecialties);
//     setSearch("");
//   }

//   function removeFilters(e: React.MouseEvent<HTMLButtonElement>) {
//     e.preventDefault();

//     setOptionalWheres([]);
//     resetItems();
//   }

//   const { items, lastItemRef, resetItems } = useInfiniteLoading({
//     getItems: getDoctorsPaginated,
//     optionalWheres,
//   });

//   const cards = items.map((doctor, index) => {
//     if (index === items.length - 1) {
//       return (
//         <div ref={lastItemRef} key={doctor.id}>
//           <DoctorCard doctor={doctor as Doctor} />
//         </div>
//       );
//     }

//     return <DoctorCard key={doctor.id} doctor={doctor as Doctor} />;
//   });

//   return (
//     <>
//       <h1 className="text-7xl text-primary-normal text-center">
//         Doctores disponibles
//       </h1>

//       <div className="flex flex-col gap-5 justify-center px-16 mt-8">
//         <div className="flex flex-row justify-between">
//           <div>
//             <Dropdown
//               title="Especialidades"
//               changeTitle={false}
//               options={
//                 specialties
//                   ? specialties.map((specialty) => {
//                       return {
//                         value: specialty.id,
//                         label: specialty.name,
//                         onClick: () => {
//                           if (selectedSpecialties.length === 5) {
//                             toast.error(
//                               "No puedes seleccionar más de 5 especialidades"
//                             );
//                             return;
//                           }
//                           setSelectedSpecialties([
//                             ...selectedSpecialties,
//                             specialty.id,
//                           ]);
//                           setSpecialties(
//                             specialties.filter(
//                               (item) => item.id !== specialty.id
//                             )
//                           );
//                         },
//                       };
//                     })
//                   : []
//               }
//             />
//           </div>

//           <button
//             type="submit"
//             className="text-black hidden md:block bg-quaternary-normal border-2 border-primary-normal
//           focus:ring-4 outline-none duration-300 focus:ring-blue-300
//           font-medium rounded-lg px-4 py-2 active:scale-90"
//             onClick={removeFilters}
//           >
//             Remover filtros
//           </button>
//         </div>

//         {selectedSpecialties.length > 0 && (
//           <div className="flex flex-row flex-wrap gap-2 w-[80%]">
//             {selectedSpecialties.map((specialty, index) => (
//               <div
//                 key={index}
//                 className="bg-quaternary-normal px-4 py-1 rounded-xl
//                   flex flex-row justify-center items-center gap-2"
//               >
//                 <p className="text-black">{specialty}</p>
//                 <img
//                   src={xImage}
//                   className="h-4 cursor-pointer"
//                   onClick={() => {
//                     setSelectedSpecialties(
//                       selectedSpecialties.filter((item) => item !== specialty)
//                     );
//                     setSpecialties([
//                       ...specialties,
//                       { id: specialty, name: specialty },
//                     ]);
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="text-black md:hidden bg-quaternary-normal border-2 border-primary-normal
//           focus:ring-4 outline-none duration-300 focus:ring-blue-300
//           font-medium rounded-lg px-4 py-2 active:scale-90"
//           onClick={removeFilters}
//         >
//           Remover filtros
//         </button>
//       </div>

//       <div className="flex flex-wrap flex-row justify-between items-center px-16 gap-y-4 mt-6">
//         <section className="w-full md:w-[60%]" id="search">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <svg
//                 aria-hidden="true"
//                 className="w-5 h-5 text-gray-500 dark:text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 ></path>
//               </svg>
//             </div>

//             <input
//               type="text"
//               id="default-search"
//               className="block w-full p-4 pl-10 text-sm text-black border border-gray-300 rounded-lg
//               bg-gray-50 outline-none focus:ring-2 ring-offset-2 focus:ring-offset-whiet
//               focus:border-primary-normal"
//               placeholder="Escribe el nombre del doctor que quieras buscar"
//               value={search}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   applyFilters(e);
//                 }
//               }}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//         </section>

//         <button
//           type="submit"
//           className="text-black bg-quaternary-normal border-2 border-primary-normal
//           focus:ring-4 outline-none duration-300 focus:ring-blue-300 w-full md:w-auto
//           font-medium rounded-lg px-4 py-2 active:scale-90"
//           onClick={applyFilters}
//         >
//           Aplicar filtros
//         </button>
//       </div>

//       <section className="flex flex-wrap px-16 mt-10 gap-4 justify-center">
//         {cards}
//       </section>
//     </>
//   );
// }

function Searcher() {
  const [search, setSearch] = useState("");
  const [originalSpecialties, setOriginalSpecialties] = useState<Specialty[]>(
    []
  );
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  async function initailizeDoctors() {
    const doctors = await getDoctors();
    setDoctors(doctors);
    setFilteredDoctors(doctors);
  }

  async function initalizeSpecialties() {
    const specialties = await getSpecialties();
    setSpecialties(specialties);
    setOriginalSpecialties(specialties);
  }

  useEffect(() => {
    initailizeDoctors();
    initalizeSpecialties();
  }, []);

  function selectSpecialty(specialty: Specialty) {
    if (selectedSpecialties.length === 5) {
      toast.error("No puedes seleccionar más de 5 especialidades");
      return;
    }
    setSelectedSpecialties([...selectedSpecialties, specialty.id]);
    setSpecialties(specialties.filter((item) => item.id !== specialty.id));
  }

  function removeSpecialty(specialty: string) {
    setSelectedSpecialties(
      selectedSpecialties.filter((item) => item !== specialty)
    );
    setSpecialties([...specialties, { id: specialty, name: specialty }]);
  }

  function applyFilters(e: any) {
    e.preventDefault();
    removeFilters(e);

    if (search !== "") {
      setFilteredDoctors((prev) => {
        return prev.filter((doctor) =>
          doctor.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (selectedSpecialties.length !== 0) {
      setFilteredDoctors((prev) => {
        return prev.filter((doctor) =>
          doctor.specialties.some((specialty) =>
            selectedSpecialties.includes(specialty)
          )
        );
      });
    }

    setSelectedSpecialties([]);
    setSpecialties(originalSpecialties);
    setSearch("");
  }

  function removeFilters(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    setFilteredDoctors(doctors);
    
  }

  const cards = filteredDoctors.map((doctor, index) => {
    return <DoctorCard key={index} doctor={doctor} />;
  });

  return (
    <>
      <h1 className="text-7xl sm:text-4xl text-primary-normal text-center">
        Doctores disponibles
      </h1>

      <div className="flex flex-col gap-5 justify-center px-16 mt-8">
        <div className="flex flex-row justify-between">
          <div>
            <Dropdown
              title="Especialidades"
              changeTitle={false}
              options={
                specialties
                  ? specialties.map((specialty) => {
                      return {
                        value: specialty.id,
                        label: specialty.name,
                        onClick: () => {
                          selectSpecialty(specialty);
                        },
                      };
                    })
                  : []
              }
            />
          </div>

          <button
            type="submit"
            className="text-black hidden md:block bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300
          font-medium rounded-lg px-4 py-2 active:scale-90"
            onClick={removeFilters}
          >
            Remover filtros
          </button>
        </div>

        {selectedSpecialties.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 w-[80%] justify-center self-center md:justify-start md:self-start">
            {selectedSpecialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-quaternary-normal px-4 py-1 rounded-xl
                  flex flex-row justify-center items-center gap-2"
              >
                <p className="text-black">{specialty}</p>
                <img
                  src={xImage}
                  className="h-4 cursor-pointer"
                  onClick={() => {
                    removeSpecialty(specialty);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="text-black md:hidden bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300
          font-medium rounded-lg px-4 py-2 active:scale-90"
          onClick={removeFilters}
        >
          Remover filtros
        </button>
      </div>

      <div className="flex flex-wrap flex-row justify-between items-center px-16 gap-y-4 mt-6">
        <section className="w-full md:w-[60%]" id="search">
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
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </section>

        <button
          type="submit"
          className="text-black bg-quaternary-normal border-2 border-primary-normal
          focus:ring-4 outline-none duration-300 focus:ring-blue-300 w-full md:w-auto
          font-medium rounded-lg px-4 py-2 active:scale-90"
          onClick={applyFilters}
        >
          Aplicar filtros
        </button>
      </div>

      <section className="flex flex-wrap px-16 mt-10 gap-4 justify-center mb-5">
        {cards}
      </section>
    </>
  );
}

export default Searcher;