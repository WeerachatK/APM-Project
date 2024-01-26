import React, { useEffect } from 'react';
import "./content.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { formatDate, formatTime, calculateAge } from '../../date_time_format';
import Profile from '../../../assets/images/male_profile.png';


function TimeScore({ athlete }) {
    return (<div className='w-1/2 h-full flex justify-center py-4'>
        <div className='h-full w-2/3 flex flex-col rounded-lg border border-Blue-700 '>
            <div className='bg-Blue-700 text-white h-1/2 rounded-t-lg flex justify-center items-center text-xl'>
                Result
            </div>
            <div className='bg-white text-Blue-700 flex justify-center items-center text-xl h-1/2  rounded-b-lg'>
                {athlete?.score?.time + " s."}
            </div>
        </div>

    </div>
    );
}

function DistanceScore({ athlete }) {
    const scores = Array.isArray(athlete?.score) ? athlete.score : [];
    const maxDistance = Math.max(...scores.map(s => s.distance) || [0]);
    return (
        <div className='w-4/5 h-full flex justify-center p-2'>
            <div className='h-full w-full flex flex-col rounded-lg border border-Blue-700 '>
                <div className='bg-Blue-700 text-white h-1/4 rounded-t-lg flex justify-center items-center text-lg'>
                    Attempt
                </div>
                <div className='grid grid-cols-3 grid-rows-2 gap-1 p-2'>
                    {scores.map((score, index) => (
                        <div key={index} className={`border  text-xs flex text-gray-dark  ${score.distance === maxDistance ? 'border-green' : 'border-Blue-700'}`}>
                            <p className={`flex-shrink-0 w-[30%] text-white flex justify-center items-center ${score.distance === maxDistance ? 'font-bold text-black bg-Green' : 'bg-Blue-700'}`}>
                                A{score.attempt}
                            </p>
                            <p className={`bg-white w-full flex justify-end items-center p-1 ${score.distance === maxDistance ? 'font-bold text-black' : ''}`}>
                                {score.distance} m.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function OrderCard({ orderNumber, athlete, format }) {
    const fullName = `${athlete.first_name} ${athlete.last_name}`;
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    const renderScore = () => {
        switch (format) {
            case 'distance':
                return <DistanceScore athlete={athlete} />;
            case 'time':
                return <TimeScore athlete={athlete} />;
            default:
                return null;
        }
    };
    return (
        <div className={`Order mt-2  h-[120px] w-full text-center flex justify-between items-center ${orderNumber % 2 === 0 ? ' bg-white' : ' bg-Blue-100'}`}>
            <div className='w-full flex justify-between text-lg font-semibold'>
                <p className='w-full'>{orderNumber}</p>
                <p className='w-full'>{athlete.bib}</p>
                <p className='w-full'>{athlete.country}</p>
                <p className='w-full'>{athlete.disability_class}</p>
            </div>
            <div className='w-full p-2 flex'>
                <div className='bg-black rounded-lg h-[100px] w-[120px] flex-shrink-0 overflow-hidden'>
                    <img className='object-cover w-full h-full' src={athlete.event_gender === 'Women' ? WomanProfile : ManProfile} alt="" />
                </div>
                <div className='flex flex-col justify-center items-start px-5 w-full'>
                    <div className='flex items-center  h-full '>
                        <p className='text-xl font-semibold text-left'>{fullName}</p>
                    </div>
                    <p className='text-lg text-left mt-auto'>Age: {calculateAge(athlete.date_of_birth)}</p>
                </div>
            </div>
            {renderScore()}
        </div>
    );
}

function Result({ event }) {

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
                <div className='text-3xl text-[#002880] font-semibold'>{event?.event_description}</div>
                <div className='text-base text-[#002880] font-normal '>
                    <span>{event?.event_gender}</span> Event -
                    <span>{" " + formatTime(event?.event_date_time)} </span> -
                    <span>{" " + formatDate(event?.event_date_time)}</span>
                </div>
            </div>
            <div className='mt-6 bg-[#002880] h-12 w-full text-white text-center flex justify-between items-center text-lg font-semibold'>
                <div className='w-full flex justify-between'>
                    <p className='w-full'>Order</p>
                    <p className='w-full'>BIB</p>
                    <p className='w-full'>Country</p>
                    <p className='w-full'>Class</p>
                </div>
                <div className='w-full'>
                    Name
                </div>
                <div className={`${event.score_format === 'distance' ? 'w-4/5' : 'w-1/2'}`}>
                    Score
                </div>
            </div>

            {event?.status === "finish" ? (
                <div>
                    {eventByid?.map((athlete, index, format) => (
                        <OrderCard
                            key={index}
                            orderNumber={index + 1}
                            athlete={athlete}
                            format={event.score_format}
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