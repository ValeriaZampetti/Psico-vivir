import React, { useEffect, useState } from "react";
import { capitalize, getRelativeTimeString } from "../../helpers";
import { useChat } from "../../hooks/useChat";
import { Appointment } from "../../interfaces/Appointment";
import MessageComponent from "./MessageComponent";

function ChatContainer() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { currentChat } = useChat();

  useEffect(() => {
    setAppointments(currentChat?.appointments ?? []);
    
  }, [currentChat]);

  const appointmentsList = appointments.map((appointment, index) => {
    const listMessages = appointment.messages.map((message, index) => (
      <MessageComponent key={index} message={message} />
    ));

    const dateString = getRelativeTimeString(appointment.date.toDate());
    return (
      <div key={index} className="mt-4 flex flex-col">
        <h3 className="text-sm text-center  text-gray-500">
          {capitalize(dateString)}
        </h3>

        {/* FIXME - Arreglar responsive para que se parta por linaes*/}
        <div className="text-center TitleWithLine font-bold ">
          <span className="bg-[#f9f0f8] py-0 px-2 break-all">{appointment.title}</span>
        </div>
        {listMessages}
      </div>
    );
  });

  return (
    <div className="flex-[2]">
      <div
        id="messages"
        className="bg-[#f9f0f8] px-8 py-6 h-full overflow-y-scroll"
      >
        {appointmentsList}
      </div>
    </div>
  );
}

export default ChatContainer;
