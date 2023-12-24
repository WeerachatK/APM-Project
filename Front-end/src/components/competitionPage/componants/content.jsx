import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./content.css";
import { setFilterDay } from '../../../redux/slices/filterDaySlice';
import { setFilterSex } from '../../../redux/slices/filterSexSlice';
import { selectSportFilter } from '../../../redux/slices/sportFilterSlice';
import { discusThrowIcon, javelinThrowingIcon, sprintRunningIcon, longJumpIcon } from '../../../assets/icon/iconIndex';

function FilterButton({ label, value, selectedValue, onClick }) {
  return (
    <button
      className={`ButtonFilter ${value === selectedValue ? 'useFilter' : ''}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}
function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const newHours = hours % 12 || 12;
  return `${newHours}:${minutes} ${ampm}`;
}

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

function Line() {
  return (
    <svg
      width="863"
      height="4"
      viewBox="0 0 863 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 2H863" stroke="#002880" stroke-width="4" />
    </svg>
  );
}

function Content() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.data);
  const filterSex = useSelector((state) => state.filterSex);
  const filterDay = useSelector((state) => state.filterDay);
  const sportFilter = useSelector(selectSportFilter);

  const handleDayClick = (day) => {
    dispatch(setFilterDay(day));
    console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };

  const handleSexClick = (sex) => {
    dispatch(setFilterSex(sex));
    console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };
  const filteredEvents = events.filter(event => {
    return (
      sportFilter === 'All' || event.sportTypeName === sportFilter) && 
      (filterSex === 'All' || event.event_gender === filterSex) &&
      (filterDay === 'All' || event.eventDate === filterDay);
  });
  const uniqueDays = [...new Set(events.map(event => event.eventDate))];
  const sortedUniqueDays = uniqueDays.sort((a, b) => new Date(a) - new Date(b));
  const sortedEvents = filteredEvents.sort((a, b) => {
    // จัดเรียงตาม status ก่อน
    if (a.status !== b.status) {
      return a.status ? 1 : -1; // ถ้า a.status เป็น true ให้ a มาหลัง b
    }
    // จัดเรียงตามวันที่หาก status ตรงกัน
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  const dayButtons = sortedUniqueDays.map(day => {
    const [year, month, date] = day.split('-');
    return {
      label: `${date} ${month.toUpperCase()}`,
      value: day,
    };
  });

  dayButtons.unshift({ label: 'All', value: 'All' });

  const sexButtons = [
    { label: 'All', value: "All" },
    { label: "Men's", value: "Men's" },
    { label: "Women's", value: "Women's" },
    { label: 'Mixed', value: 'Mixed' },
  ];



  return (
    <div className="container-content">
      <div className="content-filter">
        <div className="filter-day">
          <div className="text-3xl text-[#002880] font-semibold mr-5">DAY</div>
          {dayButtons.map((btn) => (
            <FilterButton
              key={btn.value}
              label={btn.label}
              value={btn.value}
              selectedValue={filterDay}
              onClick={handleDayClick}
            />
          ))}
        </div>
        <div className="line">
          <div className="line-item1">
            <Line />
          </div>
          <div className="line-item2">
            <Line />
          </div>
        </div>
        <div className="filter-event">
          <div className="text-3xl text-[#002880] font-semibold mr-5">
            EVENTS
          </div>
          {sexButtons.map((btn) => (
            <FilterButton
              key={btn.value}
              label={btn.label}
              value={btn.value}
              selectedValue={filterSex}
              onClick={handleSexClick}
            />
          ))}
        </div>
      </div>
      <div className="content-event">
        {sortedEvents.map(event => (
          <TournamentCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Content;
