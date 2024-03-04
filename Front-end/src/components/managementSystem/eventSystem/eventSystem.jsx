import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddEventModal from './addEventModal'
import EventsList from './eventsList';
import EventSelect from './eventSelect';
import AthleteSelect from './athleteSelect';
import { formatDate, formatTime, calculateAge } from '../../date_time_format'
// import { fetchEvents } from '../../../redux/slices/eventSlice';
// import { fetchAthletes } from '../../../redux/slices/athleteSlice';
import Test from './Test';
import Alert from '@mui/material/Alert';



function EventSystem() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchEvents());
  //   dispatch(fetchAthletes());
  // }, [dispatch]);
  // const [showAlert, setShowAlert] = useState(false); 
  // const [alertContent, setAlertContent] = useState({severity: '', message: ''});
  const [eventSelect, setEventSelect] = useState(null);
  const [athleteSelect, setAthleteSelect] = useState(null);
  const events = useSelector((state) => state.event.data);
  console.log('eventSelect' ,eventSelect);
  const selectedEvent = events.find(event => {
  if (eventSelect !== null) {
    return event.id === eventSelect;
  } else if (athleteSelect !== null) {
    return event.id === athleteSelect;
  }
  return null;
});

  console.log('selectedEvent' ,selectedEvent);


  return (
    <body className='h-full flex flex-col'>
      {/* {showAlert && 
        <Alert severity={alertContent.severity}>{alertContent.message}</Alert>
      } */}
      {eventSelect === null  && athleteSelect === null ?
        <div className='bg-white p-3 border border-gray-text font-bold text-4xl text-Blue-600 mb-2'>Event</div>
        :
        <div className='bg-white p-3 border border-gray-text font-bold text-4xl text-Blue-600 mb-2'>
          <div className='w-[70%] border-b-2 border-[#002880]'>
            <div className='text-xl text-[#002880] font-semibold'> <span className='text-3xl'> {selectedEvent?.name} </span>- {selectedEvent?.gender === 'M' ? 'Man' : 'Woman'}'s {selectedEvent?.classification}  {selectedEvent?.stage}</div>
            <div className='text-base text-[#002880] font-normal '>
              <span>{" " + formatTime(selectedEvent?.date_time)} </span> -
              <span>{" " + formatDate(selectedEvent?.date_time)}</span>
            </div>
          </div>
        </div>
      }


      {eventSelect === null && athleteSelect === null && (
        <div className='bg-white p-3 border border-gray-text  h-full'>
          <AddEventModal />
          <EventsList
            setEventSelect={setEventSelect}
            setAthleteSelect={setAthleteSelect}
          />
          {/* setShowAlert={setShowAlert} setAlertContent={setAlertContent}         */}
        </div>)
      }
      {eventSelect !== null && (
        <div className='bg-white p-3 border border-gray-text mt-2 h-full'>
          <EventSelect
            eventSelect={eventSelect} setEventSelect={setEventSelect} />
        </div>
      )}
      {athleteSelect !== null && (
        <div className='bg-white p-3 border border-gray-text mt-2 h-full'>
          <AthleteSelect
            athleteSelect={athleteSelect} setAthleteSelect={setAthleteSelect} />
        </div>
      )}
    </body>

  )
}

export default EventSystem