import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import a from "../../assets/mock/profile.png";
import k from "../../assets/mock/pic.jpg";
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor } from "../../interfaces/Client";
import { Chat, ChatCreate } from "../../interfaces/Chat";
import { createChat, getChatsByDoctorId } from "../../firebase/api/chatService";
import { Appointment } from "../../interfaces/Appointment";
import { Timestamp } from "firebase/firestore";
import { Dropdown } from "../../components/forms/Dropdown";
import { useAuth } from "../../hooks/useAuth";

const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<number>(0);

    const {user} = useAuth()

  const initializeDoctor = async () => {
    const doctor = await getDoctorById(id ?? "");
    setDoctor(doctor);
  };

  const initilizeChats = async () => {
    const chats = await getChatsByDoctorId(doctor?.id ?? "");
    setChats(chats);
  };

  useEffect(() => {
    initializeDoctor();
    initilizeChats();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(checkIfChatExists()){
      return 
    }

    const newAppointment: Appointment = {
      title: "",
      description: textareaValue,
      date: Timestamp.fromDate(startDate),
      duration: selectedDuration,
      paid: false,
      clientCanTalk: false,
      messages: []
    }

    const chat: ChatCreate = {
      clientId: user?.id ?? "",
      doctorId: doctor?.id ?? "",
      lastAppointmentActive: true,
      appointments: [newAppointment]
    }

    createChat(chat)

    console.log(startDate.toISOString());
  };

  const [textareaValue, setTextareaValue] = useState("");

  function checkIfChatExists(): boolean {
    const chat = chats.find((chat) => chat.clientId === id);
    return chat !== undefined;
  }

  return (
    <div className="px-14 py-7 bg-quaternary-normal">
      <div
        className="backdrop-blur-lg bg-white drop-shadow-lg
          p-6 rounded-2xl justify-center"
      >
        <h1 className="text-4xl font-bold text-center">Agenda una cita</h1>

        <main className="flex flex-col md:flex-row mt-10 justify-between gap-y-6">
          <section className="flex justify-center w-full md:w-1/4 mt-6">
            <div className="w-full">
              <div
                className="border-8 border-primary-normal 
                rounded-full aspect-square w-full max-w-[256px] m-auto overflow-hidden"
              >
                <img src={k} alt="" />
              </div>
            </div>
          </section>

          <section className="md:w-2/5 flex flex-col justify-center   gap-y-4">
            <h1 className="font-bold text-4xl text-center md:text-left">
              Dr. {doctor?.name}
            </h1>

            <div className="w-full max-w-[14rem] self-center md:self-start">
              <Dropdown
                title="Selecciona la duración"
                options={[
                  {
                    value: "1 hora",
                    label: "1 hora",
                    onClick: () => setSelectedDuration(1),
                  },
                  {
                    value: "2 horas",
                    label: "2 horas",
                    onClick: () => setSelectedDuration(2),
                  },
                  {
                    value: "3 horas",
                    label: "3 horas",
                    onClick: () => setSelectedDuration(3),
                  },
                ]}
              />
            </div>

            <div className="flex flex-col self-center md:self-start">
              <label htmlFor="date" className="font-medium text-2xl">
                Selecciona la fecha:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                showTimeSelect
                dateFormat="Pp"
                className="border-2 border-secondary-normal w-full max-w-[12rem]"
              />
            </div>

            <div className="flex flex-col self-center md:self-start">
              <label htmlFor="biography" className="font-medium text-2xl">
                Descripción de la cita:
              </label>
              <textarea
                onChange={(e) => setTextareaValue(e.target.value)}
                id="biography"
                className="md:w-10/12 max-w-[300px] h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold md:max-w-sm"
                placeholder="Aqui la descripción de la cita"
              ></textarea>
            </div>

            <div className="hidden md:flex justify-center mt-12">
              <button
                className="bg-secondary-normal h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold hidden md:block hover:scale-105"
              >
                Agendar cita
              </button>
            </div>
          </section>

          <section className="flex flex-col items-center md:items-baseline">
            <div
              className="backdrop-blur-lg bg-quaternary-normal drop-shadow-lg
          py-6 lg:px-6 px-3 rounded-2xl justify-center"
            >
              <h1 className="text-xl font-bold text-center">Contactos</h1>

              <div className="flex flex-col">
                <h1 className="font-bold">Email</h1>
                <h1 className="mt-1">{doctor?.email}</h1>
              </div>

              <div className="flex flex-col mt-5">
                <h1 className="font-bold">Número de teléfono</h1>
                <h1 className="mt-1">{doctor?.phone}</h1>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-secondary-normal my-3 h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold md:hidden"
              >
                Agendar cita
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AppointmentBooking;
