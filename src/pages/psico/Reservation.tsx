import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReservationCard from "../../components/ReservationCard";
import {
  getChatsClientPaginated,
  getChatsDoctorPaginated,
} from "../../firebase/api/chatService";
import { useAuth } from "../../hooks/useAuth";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { Appointment } from "../../interfaces/Appointment";
import { Chat } from "../../interfaces/Chat";
import { UserType } from "../../interfaces/Client";

function Reservation() {
  const { user } = useAuth();

  const userType = user?.type as UserType;
  const getItemsWithId =
    userType === UserType.DOCTOR
      ? getChatsDoctorPaginated
      : getChatsClientPaginated;

  const { items, lastItemRef } = useInfiniteLoading({
    getItemsWithId: getItemsWithId,
    idToPass: user?.id ?? "",
  });

  const cards = items.map((chat, index) => {
    const lastAppointment = chat.appointments.at(-1)!;
    if (index === items.length - 1) {
      return (
        <li
          className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"
          key={chat.id}
          ref={lastItemRef}
        >
          <ReservationCard
            chatId={chat.id}
            appointment={lastAppointment}
            userId={chat.clientId}
          />
        </li>
      );
    }

    return (
      <li
        className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"
        key={chat.id}
      >
        <ReservationCard
          chatId={chat.id}
          appointment={lastAppointment}
          userId={chat.clientId}
        />
      </li>
    );
  });

  // TODO - Algo cuando no hay citas agendadas
  return (
    <div>
      <div className="h-20 flex items-center smax1:h-16">
        <div className="h-12 relative left-16 flex items-center font-bold text-4xl smax2:left-6">
          Citas agendadas
        </div>
      </div>

      <ul>{cards}</ul>
    </div>
  );
}

export default Reservation;
