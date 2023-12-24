import React from 'react'
import { useLocation } from 'react-router-dom';
import "./content.css"


function OrderCard({ orderNumber, id, name, backgroundColor, result, Type }) {
    return (
        <div className={`Order mt-6 bg-[${backgroundColor}] h-[120px] w-full text-center flex justify-between items-center text-lg font-semibold`}>
            <div className='w-[30%] flex justify-between flex-shrink-0'>
                <div className='w-full'>{orderNumber}</div>
                <div className='w-full'>{id}</div>
            </div>
            <div className='w-full flex justify-between'>
                <div className='w-full p-2 flex'>
                    <div className='IMG bg-black rounded-lg h-[100px] w-[120px] flex-shrink-0 object-cover ml-[15%]'>
                        <img src="" alt="" />
                    </div>
                    <div className='Name flex flex-col justify-end items-start px-5 flex-shrink-0'>
                        <p>{name}</p>
                    </div>
                </div>
                <div className='w-full p-2'>
                    <div className='Result w-full h-full flex flex-col justify-center items-center object-cover'>
                        <span className='text-[#142E4F]'>Finish Time</span>
                        <div className='w-[30%] h-full rounded-lg border border-[#142E4F]'>
                            <div className='w-full bg-[#142E4F] h-[50%] rounded-t-lg text-white text-sm font-light flex justify-center items-center'>
                                Result {Type === 'longJump' ? '(meter)' : ''}
                            </div>
                            <div className='w-full  h-[50%] text-[#142E4F] text-sm font-semibold flex justify-center items-center'>
                                {result}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Result() {
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
            <div className='mt-6 bg-[#002880] h-12 w-full text-white text-center flex items-center text-lg font-semibold'>
                <div className='w-[30%] flex justify-between flex-shrink-0'>
                    <div className='w-full'>Order</div>
                    <div className='w-full'>BIB</div>
                </div>
                <div className='w-full flex justify-between'>
                    <div className='w-full'>Name</div>
                    <div className='w-full'>Result</div>
                </div>
            </div>


            {event?.status ? (
                <div>
                    {event?.result?.map((athlete, index) => (
                        <OrderCard
                            key={index}
                            orderNumber={index + 1}
                            id={athlete.bib}
                            name={athlete.athleteName}
                            backgroundColor={index % 2 === 0 ? '#EEF3FF' : '#FFF'}
                            result={athlete.score}
                            Type={event.eventType}
                        />
                    ))}
                </div>
            ) : (
                <div className='flex justify-center mt-52 w-full text-gray'>
                    There are no results yet. Because the competition has not yet been completed.
                </div>
            )}
        </div>
    );
}

export default Result;