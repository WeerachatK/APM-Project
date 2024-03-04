// startList.jsx
import React, { useEffect } from 'react';
import "./content.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { formatDate, formatTime, calculateAge } from '../../date_time_format'
import { CountryFlag } from '../../athletePage/countryFlag';
import WorldRC from './worldRC';


function OrderCard({ orderNumber, athlete }) {
    const fullName = `${athlete.first_name} ${athlete.last_name}`;
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    return (
        <div className={`Order mt-2 w-full text-center flex justify-between items-center ${orderNumber % 2 === 0 ? ' bg-white' : ' bg-Blue-100'}`}>
            <div className='w-full flex justify-between text-base font-semibold'>
                <p className='w-full'>{orderNumber}</p>
                <p className='w-full'>{athlete.bib}</p>
                <p className='w-full flex justify-center items-center bg-'>
                    <div className='border mr-1 w-[40%]'>
                        <CountryFlag countryCode={athlete.country} />
                    </div>{athlete.country}</p>
                <p className='w-full'>{athlete.classification}</p>
            </div>
            <div className='w-full p-2 flex'>
                <div className='bg-black rounded-lg w-[60px] flex-shrink-0 overflow-hidden border'>
                    <img className='object-cover w-full h-full ' src={athlete.gender === 'Women' ? WomanProfile : ManProfile} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start px-5 w-full'>
                    <div className='flex items-center  h-full '>
                        <p className='text-base font-semibold text-left'>{fullName}</p>
                    </div>
                    <p className='text-xs text-left mt-auto'>Age: {calculateAge(athlete.date_of_birth)}</p>
                </div>
            </div>
        </div>
    );
}

function StartList({ event }) {

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('start', event)
        if (event && event.id) {
            dispatch(fetchEventById(event.id));
        }
    }, [dispatch, event]);


    const eventByid = useSelector(state => state.fetchEventById.data);
    return (
        <div className='px-8 py-4'>
            <div className='w-[70%] border-b-4 border-[#002880]'>
                <div className='text-xl text-[#002880] font-semibold'> <span className='text-3xl'> {event?.name} </span>- {event?.gender === 'M' ? 'Man' : 'Woman'}'s {event?.classification}  {event?.stage}</div>
                <div className='text-base text-[#002880] font-normal '>
                    <span>{" " + formatTime(event?.date_time)} </span> -
                    <span>{" " + formatDate(event?.date_time)}</span>
                </div>
            </div>
            <WorldRC
                event={event}
            />

            <div className='mt-6 bg-[#002880] h-12 w-full text-white text-center flex justify-between items-center text-lg '>
                <div className='w-full flex justify-between'>
                    <p className='w-full'>Order</p>
                    <p className='w-full'>BIB</p>
                    <p className='w-full'>Country</p>
                    <p className='w-full'>Class</p>
                </div>
                <div className='w-full text-left pl-4'>
                    Athlete
                </div>
            </div>
            <div>
                {eventByid?.map((athlete, index) => (
                    <OrderCard
                        key={index}
                        orderNumber={index + 1}
                        athlete={athlete}
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
