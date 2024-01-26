import React, { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/slices/eventSlice';
import "./content.css";
import { setFilterDay } from '../../../redux/slices/filterDaySlice';
import { setFilterSex } from '../../../redux/slices/filterSexSlice';
import { selectSportFilter } from '../../../redux/slices/sportFilterSlice';
// import { discusThrowIcon, javelinThrowingIcon, sprintRunningIcon, longJumpIcon } from '../../../assets/icon/iconIndex';
import TournamentCard from "./TournamentCard";
import Pagination from '@mui/material/Pagination';
import AddModal from './addEventModal'



function FilterButton({ label, value, selectedValue, onClick }) {
  return (
    <button
      className={`ButtonFilter ${value === selectedValue ? 'bg-Blue-200 border-1 border-Blue-700 ' : ''}`}
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = currentPage === 1 ? 7 : 8;
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const [sortByFinish, setSortByFinish] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  // const effectiveItemsPerPage = currentPage === 2 ? (itemsPerPage - 1) : (itemsPerPage);



  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  useEffect(() => {
    setCurrentPage(1);
  }, [sportFilter]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  const handleDayClick = (day) => {
    dispatch(setFilterDay(day));
    setCurrentPage(1);
    // console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };

  const handleSexClick = (sex) => {
    dispatch(setFilterSex(sex));
    setCurrentPage(1);
    // console.log("Filter Sex: ", useSelector((state) => state.filterSex.value));
  };

  const handleFinishClick = () => {
    setSortByFinish(!sortByFinish);
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
    if (sortByFinish) {
      if (a.status !== b.status) {
        return a.status === 'finish' ? 1 : -1; // ถ้า a.status เป็น 'finish' ให้ a มาหลัง b
      }
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
    { label: "Men's", value: "Men" },
    { label: "Women's", value: "Women" },
    { label: 'Mixed', value: 'Mixed' },
  ];
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handlePageChange = (event, value) => {
    paginate(value);
  };


  return (
    <div className="container-content justify-between  h-screen-nav">
      <div>
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
            <button
              className={`ButtonFilter ml-auto ${!sortByFinish && 'bg-Blue-600 text-white'}`}
              onClick={handleFinishClick}>
              Finish
            </button>

          </div>
        </div>
        <div className="content-event ">
          {
            currentPage === 1 && (
              <div className='add-card-container' onClick={() => setOpenModal(true)}>
                <div className="add-card px-4 bg-Blue-200 rounded-[10px] shadow border border-Blue-700 justify-center items-center gap-1 inline-flex">
                  <div className="text-Blue-700 text-6xl">+</div>
                </div>
              </div>
            )
          }
          <AddModal showModal={openModal} setShowModal={setOpenModal} />
          {currentEvents.map(event => (
            <TournamentCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div className="Pagination flex justify-center p-4 bg-Blue-600 bottom-0">
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
      </div>
    </div >
  );
}

export default Content;
