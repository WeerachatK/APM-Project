import React from 'react';
import { useSelector } from 'react-redux';
import '../index.css';

function Textbox({ label, value, type = "text", placeholder }) {
  return (
    <div className="mb-4 px-2 w-full">
      <label className="block text-gray-700 font-medium">{label}</label>
      <input
        disabled
        type={type}
        value={value}
        className="mt-1 px-2 py-1 w-full rounded-md"
        placeholder={placeholder}
      />
    </div>
  );
}

function Information() {
  const profile = useSelector((state) => state.profile);

  const getFirstName = (name) => {
    return name?.split(' ')[0] || '';
  };

  const getLastName = (name) => {
    const parts = name?.split(' ') || [];
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  };

  return (
    <div className="Information px-[4%] pt-[5%] flex flex-col justify-between">
      <div className='InfoComponent'>
        <div className='Name flex w-full'>
          <Textbox label="First name" value={getFirstName(profile?.name)} placeholder="First name" />
          <Textbox label="Last name" value={getLastName(profile?.name)} placeholder="Last name" />
        </div>
        <Textbox label="E-mail" value={profile?.email} placeholder="E-mail" />
        {/* <Textbox label="Password" type="password" placeholder="Password" /> */}
        <Textbox label="Contact" value={profile?.phoneNumber} placeholder="Contact" />
      </div>
      <div className='w-full flex my-10'>
        <button className="Profile-Button m-auto text-white p-2 px-10 rounded-full">Edit</button>
      </div>
    </div>
  );
}

export default Information;
