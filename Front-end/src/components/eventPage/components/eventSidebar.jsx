import React, { useState } from 'react';
import "../../competitionPage/components/filter.css"
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setEventDisplay } from '../../../redux/slices/eventDisplaySlice';

function EventSidebar() {
  const location = useLocation();
  const event = location.state?.event;
  const eventDisplay = useSelector(state => state.eventDisplay);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };


  const handleDisplayChange = (newDisplay) => (event) => {
    event.preventDefault();
    dispatch(setEventDisplay(newDisplay));
  };
  return (
    <>
      <div className='flex flex-col justify-between fixed bg-[#142E4F] left-0 w-[20%] h-screen-nav'>
        <div className='sport-container '>
          <div className=' mt-5 flex justify-end '>
            <button onClick={handleBack} className="back-button flex justify-end p-3 w-1/3">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1.00006C9 0.57285 8.72862 0.19283 8.32454 0.05419C7.92046 -0.084458 7.47293 0.0489 7.21065 0.38612L0.210649 9.38616C-0.0702165 9.74726 -0.0702165 10.2529 0.210649 10.614L7.21065 19.614C7.47293 19.9513 7.92046 20.0846 8.32454 19.946C8.72862 19.8073 9 19.4273 9 19.0001V15.0103C14.3788 15.1224 16.9631 16.1432 18.2613 17.2533C19.4954 18.3086 19.7201 19.549 19.9557 20.8493C19.9758 20.9603 19.9961 21.0722 20.017 21.1839C20.1098 21.6799 20.5576 22.0291 21.0613 21.9982C21.5649 21.9673 21.9666 21.566 21.9981 21.0624C22.1695 18.3144 21.9121 14.3324 19.9709 11.0008C18.0871 7.76776 14.6945 5.28201 9 5.02247V1.00006Z" fill="white" />
            </svg>
          </button></div>

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
            <iframe src={event?.event_location}
              className='w-full h-full]'></iframe>
          </div>
          <div className='map-text'>
            <div className='map-location'> 80th Birthday Stadium </div>
            <div className='map-subscrib' >Suranari, Mueang Nakhon Ratchasima District, Nakhon Ratchasima 30000</div>
          </div>
        </div>
      </div >
    </>
  )
}

export default EventSidebar