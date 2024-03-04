import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/slices/eventSlice';
import "./content.css";
import { setFilterDay } from '../../../redux/slices/filterDaySlice';
import { setFilterSex } from '../../../redux/slices/filterSexSlice';
import { setFilterTime } from '../../../redux/slices/filterTimeSlice';
import { selectSportFilter } from '../../../redux/slices/sportFilterSlice';
// import { discusThrowIcon, javelinThrowingIcon, sprintRunningIcon, longJumpIcon } from '../../../assets/icon/iconIndex';
import TournamentCard from "./tournamentCard";
import EventsList from './eventList';
import Pagination from '@mui/material/Pagination';
import AddModal from '../../managementSystem/eventSystem/addEventModal'



function FilterButton({ label, value, selectedValue, onClick }) {
  return (
    <button
      className={`px-2 w-24 border rounded-full mx-1 ${value === selectedValue && 'bg-Blue-200  border-Blue-700'} hover:bg-Blue-100 hover:border-Blue-500`}
      onClick={() => onClick(value)}>
      {label}
    </button>
  );
}



function Content() {
  const dispatch = useDispatch();
  // const events = useSelector((state) => state.event.data);
  const { data: events, loading, error } = useSelector((state) => state.event);
  const filterSex = useSelector((state) => state.filterSex);
  const filterDay = useSelector((state) => state.filterDay);
  const filterTime = useSelector((state) => state.filterTime);
  const sportFilter = useSelector(selectSportFilter);

  // const effectiveItemsPerPage = currentPage === 2 ? (itemsPerPage - 1) : (itemsPerPage);



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

  const handleTimeClick = (time) => {
    dispatch(setFilterTime(time));
  };
  // const handleFinishClick = () => {
  //   setSortByFinish(!sortByFinish);
  // };
  const filteredEvents = events.filter(event => {
    const eventHour = new Date(event.date_time).getHours();
    let isMorning = eventHour >= 6 && eventHour < 12; // Morning from 6 AM to before 12 PM
    let isAfternoon = eventHour >= 12 && eventHour < 18; // Afternoon from 12 PM to before 6 PM

    return (
      (sportFilter === 'All' || event.sport_id === sportFilter) &&
      (filterSex === 'All' || event.gender === filterSex) &&
      (filterDay === 'All' || new Date(event.date_time).toDateString() === new Date(filterDay).toDateString()) &&
      (filterTime === 'All' || (filterTime === 'morning' && isMorning) || (filterTime === 'afternoon' && isAfternoon))
    );
  });

  const uniqueDays = [...new Set(events.map(event => new Date(event.date_time).toDateString()))];
  const sortedUniqueDays = uniqueDays.sort((a, b) => new Date(a) - new Date(b));


  // const sortedEvents = filteredEvents.sort((a, b) => {
  //   // จัดเรียงตาม status ก่อน
  //   if (sortByFinish) {
  //     if (a.status !== b.status) {
  //       return a.status === 'finish' ? 1 : -1; // ถ้า a.status เป็น 'finish' ให้ a มาหลัง b
  //     }
  //   }
  //   // จัดเรียงตามวันที่หาก status ตรงกัน
  //   return new Date(a.date_time) - new Date(b.date_time);
  // });

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
    { label: "Men's", value: "M" },
    { label: "Women's", value: "W" },
    { label: 'Mixed', value: 'X' },
  ];
  const timeButtons = [
    { label: 'All', value: "All" },
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
  ];



  return (
    <div className="container-content justify-between  h-screen-nav">
        <div className="mx-[5%] my-4">
          <div className="flex justify-start items-center">
            <div className="text-xl text-[#002880] font-semibold mr-5">
              EVENTS
            </div>
            <div>
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

            {/* <button
              className={`ButtonFilter ml-auto ${!sortByFinish && 'bg-Blue-600 text-white'}`}
              onClick={handleFinishClick}>
              Finish
            </button> */}

          </div>
          <div className="line border-b-2 border-Blue-600 my-2" />
          <div className="flex justify-start items-center">
            <div className="text-xl text-[#002880] font-semibold mr-5">DAY</div>
            <div>
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

          </div>
          <div className="flex justify-start items-center mt-2">
            <div className="text-xl text-[#002880] font-semibold mr-5">TIME</div>
            <div>
              {timeButtons.map((btn) => (
                <FilterButton
                  key={btn.value}
                  label={btn.label}
                  value={btn.value}
                  selectedValue={filterTime}
                  onClick={handleTimeClick}
                />
              ))}
            </div>

          </div>
        </div>
        <div className="content-event ">
          {/* {
            currentPage === 1 && (
              <div className='add-card-container' onClick={() => setOpenModal(true)}>
                <div className="add-card px-4 bg-Blue-200 rounded-[10px] shadow border border-Blue-700 justify-center items-center gap-1 inline-flex">
                  <div className="text-Blue-700 text-6xl">+</div>
                </div>
              </div>
            )
          } */}
          {/* <AddModal showModal={openModal} setShowModal={setOpenModal} /> */}
          <EventsList events={filteredEvents} />
          {/* {currentEvents.map(event => (
            <TournamentCard key={event.id} event={event} />
          ))} */}
        </div>
      {/* <div className="Pagination flex justify-center p-4 bg-Blue-600 bottom-0">
        <div className=' bg-white p-1 px-6 rounded-full'>
          <Pagination
            count={Math.ceil(sortedEvents.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </div>
      </div> */}
    </div >
  );
}

export default Content;
