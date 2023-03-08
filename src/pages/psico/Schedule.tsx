import React, { useEffect, useState } from 'react'
import ReservationCard from '../../components/ReservationCard'
import { getClients } from '../../firebase/api';
import { Client } from '../../interfaces/Client';

function Schedule() {
   const [clients, setClients] = useState<Client[]>([]);

  const initializeClients = async () => {
    const ClientsSnapshot = await getClients();

    const docs: Client[] = [];
    ClientsSnapshot.forEach((Client) => {
      docs.push({ id: Client.id, ...Client.data() } as Client);
    });
    
    setClients(docs);
  };

  useEffect(() => {
    initializeClients();
  }, []);

  return (
    <div>
      <div className="h-20 flex items-center smax1:h-16">
        <div className="h-12 relative left-16 flex items-center font-bold text-4xl smax2:left-6">Citas agendadas</div>
      </div>
      <ul>
        {clients.map(client => (
          <li className="border-b-2 border-rose-300 last:border-b-0 last:mb-2" key={client.id}><ReservationCard pacient={client}/></li>
        ))}
      </ul>
    </div>
  )
}

export default Schedule