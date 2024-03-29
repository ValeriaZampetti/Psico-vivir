import React, { useEffect, useState } from "react";
import { capitalize, getRelativeTimeString } from "../../helpers";
import { useChat } from "../../hooks/useChat";
import { Appointment } from "../../interfaces/Appointment";
import ChatHeader from "./ChatHeader";
import MessageComponent from "./MessageComponent";

function ChatContainer() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { currentChat } = useChat();

  useEffect(() => {
    setAppointments(currentChat?.appointments ?? []);
  }, [currentChat]);

  const appointmentsList = appointments.map((appointment, index) => {
    const listMessages = appointment.messages.map((message, index) => (
      <ol
        key={index}
      >
        <MessageComponent message={message} />
      </ol>
    ));

    const dateString = getRelativeTimeString(appointment.date.toDate());
    return (
      <div key={index} className="mt-4 flex flex-col">
        <h3 className="text-sm text-center  text-gray-500">
          {capitalize(dateString)}
        </h3>

        {/* FIXME - Arreglar responsive para que se parta por linaes*/}
        <div className="text-center TitleWithLine font-bold ">
          <span className="bg-quaternary-normal py-0 px-2 break-all">
            {appointment.title}
          </span>
        </div>

        <li className="flex flex-col gap-y-5">{listMessages}</li>
      </div>
    );
  });

  return (
    <div className="flex-[2]">
      {currentChat && <ChatHeader />}
      <div
        id="messages"
        className="bg-quaternary-normal px-8 py-6 h-full overflow-y-scroll"
      >
        {appointmentsList}
      </div>
    </div>
  );
}

export default ChatContainer;
