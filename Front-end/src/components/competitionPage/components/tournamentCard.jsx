import React from 'react'

function TournamentCard({ event }) {
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/competition/event', { state: { event } });
    };
    const eventTypeIconMap = {
      sprintRunning: sprintRunningIcon,
      javelinThrowing: javelinThrowingIcon,
      discusThrow: discusThrowIcon,
      longJump: longJumpIcon
    };
  
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      const months = {
        'Jan': 'JAN',
        'Feb': 'FEB',
        'Mar': 'MAR',
        'Apr': 'APR',
        'May': 'MAY',
        'Jun': 'JUN',
        'Jul': 'JUL',
        'Aug': 'AUG',
        'Sep': 'SEP',
        'Oct': 'OCT',
        'Nov': 'NOV',
        'Dec': 'DEC',
      };
      return `${day} ${months[month]} ${year}`;
    };
  
    return (
        <div className="card-container" onClick={handleClick}>
          <div className="card-head">
            <div className="time">{formatTime(event.eventTime)}</div>
            <div className="gender">{event.event_gender}</div>
          </div>
          <div className="card-body flex justify-center items-center h-[165px]">
            <img className="h-[165px]" src={eventTypeIconMap[event.eventType]} alt={event.eventType} />
          </div>
          <div className="card-foot">
            <div className={`date px-2 py-1 text-sm ${event.status ? 'bg-green-x-gradient' : 'bg-blue-x-gradient'}`}>
              {formatDate(event.eventDate)}
            </div>
            <div className="sport-name h-14 px-2 py-1 text-lg">
              {event.eventName}
            </div>
          </div>
        </div>
    );
  }

export default TournamentCard