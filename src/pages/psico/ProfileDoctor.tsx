import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import  k  from "../../assets/mock/pic.jpg"
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor } from "../../interfaces/Client";
import StarRating from "../../components/forms/StarRating";

function ProfileDoctor() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState<Doctor | null>(null)
    const navigate = useNavigate();

    const initializeDoctor = async () => {
        const doctor = await getDoctorById(id?? "");
        setDoctor(doctor);
    }

    useEffect(() => {
        initializeDoctor();
    }, []);

    const handleReserveButton = () => {
        navigate(`/psico/schedule/${id}`)
        console.log("Reservar")
    }

    function setRanking(rating: number) {
        throw new Error("Function not implemented.");
    }

    return (
            <div className="py-5 md:flex">
                <div className="flex justify-center w-full md:w-1/3">
                    <div className="w-2/3 ">
                        <img src={k} alt="" className="border-8 border-primary-normal 
                        rounded-full aspect-square w-full max-w-xs m-auto"/>
                    </div>
                </div>
                <div className="md:w-2/3 md:pr-4">
                    <div className="flex justify-center mt-6 flex-col w-full">
                        <div className="w-full flex flex-col md:justify-between 
                        items-center md:flex-row mb-5">
                            <h1 className="font-bold text-4xl md:text-5xl">Dr. {doctor?.name}</h1>

                        </div>
                        <div className="h-24 flex justify-center items-center">
                                <StarRating        
                                    svgClass="md:h-[100px] p-2 h-16"
                                    currentRating={doctor!.ranking}
                                    handleCurrentRating={(rating: number) => {
                                        setRanking(rating);
                                    }}
                                    readonly={true}
                                />
                        </div>
                    </div>
                    <div>
                        <div className="p-2">
                            <h1 className="font-bold text-3xl">Especialidad</h1>
                            <p className="text-lg">{doctor?.specialties.map(specialty => specialty).join(", ")}</p>
                        </div>
                        <div className="mt-4 p-2">
                            <h1 className="font-bold text-3xl">Biografia</h1>
                            <p className="text-lg">{doctor?.biography}</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center md:flex-row md:gap-8">
                        <h1 className="text-xl p-4 justify-center">Precio de consulta: <span className="font-bold">$20</span></h1>
                        <button onClick={handleReserveButton} className="bg-secondary-normal my-3 mb-6 h-12 w-32 border-4 border-primary-normal rounded-2xl text-primary-normal font-bold md:my-0 hover:scale-105">¡Reserva ya!</button>
                    </div>
                </div>
            </div>
    )
}

export default ProfileDoctor;