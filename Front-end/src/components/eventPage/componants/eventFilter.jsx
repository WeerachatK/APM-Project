import React, { useState } from 'react';
import "../../competitionPage/componants/filter.css"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setEventDisplay } from '../../../redux/slices/eventDisplaySlice';

function EventFilter() {
  const location = useLocation();
  const event = location.state?.event;
  const eventDisplay = useSelector(state => state.eventDisplay);
  const dispatch = useDispatch();

  const handleDisplayChange = (newDisplay) => (event) => {
    event.preventDefault();
    dispatch(setEventDisplay(newDisplay));
  };
  return (
    <>
      <div className='flex flex-col justify-between fixed bg-[#142E4F] left-0 w-[20%] h-screen-nav'>
        <div className='sport-container'>
          <h1>{event?.eventName}</h1>
          <a className={`sport-item ${eventDisplay === 'start-list' && 'sport-item-active'}`}
            onClick={handleDisplayChange('start-list')}>
            Start List
          </a>
          <a className={`sport-item ${eventDisplay === 'result' && 'sport-item-active'}`}
            onClick={handleDisplayChange('result')}>
            Result
          </a>
          {/* <a className={`sport-item ${eventDisplay === 'official' && 'sport-item-active'}`}
            onClick={handleDisplayChange('official')} >
            Official result
          </a> */}
        </div >
        <div v className='map-container'>
          <div className="map-image">
            <img src="https://www.google.com/maps/d/thumbnail?mid=1IiSZmA46ha-bnHijm9cdN-kwVwI&hl=en_US" alt="Description" className="object-cover w-full h-full" />
          </div>
          <div className='map-text'>
            <div className='map-location'> Central Stadium of Khon Kaen University</div>
            <div className='map-subscrib' > Sila Subdistrict, Mueang Khon Kaen District Khon Kaen 40000</div>
          </div>
        </div>
      </div >
    </>
  )
}

export default EventFilter