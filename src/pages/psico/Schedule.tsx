import React from 'react'
import ReservationCard from '../../components/ReservationCard'

function Schedule() {
  return (
    <div>
      <div className="h-20 flex items-center smax1:h-16">
        <div className="h-12 relative left-16 flex items-center font-bold text-4xl smax2:left-6">Citas agendadas</div>
      </div>
      <ul>
        <li className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"><ReservationCard /></li>
        <li className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"><ReservationCard /></li>
        <li className="border-b-2 border-rose-300 last:border-b-0 last:mb-2"><ReservationCard /></li>
      </ul>
    </div>
  )
}

export default Schedule