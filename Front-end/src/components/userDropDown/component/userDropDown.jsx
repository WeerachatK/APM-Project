import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ArrowUp() {
  return (
    <svg width="15" className='absolute right-0' height="9" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.0607 1.34852C12.4749 0.762733 11.5251 0.762733 10.9393 1.34852L1.3934 10.8945C0.807611 11.4802 0.807611 12.43 1.3934 13.0158C1.97919 13.6016 2.92893 13.6016 3.51472 13.0158L12 4.5305L20.4853 13.0158C21.0711 13.6016 22.0208 13.6016 22.6066 13.0158C23.1924 12.43 23.1924 11.4802 22.6066 10.8945L13.0607 1.34852ZM13.5 3.966V2.40918H10.5V3.966H13.5Z" fill="white" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg width="15" className='absolute right-0' height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M6.89879 8.53466C7.28931 8.92519 7.92248 8.92519 8.313 8.53466L14.677 2.1707C15.0675 1.78018 15.0675 1.14701 14.677 0.756489C14.2864 0.365965 13.6533 0.365965 13.2628 0.756489L7.6059 6.41334L1.94904 0.756489C1.55852 0.365965 0.925353 0.365965 0.534828 0.756489C0.144304 1.14701 0.144304 1.78018 0.534828 2.1707L6.89879 8.53466ZM6.6059 7.16992V7.82756H8.6059V7.16992H6.6059Z" fill="white" />
    </svg>
  )
}

function EventsListComponents() {
  return (
    <>
      <div className='bg-white h-full'>
      </div>
    </>
  )
}

function UserDropDown({handleClick}) {
  const [EventsListOpen, setEventsListOpen] = useState(false);
  const handleEventsListClick = () => {
    setEventsListOpen(!EventsListOpen);
  };
  return (
    <>
      <div className={`fixed flex flex-col w-[25%] bg-[#002880] right-0 z-50 text-white ${EventsListOpen ? 'h-screen-nav' : ''}`}>
        <Link to='/profile' onClick={handleClick}>
          <div className='My-Profile w-full h-[50px] pr-4 pl-4 flex-shrink-0'>
            <div className='w-full h-full flex items-center justify-center border-t border-white'>
              Manage profile
            </div>
          </div>
        </Link>
        <div className='My-Event w-full h-full pr-4 pl-4' onClick={handleEventsListClick}>
          <div className='w-full h-[50px] flex items-center justify-center border-t border-white relative'>
            My events list
            {EventsListOpen ? <ArrowUp /> : <ArrowDown />}
          </div>
          {/* <EventsListComponents/> */}
        </div>
        <Link to="/login" onClick={handleClick}>
          <div className='Logout w-full bg-[#002D98] h-[30px] flex items-center justify-center'>
            Logout
          </div>
        </Link>
      </div>
    </>
  )
}

export default UserDropDown

// bg-[#002880]