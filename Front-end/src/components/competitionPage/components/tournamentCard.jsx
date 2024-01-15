import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { formatDate, formatTime } from "../../date_time_format";
import "./content.css";

function TournamentCard({ event }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/competition/event', { state: { event } });
  };

  return (
    <div className={`card-container border-2 border-solid border-Blue-600 `} onClick={handleClick}>
      <div className={`card-head text-Blue-600`}>
        <div className="time">{formatTime(event.event_date_time)}</div>
        <div className="gender">{event.event_gender}'s</div>
      </div> 
      <div className="card-body flex justify-center items-center h-[120px] relative">
      <p className={`m-1 absolute bottom-0 left-1 ${event.status  === 'finish' ? 'text-green ' : 'hidden'}`}>Completion</p>
        <div className={`text-3xl font-bold text-Blue-600 `}>{event.event_number}</div>
        {/* <img className="h-[165px]" src={eventTypeIconMap[event.eventType]} alt={event.eventType} /> */}
      </div>
      
      <div className= {`card-foot `}>
        <div className={`date px-2 py-1 text-sm ${event.status  === 'finish' ? 'bg-green-x-gradient' : 'bg-blue-x-gradient'}`}>
          {formatDate(event.event_date_time)}
        </div>
        <div className= {`sport-name h-14 px-2 py-1 text-lg bg-Blue-600`}>
          {event.event_name}
        </div>
      </div>
    </div>
  );
}

export default TournamentCard