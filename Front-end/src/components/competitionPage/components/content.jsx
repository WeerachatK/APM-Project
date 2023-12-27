import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/slices/eventSlice';
import "./content.css";
import { setFilterDay } from '../../../redux/slices/filterDaySlice';
import { setFilterSex } from '../../../redux/slices/filterSexSlice';
import { selectSportFilter } from '../../../redux/slices/sportFilterSlice';
import { discusThrowIcon, javelinThrowingIcon, sprintRunningIcon, longJumpIcon } from '../../../assets/icon/iconIndex';
import {formatDate, formatTime} from '../../date_time_format'
import TournamentCard from "./TournamentCard";



// function TournamentCard({ event }) {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate('/competition/event', { state: { event } });
//   };

//   return (
//     <div className="card-container" onClick={handleClick}>
//       <div className="card-head">
//         <div className="time">{formatTime(event.event_date_time)}</div>
//         <div className="gender">{event.event_gender}</div>
//       </div>
//       <div className="card-body flex justify-center items-center h-[165px]">
//         {/* <img className="h-[165px]" src={eventTypeIconMap[event.eventType]} alt={event.eventType} /> */}
//       </div>
//       <div className="card-foot">
//         <div className={`date px-2 py-1 text-sm ${event.status ? 'bg-green-x-gradient' : 'bg-blue-x-gradient'}`}>
//           {formatDate(event.event_date_time)}
//         </div>
//         <div className="sport-name h-14 px-2 py-1 text-lg">
//           {event.event_name}
//         </div>
//       </div>
//     </div>
//   );
// }

function FilterButton({ label, value, selectedValue, onClick }) {
  return (
    <button
      className={`ButtonFilter ${value === selectedValue ? 'useFilter' : ''}`}
      onClick={() => onClick(value)}>
      {label}
    </button>
  );
}



function Content() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.event.data);
  const { data, loading, error } = useSelector((state) => state.event);
  const filterSex = useSelector((state) => state.filterSex);
  const filterDay = useSelector((state) => state.filterDay);
  const sportFilter = useSelector(selectSportFilter);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  const handleDayClick = (day) => {
    dispatch(setFilterDay(day));
    // console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };

  const handleSexClick = (sex) => {
    dispatch(setFilterSex(sex));
    // console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };
  const filteredEvents = events.filter(event => {
    return (
      (sportFilter === 'All' || event.sport_id === sportFilter) &&
      (filterSex === 'All' || event.event_gender === filterSex) &&
      (filterDay === 'All' || new Date(event.event_date_time).toDateString() === new Date(filterDay).toDateString())
    );
  });
  
  const uniqueDays = [...new Set(events.map(event => new Date(event.event_date_time).toDateString()))];
  const sortedUniqueDays = uniqueDays.sort((a, b) => new Date(a) - new Date(b));
  

  const sortedEvents = filteredEvents.sort((a, b) => {
    // จัดเรียงตาม status ก่อน
    if (a.status !== b.status) {
      return a.status === 'finish' ? 1 : -1; // ถ้า a.status เป็น 'finish' ให้ a มาหลัง b
    }
    // จัดเรียงตามวันที่หาก status ตรงกัน
    return new Date(a.event_date_time) - new Date(b.event_date_time);
  });

  const dayButtons = sortedUniqueDays.map(dateTime => {
    const date = new Date(dateTime);
    const day = date.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[date.getMonth()];
    const formattedDay = day < 10 ? `0${day}` : day; // แปลงเป็นรูปแบบสองหลัก
  
    return {
      label: `${formattedDay} ${month}`,
      value: dateTime, // หรือ day, ขึ้นอยู่กับว่าคุณต้องการใช้ค่าไหนใน logic ของคุณ
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
        <div className="filter-day ">
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
        <div className="line border-b-4 border-Blue-600 my-2" />
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
