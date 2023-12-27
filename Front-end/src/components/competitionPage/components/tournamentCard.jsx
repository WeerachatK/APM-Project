import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { formatDate, formatTime } from "../../date_time_format";

function TournamentCard({ event }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/competition/event', { state: { event } });
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="card-head">
        <div className="time">{formatTime(event.event_date_time)}</div>
        <div className="gender">{event.event_gender}</div>
      </div>
      <div className="card-body flex justify-center items-center h-[165px]">
        {/* <img className="h-[165px]" src={eventTypeIconMap[event.eventType]} alt={event.eventType} /> */}
      </div>
      <div className="card-foot">
        <div className={`date px-2 py-1 text-sm ${event.status  === 'finish' ? 'bg-green-x-gradient' : 'bg-blue-x-gradient'}`}>
          {formatDate(event.event_date_time)}
        </div>
        <div className="sport-name h-14 px-2 py-1 text-lg">
          {event.event_name}
        </div>
      </div>
    </div>
  );
}

export default TournamentCard