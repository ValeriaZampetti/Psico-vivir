import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import a from "../../assets/mock/profile.png";
import  k  from "../../assets/mock/pic.jpg"


const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //console.log("Appointment details:", { dateTime });
  };

  return (
    <div className="py-4 p-2">
      <h1 className="text-4xl font-bold pl-2">Agenda una cita</h1>
      <div className="md:flex md:flex-wrap justify-around">
        <div className="flex justify-center w-full md:w-1/4 mt-6">
            <div className="w-full">
                <img src={k} alt="" className="border-8 border-primary-normal 
                rounded-full aspect-square w-full max-w-[256px] m-auto"/>
            </div>
        </div>
        <div className="md:w-1/2 flex flex-col justify-center w-full">
          <h1 className="font-bold text-4xl text-center mt-10 md:text-left md:pl-4">Pedro Pascal</h1>

          <div className="flex flex-col px-2 mt-3 mx-auto md:mx-0">
            <label htmlFor="time">Selecciona la duración:</label>
            <select name="time" id="time" className="border-2 border-secondary-normal w-60">
              <option value="1">1</option>
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

          <div className="hidden md:flex justify-center mt-12">
            <button className="bg-secondary-normal h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold hidden md:block">Agendar cita</button>
          </div>

        </div>

        <div className="mt-8 md:w-1/5 flex flex-col items-center md:items-baseline">
          <div className="pl-4 ">
            <div className="flex flex-col">
              <h1 className="font-bold">Email</h1>
              <h1 className="mt-1">pedrito@gmail.com</h1>
            </div>

            <div className="flex flex-col mt-5">
              <h1 className="font-bold">Número de teléfono</h1>
              <h1 className="mt-1">+58 414 - 4324432</h1>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-secondary-normal my-3 h-12 w-32 border-4 border-primary-normal
            rounded-2xl text-primary-normal font-bold md:hidden">Agendar cita</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
