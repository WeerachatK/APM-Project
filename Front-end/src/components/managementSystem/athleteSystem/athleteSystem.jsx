import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchAthletes } from '../../../redux/slices/athleteSlice';
import AddNewAthlete from './addNewAthlete';
import AthleteEdit from './athleteEdit';
import AthleteInfo from './athleteInfo';
import AthleteList from './athleteList';
import { formatDate, formatTime, calculateAge } from '../../date_time_format'


function AthleteSystem() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAthletes());
  // }, [dispatch]);
  const [athleteSelect, setAthleteSelect] = useState(null);
  const [athleteInfo, setAthleteInfo] = useState(null);
  const events = useSelector((state) => state.event.data);
  const selectedEvent = events.find(event => event.id === athleteSelect);
  return (
    <body className='flex flex-col h-screen-nav '>
      <div className='bg-white p-3 border border-gray-text font-bold text-4xl text-Blue-600 mb-2'>Athlete</div>
    {athleteInfo === null && athleteSelect === null && (
      <div className='bg-white p-3 border border-gray-text h-full'>
        <AddNewAthlete/>
        <AthleteList
        setAthleteSelect={setAthleteSelect}
        setAthleteInfo={setAthleteInfo}
      />
        {/* setShowAlert={setShowAlert} setAlertContent={setAlertContent}         */}
      </div>)
       }
      {/* {athleteInfo !== null && (
        <div className='bg-white p-3 border border-gray-text mt-2 h-full'>
        <p>id: {athleteInfo} </p>
        <AthleteInfo
          athleteInfo={athleteInfo} setAthleteInfo={setAthleteInfo} />
      </div>
      ) } */}
      {athleteSelect !== null && (
        <div className='bg-white p-3 border border-gray-text h-full'>
        <AthleteEdit
          athleteSelect={athleteSelect} setAthleteSelect={setAthleteSelect} />
      </div>
      ) }
  </body>
    // <div className='bg-white p-3 border border-gray-text '>
    //   <AthleteList
    //     setAthleteSelect={setAthleteSelect}
    //     setAthleteInfo={setAthleteInfo}
    //   />
    // </div>
  )
}

export default AthleteSystem