import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReservationCard from "../../components/ReservationCard";
import {
  getAppointmentsDoctor,
  getAppointmentsDoctorPaginated,
} from "../../firebase/api";
import { useAuth } from "../../hooks/useAuth";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { Appointment } from "../../interfaces/Appointment";

function DoctorReservation() {
  const { user } = useAuth();

  const {
    items,
    lastItemRef,
  }: {
    items: Appointment[];
    loadItems: () => Promise<DocumentSnapshot<DocumentData>[]>;
    lastItemRef: (node: any) => void;
  } = useInfiniteLoading({
    getItemsWithId: getAppointmentsDoctorPaginated,
    // idToPass: user?.email
    idToPass: "765GVZowDwloZq07LAfp",
  });

  const cards = items.map((appointment, index) => {
    if (index === items.length - 1) {
      return (
        <li
          className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"
          key={appointment.id}
          ref={lastItemRef}
        >
          <ReservationCard appointment={appointment} />
        </li>
      );
    }

    return (
      <li
        className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"
        key={appointment.id}
      >
        <ReservationCard appointment={appointment} />
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

export default DoctorReservation;
