import React from 'react'
import { useSelector } from 'react-redux';
import '../index.css'
function ProfileCard() {
  const profile = useSelector((state) => state.profile);
  return (
    <>
      <div className='ProfileCard flex flex-col justify-start items-center p-8'>
        <div className='flex-shrink-0  rounded-full w-40  h-40 overflow-hidden'>
          <img className='object-cover w-full h-full' 
            src={profile.imageUrl}
            alt="" />
        </div>
        <div className='Name w-full text-2xl my-3 flex items-center justify-center'>
        {profile.name}
        </div>
        <div className='ShowInfo text-2xl  text-[#91A3CC] h-full w-full flex justify-center items-center'>
          No athlete information.
        </div>
      </div>
    </>
  )
}

export default ProfileCard