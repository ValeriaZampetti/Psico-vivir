import React, { useEffect, useState } from 'react'
import ReservationCard from '../../components/ReservationCard'
import { getAppointmentsDoctor } from '../../firebase/api';
import { Appointment } from '../../interfaces/Appointment';

function Schedule() {
   const [appointments, setAppointments] = useState<Appointment[]>([]);

  const initializeAppointments = async () => {
    const AppointmentsSnapshot = await getAppointmentsDoctor("765GVZowDwloZq07LAfp");

    const appointments: Appointment[] = [];
    AppointmentsSnapshot.forEach((Appointment) => {
      appointments.push(Appointment)
    });
    
    setAppointments(appointments);
  };

  useEffect(() => {
    initializeAppointments();
  }, []);

  return (
    <div>
      <div className="h-20 flex items-center smax1:h-16">
        <div className="h-12 relative left-16 flex items-center font-bold text-4xl smax2:left-6">Citas agendadas</div>
      </div>
      <ul>
        {appointments.map(appointment => (
          <li className="border-b-2 border-rose-300 last:border-b-0 last:mb-2" key={appointment.id}><ReservationCard appointment={appointment}/></li>
        ))}
      </ul>
    </div>
  )
}

export default Schedule