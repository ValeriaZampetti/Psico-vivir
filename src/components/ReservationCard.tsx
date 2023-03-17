import React, { useEffect, useState } from "react"
import { getUserById } from "../firebase/api";
import { useTimestampToString } from "../hooks/useTimestampToString";
import { Appointment } from "../interfaces/Appointment";
import { Client } from "../interfaces/Client";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

interface ReservationCardProps {
    appointment: Appointment;
  }

export const ReservationCard = (props: ReservationCardProps) => {
    const [user, setUser] = useState<Client>();

    const initializeClient = async () => {
        const ClientSnapshot = await getUserById(props.appointment.clientId);
        const client: Client = ClientSnapshot as Client;
        setUser(client);
      };
    
      useEffect(() => {
        initializeClient();
      }, []);

    const dateString = useTimestampToString(props.appointment.date.seconds);

    const gsReference = ref(storage, "gs://psico-vivir.appspot.com/imagesUsers/aiudaporfavor.jpg");
    const img = document.getElementById("profile-pic");
    getDownloadURL(gsReference)
  .then((url) => {
    const img = document.getElementById("profile-pic");
    img?.setAttribute("src", url);
  })

    return (
        <div className="h-48 m-0 flex justify-around items-center smax2:h-auto smax2:flex-col smax2:gap-4 smax2:p-8">
            <img id="profile-pic" className="h-32 aspect-square rounded-full border-rose-400 border-8 smax2:h-52"/>
            <div className="h-1/2 w-1/5 flex flex-col gap-1 bg-white smax2:w-full">
                <div className="font-semibold text-3xl relative smax1:font-bold smax1:text-xl smax2:flex smax2:justify-center smax2:text-4xl">{user?.name}</div>
                <div className="relative left-5 text-lg smax2:inset-x-0 smax2:flex smax2:justify-center smax2:text-3xl">{dateString}</div>
            </div>
            <div className="h-2/3 w-2/6 flex flex-col justify-center text-gray-500 smax2:w-full smax2:pb-8">
                <div className="text-xl font-semibold smax2:text-xl smax2:flex smax2:justify-center">Breve descripción:</div>
                <div className="smax2:text-sm smax2:flex smax2:text-justify">
                    {props.appointment.description}
                </div>
            </div>
            <div className="w-1/5 h-1/3 flex justify-center items-center gap-8 smax2:w-48 smax2:h-16">
                <Link to="/psico/chat" className="h-full aspect-square rounded-2xl  border-rose-400 border-4 flex items-center justify-center hover:scale-110">
                    <img src="../../src/assets/icons/chat.svg" alt="check-icon" className="h-8"/>
                </Link>
                <button className="h-full aspect-square rounded-2xl  border-rose-400 border-4 flex items-center justify-center hover:scale-110">
                    <img src="../../src/assets/icons/check.svg" alt="check-icon" className="h-12"/>
                </button>
            </div>
        </div>
    );
};

export default ReservationCard;