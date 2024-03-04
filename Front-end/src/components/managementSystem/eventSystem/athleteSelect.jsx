import React from 'react'
import Competes from './competes';
import ReplyIcon from '@mui/icons-material/Reply';

function AthleteSelect({ athleteSelect, setAthleteSelect }) {
  const handleBackClick = () => {
    setAthleteSelect(null);
  };
  return (
    <>
      <button
       className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center mb-3 text-Blue-600`}
        onClick={handleBackClick}>
        <ReplyIcon sx={{ color: '#002880' }} /><span className='ml-1'>Back</span>
      </button>
      <Competes event={athleteSelect} />
    </>

  )
}

export default AthleteSelect