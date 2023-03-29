import React, { useEffect, useState } from "react";
import { useTimestampToString } from "../hooks/useTimestampToString";
import { Appointment } from "../interfaces/Appointment";
import { Client } from "../interfaces/Client";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import { getUserById } from "../firebase/api/userService";

interface ReservationCardProps {
  appointment: Appointment;
  userId: string;
  chatId: string;
}

export const ReservationCard = (props: ReservationCardProps) => {
  const [user, setUser] = useState<Client>();

  const initializeClient = async () => {
    setUser(await getUserById(props.userId));
  };

  useEffect(() => {
    initializeClient();
  }, []);

  const dateString = useTimestampToString(props.appointment.date.seconds);

  const gsReference = ref(
    storage,
    "gs://psico-vivir.appspot.com/imagesUsers/aiudaporfavor.jpg"
  );
  const img = document.getElementById("profile-pic");
  getDownloadURL(gsReference).then((url) => {
    const img = document.getElementById("profile-pic");
    img?.setAttribute("src", url);
  });

  return (
    <main className="h-48 m-0 flex justify-around items-center max-[900px]:h-auto max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:p-8">
      <img
        id="profile-pic"
        src="../../src/assets/mock/pic.jpg"
        alt="profile-pic"
        className="h-32 aspect-square rounded-full border-rose-400 border-8 max-[900px]:h-52"
      />

      <header className="h-1/2 w-1/5 flex flex-col gap-1 bg-white max-[900px]:w-full">
        <h1 className="font-semibold text-3xl max-[1080px]:font-bold max-[1080px]:text-xl max-[900px]:flex max-[900px]:justify-center max-[900px]:text-4xl">
          {user?.name}
        </h1>

        <h2 className="text-lg max-[900px]:text-center max-[900px]:text-3xl">
          {dateString}
        </h2>
      </header>

      <section className="h-2/3 w-2/6 flex flex-col justify-center text-gray-500 max-[900px]:w-full max-[900px]:pb-8">
        <h3 className="text-xl font-semibold max-[900px]:text-xl max-[900px]:flex max-[900px]:justify-center">
          Breve descripción:
        </h3>

        <h4 className="max-[900px]:text-sm max-[900px]:flex text-justify justify-center">
          {props.appointment.description}
        </h4>
      </section>

      <footer className="flex flex-wrap justify-center items-center gap-8 w-48 h-16">
        <Link
          to={`/psico/chat/?chatId=${props.chatId}`}
          className="h-full aspect-square rounded-2xl  border-rose-400 border-4 flex items-center justify-center hover:scale-110"
        >
          <img
            src="../../src/assets/icons/chat.svg"
            alt="check-icon"
            className="h-8"
          />
        </Link>
      </footer>
    </main>
  );
};

export default ReservationCard;
