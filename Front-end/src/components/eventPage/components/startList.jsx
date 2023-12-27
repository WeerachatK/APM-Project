// startList.jsx
import React, { useEffect } from 'react';
import "./content.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { formatDate, formatTime } from '../../date_time_format'

function OrderCard({ orderNumber, bib, firstName, lastName, backgroundColor }) {
    const fullName = `${firstName} ${lastName}`;
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
                    <p>{fullName}</p>
                </div>
            </div>
        </div>
    );
}

function StartList({ event }) {

    const dispatch = useDispatch();

    useEffect(() => {
        if (event && event.id) {
            dispatch(fetchEventById(event.id));
        }
    }, [dispatch, event]);


    const eventByid = useSelector(state => state.fetchEventById.data);
    return (
        <div className='p-8'>
            <div className='w-[70%] border-b-4 border-[#002880]'>
                <div className='text-3xl text-[#002880] font-semibold'>{event?.event_name}</div>
                <div className='text-base text-[#002880] font-normal '>
                    <span>{event?.event_gender}</span> Event -
                    <span>{" " + formatTime(event?.event_date_time)} </span> -
                    <span>{" " + formatDate(event?.event_date_time)}</span>
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
                {eventByid?.map((athlete, index) => (
                    <OrderCard
                        key={index}
                        orderNumber={index + 1}
                        bib={athlete.bib}
                        firstName={athlete.first_name}
                        lastName={athlete.last_name}
                        backgroundColor={index % 2 === 0 ? '#EEF3FF' : '#FFF'}
                    />
                ))}
            </div>
            {/* <div>
                {eventByid?.map((athlete, index) => (
                    <div key={index} className="athlete">
                        <div>Order: {index + 1}</div>
                        <div>BIB: {athlete.bib}</div>
                        <div>Name: {athlete.first_name} {athlete.last_name}</div>
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default StartList;
