
import React, { useState, useEffect } from 'react';
import worldRecordData from './worldRecord.json';
import worldMedal from '../../../assets/images/worldMedal.png'

async function fetchCountryNameByNPC(npcCode) {
    try {
        // Use the REST Countries API to get data by country code (Alpha-3)
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${npcCode}`);

        if (!response.ok) {
            throw new Error(`Error fetching country data: ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming the first result is the correct one, extract the country's full name
        const countryName = data[0]?.name?.common || 'Unknown Country';

        return countryName;
    } catch (error) {
        console.error('Failed to fetch country name:', error);
        return 'Error fetching country name';
    }
}


function WorldRC({ event }) {
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    const genderParam = event.gender;
    const eventNameParam = event.name.trim();
    const classParam = event.classification.split('/')[0];
    const [record, setRecord] = useState([]);
    const [countryName, setCountryName] = useState('');

    // useEffect(() => {
    //     const url = `/api/thaiparaApp/world/records.php?gender=${encodeURIComponent(genderParam)}&event_type=${encodeURIComponent(eventNameParam)}&class=${encodeURIComponent(classParam)}`;

    //     axios.get(url)
    //         .then(response => {
    //             setRecord(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching the events data:', error);
    //             console.log(error.response);
    //         });
    // }, [event.gender, event.name, event.classification]); // Dependencies for useEffect

    // if (!record) {
    //     return (
    //         <div>
    //             https://thaiparaathletics.com/thaiparaApp/world/records.php?gender={genderParam}&event_type={eventNameParam}&class={classParam}
    //         </div>
    //     );
    // }
    useEffect(() => {
        const filteredRecords = worldRecordData.filter(record =>
            record.Gender === genderParam &&
            record.Event_Type === eventNameParam &&
            record.Class === classParam
        );
        setRecord(filteredRecords);
    }, [event.gender, event.name, event.classification, worldRecordData]);

    useEffect(() => {
        if (record.length > 0 && record[0].NPC) {
            fetchCountryNameByNPC(record[0].NPC)
                .then(name => setCountryName(name));
        }
    }, [record]);



    return (
        <>
            <div className='mt-2'>
                <button className='bg-yellow-400 text-white rounded-full flex px-2 my-2'>
                    World Record
                </button>
            </div>

            <div>
                {record.length > 0 ? (
                    record.map((record, index) => (
                        record.Family_Name === "vacant" ? (
                            <div>No records found.</div>
                        ) : (
                            <div key={index} className='Order mt-2 w-full text-center flex justify-between items-center bg-white border-2 border-yellow-400'>
                                <div className='w-full p-2 flex justify-center items-center'>
                                    <div className='flex rounded-lg h-[60px] flex-shrink-0 overflow-hidden mx-4 object-cover'>
                                        <img className=' w-full'
                                            src={worldMedal}
                                        />
                                    </div>
                                    <div className='flex bg-black rounded-lg h-[60px] w-[60px] flex-shrink-0 overflow-hidden border'>
                                        <img className='object-cover w-full h-full'
                                            src={record.Gender === 'W' ? WomanProfile : ManProfile} alt=""
                                        />
                                    </div>
                                    <div className='flex flex-col justify-center items-start px-5'>
                                        <div className='flex items-center  h-full '>
                                            <p className='text-xl font-semibold text-left'>{record.Family_Name} {record.Given_Name}</p>
                                        </div>
                                        <p className='text-xs text-left mt-auto'>NPC: {countryName}
                                        </p>
                                        <p className='text-xs text-left mt-auto'>Birth: {record.Birth}
                                        </p>
                                    </div>
                                </div>
                                <div className='w-full p-2  flex justify-start items-start'>
                                    <div className='w-full '>
                                        <div className='flex flex-col justify-center items-center text-Blue-600'>
                                            <p className='bg-Blue-600 text-xs text-white w-[20%] rounded-full'>Result</p>
                                            <p className=' text-center text-2xl font-semibold'>{record.Result}</p>
                                        </div>
                                    </div>
                                    <div className='w-full text-xs'>
                                        <div className='flex justify-start'>
                                            <p className='text-gray-text mr-1'>Date:</p>
                                            <i>{record.Date}</i>
                                        </div>
                                        <div className='flex justify-start '>
                                            <p className='text-gray-text mr-1'>City:</p>
                                            <i>{record.City}</i>
                                        </div>
                                        <div className='flex justify-start '>
                                            <p className='text-gray-text mr-1'>Country:</p>
                                            <i>{record.Country}</i>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        )))
                ) : (
                    <p>No records found.</p>

                )}
            </div>


        </>
    )
}

export default WorldRC


// https://thaiparaathletics.com/thaiparaApp/world/records.php?**gender=M**&**event_type=100**%20m&****class=T38**
// https://thaiparaathletics.com/thaiparaApp/world/records.php?gender=M&event_type=100+m&class=T34