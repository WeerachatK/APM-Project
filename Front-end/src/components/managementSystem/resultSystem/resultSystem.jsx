import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventsList from './eventsList';
import EventSelect from './eventSelect';
import { formatDate, formatTime, calculateAge } from '../../date_time_format'
// import EventSelect from './eventSelect';



function ResultSystem() {
  const [eventSelect, setEventSelect] = useState(null);
  const events = useSelector((state) => state.event.data);
  return (
    <body className='h-full flex flex-col'>
       {eventSelect === null ?
        <div className='bg-white p-3 border border-gray-text font-bold text-4xl text-Blue-600 mb-2'>Result</div>
        :
        <div className='bg-white p-3 border border-gray-text font-bold text-4xl text-Blue-600 mb-2'>
          <div className='w-[70%] border-b-2 border-[#002880]'>
            <div className='text-xl text-[#002880] font-semibold'> <span className='text-3xl'> {eventSelect?.name} </span>- {eventSelect?.gender === 'M' ? 'Man' : 'Woman'}'s {eventSelect?.classification}  {eventSelect?.stage}</div>
            <div className='text-base text-[#002880] font-normal '>
              <span>{" " + formatTime(eventSelect?.date_time)} </span> -
              <span>{" " + formatDate(eventSelect?.date_time)}</span>
            </div>
          </div>
        </div>
      }
      {eventSelect === null && (
        <div className='bg-white p-3 border border-gray-text h-full'>
          <EventsList
            setEventSelect={setEventSelect}
          />
          {/* setShowAlert={setShowAlert} setAlertContent={setAlertContent}         */}
        </div>)
         }
        {eventSelect !== null && (
          <div className='bg-white p-3 border border-gray-text mt-2 h-full'>
          <EventSelect
            eventSelect={eventSelect} setEventSelect={setEventSelect} />
        </div>
        ) }
    </body>

  )
}

export default ResultSystem