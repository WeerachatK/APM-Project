// startList.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import "./content.css";

function OrderCard({ orderNumber, bib, name, backgroundColor }) {
    return (
        <div className={`Order mt-6 bg-[${backgroundColor}] h-[120px] w-full text-center flex justify-between items-center text-lg font-semibold`}>
            <div className='w-full flex justify-between'>
                <div className='w-full'>{orderNumber}</div>
                <div className='w-full'>{bib}</div>
            </div>
            <div className='w-full p-2 flex '>
                <div className='bg-black rounded-lg h-[100px] w-[120px] flex-shrink-0 object-cover ml-[15%]'>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className='flex flex-col justify-end items-start px-5'>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    );
}

function StartList() {
    const location = useLocation();
    const event = location.state?.event;
    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const newHours = hours % 12 || 12;
        return `${newHours}:${minutes} ${ampm}`;
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split('-');
        return `${day} ${month} ${year}`;
    };

    return (
        <div className='p-8'>
            <div className='w-[70%] border-b-4 border-[#002880]'>
                <div className='text-3xl text-[#002880] font-semibold'>{event?.eventName}</div>
                <div className='text-base text-[#002880] font-normal '>
                    <span>{event?.event_gender}</span> Event -
                    <span>{" " + formatTime(event?.eventTime)} </span> -
                    <span>{" " + formatDate(event?.eventDate)}</span>
                </div>
            </div>
            <div className='mt-6 bg-[#002880] h-12 w-full text-white text-center flex justify-between items-center text-lg font-semibold'>
                <div className='w-full flex justify-between'>
                    <div className='w-full'>Order</div>
                    <div className='w-full'>BIB</div>
                </div>
                <div className='w-full'>
                    Name
                </div>
            </div>
            <div>
                {event?.result?.map((athlete, index) => (
                    <OrderCard
                        key={index}
                        orderNumber={index + 1}
                        bib={athlete.bib}
                        name={athlete.athleteName}
                        backgroundColor={index % 2 === 0 ? '#EEF3FF' : '#FFF'}
                    />
                ))}
            </div>
        </div>
    );
}

export default StartList;
