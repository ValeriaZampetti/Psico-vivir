import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentBooking = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateTime, setDateTime] = useState<Date>(new Date());

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Appointment details:", { name, email, dateTime });
  };

  return (
    <div>
      <h1>Appointment Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Date and Time:</label>
          <DatePicker
            selected={dateTime}
            onChange={(date) => setDateTime(date!)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentBooking;
