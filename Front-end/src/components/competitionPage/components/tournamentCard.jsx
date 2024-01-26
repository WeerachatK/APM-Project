import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { formatDate, formatTime } from "../../date_time_format";
import {
  discusThrowIcon,
  hammerThrowIcon,
  highJumpIcon,
  hurdlingIcon,
  javelinThrowingIcon,
  sprintRunningIcon,
  longJumpIcon,
  poleVaultIcon,
  raceWalkingIcon,
  relayRunningIcon,
  shotPutIcon,
  tripleJumpIcon
} from '../../../assets/icon/iconIndex';
import "./content.css";

function TournamentCard({ event }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/competition/event', { state: { event } });
  };
  const eventTypeIconMap = {
    'discusThrow': discusThrowIcon,
    'hammerThrow': hammerThrowIcon,
    'highJump': highJumpIcon,
    'hurdling': hurdlingIcon,
    'javelinThrowing': javelinThrowingIcon,
    'running': sprintRunningIcon,
    'longJump': longJumpIcon,
    'poleVault': poleVaultIcon,
    'raceWalking': raceWalkingIcon,
    'relayRunning': relayRunningIcon,
    'shotPut': shotPutIcon,
    'tripleJump': tripleJumpIcon
  };
  return (
    <div className={`card-container border-2 border-solid border-Blue-600 `} onClick={handleClick}>
      <div className={`card-head text-Blue-600`}>
        <div className="time">{formatTime(event.event_date_time)}</div>
        <div className="gender">{event.event_gender}'s</div>
      </div>
      <div className={` font-bold text-Blue-600 text-center`}>
        <p>Event number</p>
        <p className='text-lg'>{event.event_number}</p>
      </div>
      <div className="card-body flex justify-center items-center h-[120px] relative">
        <div className={`bg-Green px-2 mb-1 absolute bottom-0 left-1 rounded-full ${event.status !== 'finish' &&  'hidden'}`}>
          <p className={` bottom-0 left-1 text-white `}>Completion</p>
        </div>
        
        <img className="h-full w-full object-contain " src={eventTypeIconMap[event.icon]} alt={event.icon} />
      </div>

      <div className={`card-foot `}>
        <div className={`date px-2 py-1 text-sm ${event.status === 'finish' ? 'bg-green-x-gradient' : 'bg-blue-x-gradient'}`}>
          {formatDate(event.event_date_time)}
        </div>
        <div className={`sport-name h-14 px-2 py-1 text-lg bg-Blue-600`}>
          {event.event_name}
        </div>
      </div>
    </div>
  );
}

export default TournamentCard