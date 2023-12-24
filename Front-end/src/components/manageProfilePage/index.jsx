import React, { useState } from 'react';
import ProfileCard from './components/profileCard'
import Information from './components/information'
import AthleteInformation from './components/athleteInformation'
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import './index.css'

function index() {
    const [infoDisplay, setInfoDisplay] = useState('General users');
    const handleInfoClick = (event) => {
        const value = event.target.innerText;
        setInfoDisplay(value);
    };

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setDisplay(''));
    }, [dispatch]);

    return (
        <>
            <div className='p-[62px] w-screen h-screen-nav  flex justify-between items-end'>
                <ProfileCard />
                <div className='w-full h-full pl-12 flex flex-col justify-between'>
                    <div className='FilterInformation flex text-base  font-normal '>
                        <button 
                         className={`h-full w-[60%] ${infoDisplay === 'General users' ? 'text-black' : 'text-[#91A3CC]'}`} 
                        onClick={handleInfoClick}>
                            General users
                        </button>
                        <button 
                         className={`h-full w-[40%] ${infoDisplay === 'Athlete' ? 'text-black' : 'text-[#91A3CC]'}`} 
                        onClick={handleInfoClick}>
                            Athlete
                        </button>
                    </div>
                    {infoDisplay === 'General users' ? <Information /> : <AthleteInformation/>}
                </div>
            </div>
        </>
    )
}

export default index