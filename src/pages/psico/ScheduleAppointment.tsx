import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
//import Profile from "../assets/mock/profile.png";
//import { Doctor } from "../interfaces/Client";
/*
interface DoctorCardProps {
  doctor: Doctor;
}
*/
const AppointmentBooking = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //console.log("Appointment details:", { dateTime });
  };

  return (
    <div className="flex flex-col bg-white justify-center">
      {/*<h1 className="font-bold text-3xl self-center mt-3">{props.doctor.name}</h1>*/}
      <h1 className="font-bold text-4xl text-center mt-12">Pedro Pascal</h1>
      <h1 className="font-bold text text-center mt-3">Agenda una cita</h1>

      <div className="flex flex-wrap h-[550px]">
        <div className="flex flex-col ml-20 mr-20 mt-10 gap-4">
          <img
            src="https://www.themoviedb.org/t/p/w500/nms0d0ExYtiOke82oqr3vOb3smF.jpg"
            alt=""
            className="rounded-full border-color: bg-other-normal border-8 w-[300px] h-[300px] self-center"
          />
          {/*
        <img src={Profile}></img>
        <h1 className="font-bold text-3xl self-center">{props.doctor.name}</h1>
      */}
        </div>

        <div className="flex flex-col ml-20 mr-20 mt-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="font-bold text">
                Seleccionar fecha y hora:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date!)}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <button type="submit">Agendar cita</button>
          </form>
        </div>

        <div className="flex flex-col ml-12 mr-12 mt-8">
          {/*<h1 className="font-bold text-3xl self-center mt-3">{props.doctor.email}</h1>*/}
          <h1 className="font-bold text text-center mt-3">Email:</h1>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
