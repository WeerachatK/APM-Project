import React from 'react'
import '../index.css'

function Textbox({ label, placeholder }) {
  return (
    <div className="mb-2 px-2 w-full">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input className="mt-1 px-2 py-1 w-full rounded-md" placeholder={placeholder} />
    </div>
  );
}

function AthleteInformation() {
  return (
    <div className="Information px-[4%] pt-[5%] flex flex-col justify-between text-sm">
      <div className='InfoComponent w-full'>
        <div className="flex w-full">
         <div className='w-[40%] flex-shrink-0'><Textbox  label="First name" placeholder="First name" /></div>
         <div className='w-[40%] flex-shrink-0'> <Textbox label="Last name" placeholder="Last name" /></div>
         <div className='w-[20%] flex-shrink-0'><Textbox label="Birthday" placeholder="YYYY-MM-DD" /></div>
        </div>

        <div className="flex">
          <Textbox label="Sport Type" placeholder="Sport Type" />
          <Textbox label="Disability class" placeholder="Disability class" />
          <Textbox label="gender" placeholder="gender" />
        </div>

        <div className="px-2 mb-2">
          <label className="block text-gray-700 font-medium">Athlete's affiliation</label>
          <input className="mt-1 px-2 py-1 w-full rounded-md" placeholder="Affiliation" />
        </div>

        <Textbox className='w-full' label="E-mail" placeholder="E-mail" />
        <Textbox label="Password" placeholder="Password" />
        <Textbox label="Contact" placeholder="Contact" />
      </div>
      <div className='w-full flex my-10'>
        <button className="Profile-Button m-auto text-white p-2 px-10 rounded-full">Edit</button>
      </div>
    </div>
  );
}

export default AthleteInformation;