import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import a from "../../assets/mock/profile.png";
import  k  from "../../assets/mock/pic.jpg"
import { getDoctorById } from "../../firebase/api/userService";
import { Doctor } from "../../interfaces/Client";
import { Chat, ChatCreate } from "../../interfaces/Chat";
import { getChatsByDoctorId } from "../../firebase/api/chatService";
import { Appointment } from "../../interfaces/Appointment";
import { Timestamp } from "firebase/firestore";


const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [chats, setChats] = useState<Chat[]>([]);

  const initializeDoctor = async () => {
      const doctor = await getDoctorById(id?? "");
      setDoctor(doctor);
  }

  const initilizeChats = async () => {
    const chats = await getChatsByDoctorId(doctor?.id ?? "");
    setChats(chats);
  }

  useEffect(() => {
      initializeDoctor();
      initilizeChats();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(startDate.toISOString());
  };

  const [textareaValue, setTextareaValue] = useState('');

  const handleChangeDesc = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTextareaValue(event.target.value);
  }
  
  const docduration = document.getElementById("duration-appointment") as HTMLSelectElement;
  const duration = docduration.value;
  const date = {nanoseconds: (startDate.getTime()*1000), seconds: (startDate.getTime()/1000)} as Timestamp;

  const checkIfChatExists = () => {
    const chat = chats.find((chat) => chat.clientId === id);
    const appointment: Appointment = {
      title: "Cita con " + doctor?.name,
      description: textareaValue,
      date: date,
      duration: parseInt(duration),
      paid: false,
      clientCanTalk: true,
      messages: [],
    };

    if (chat) {
      chat.appointments.push(appointment);
    } else {
      const chat: ChatCreate = {
        doctorId: doctor?.id ?? "",
        clientId: id!,
        appointments: [appointment],
        lastAppointmentActive: false,
      };
    }
  }
      

  return (
    <div className="py-4 p-2">
      <h1 className="text-4xl font-bold pl-2">Agenda una cita</h1>
      <div className="md:flex md:flex-wrap justify-around">
        <div className="flex justify-center w-full md:w-1/4 mt-6">
            <div className="w-full">
                <div className="border-8 border-primary-normal 
                rounded-full aspect-square w-full max-w-[256px] m-auto overflow-hidden">
                  <img src={k} alt=""/>
                </div>
            </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center w-full">
          <h1 className="font-bold text-4xl text-center mt-10 md:text-left md:pl-4">{doctor?.name}</h1>

          <div className="flex flex-col px-2 mt-3 mx-auto md:mx-0">
            <label htmlFor="time">Selecciona la duración:</label>
            <select id="duration-appointment" className="border-2 border-secondary-normal w-60">
              <option value="1" selected>1 hora</option>
              <option value="2">2 horas</option>
              <option value="3">3 horas</option>
            </select>
          </div>

          <div className="flex flex-col px-2 mt-3 mx-auto md:mx-0">
            <label htmlFor="date">Selecciona la fecha:</label>
            <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date!)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="border-2 border-secondary-normal w-60"
                />
          </div>

          <div className="flex flex-col items-center">
            <label htmlFor="biography" className="mt-3">Descripción de la cita:</label>
            <textarea onChange={handleChangeDesc} id="biography" className="md:w-10/12 max-w-[300px] h-40 p-4 mt-2 rounded-3xl border-4 border-secondary-normal font-semibold md:max-w-sm" placeholder="Aqui la descripción de la cita"></textarea>
          </div>

          <div className="hidden md:flex justify-center mt-12">
            <button className="bg-secondary-normal h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold hidden md:block hover:scale-105">Agendar cita</button>
          </div>

        </div>

        <div className="mt-8 md:w-1/5 flex flex-col items-center md:items-baseline">
          <div className="pl-4 ">
            <div className="flex flex-col">
              <h1 className="font-bold">Email</h1>
              <h1 className="mt-1">{doctor?.email}</h1>
            </div>

            <div className="flex flex-col mt-5">
              <h1 className="font-bold">Número de teléfono</h1>
              <h1 className="mt-1">+{doctor?.phone}</h1>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button onClick={handleSubmit} className="bg-secondary-normal my-3 h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold md:hidden">Agendar cita</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
