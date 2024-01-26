// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function WorldRC({ event }) {
//     // useState to hold the fetched data
//     const [records, setRecords] = useState(null);

//     // useEffect to fetch data on component mount
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://thaiparaathletics.com/thaiparaApp/world/records.php', {
//                     params: {
//                         gender: 'M',
//                         event_type: 'Shot Put',
//                         class: 'F37'
//                     }
//                 });
//                 setRecords(response.data); // Set the data in state
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 // Handle error appropriately in your application
//             }
//         };

//         fetchData();
//     }, []); // Empty dependency array means this runs once when the component mounts

//     // Render the fetched data
//     return (
//         <div>
//             {/* Conditional rendering based on whether records is not null */}
//             {records ? (
//                 <div>
//                     {/* Render your data here */}
//                     {/* This is a basic example, you might want to format your data appropriately */}
//                     <pre>{JSON.stringify(records, null, 2)}</pre>
//                 </div>
//             ) : (
//                 <p>Loading...</p> // Display a loading message or spinner while data is being fetched
//             )}
//         </div>
//     );
// }

// export default WorldRC;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

// *event_type, class, และ gender* ทำการ map โดยใช้ตัวแปi record เก็บข้อมูล data และเรียกแสดง record.event_type
function WorldRC({ event }) {
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    const genderParam = event.event_gender === 'Men' ? 'M' : (event.event_gender === 'Women' ? 'W' : '');
    const eventNameParam = event.event_name.replace(/ /g, '+');
    const classParam = event.event_class.split('/')[0];

    const [record, setRecord] = useState(null);

    useEffect(() => {
        const url = `/api/thaiparaApp/world/records.php?gender=${encodeURIComponent(genderParam)}&event_type=${encodeURIComponent(eventNameParam)}&class=${encodeURIComponent(classParam)}`;

        axios.get(url)
            .then(response => {
                setRecord(response.data);
            })
            .catch(error => {
                console.error('Error fetching the events data:', error);
                console.log(error.response);
            });
    }, [event.event_gender, event.event_name, event.event_class]); // Dependencies for useEffect

    // if (!record) {
    //     return (
    //         <div>
    //             https://thaiparaathletics.com/thaiparaApp/world/records.php?gender={genderParam}&event_type={eventNameParam}&class={classParam}
    //         </div>
    //     );
    // }



    return (
        <>
        </>
        // <>
        //     <div className='mt-4'>
        //         <button className='bg-yellow-400 text-white rounded-full flex px-2 my-2'>
        //             World Record
        //         </button>
        //     </div>

        //     <div className='Order mt-2  h-[120px] w-full text-center flex justify-between items-center bg-white border-2 border-Blue-600'>
        //         <div className='w-full p-2 flex ml-4'>
        //             <div className='bg-black rounded-lg h-[100px] w-[120px] flex-shrink-0 overflow-hidden'>
        //                 <img className='object-cover w-full h-full'
        //                     src={event.event_gender === 'Women' ? WomanProfile : ManProfile} alt=""
        //                 />
        //             </div>
        //             <div className='flex flex-col justify-center items-start px-5 w-full'>
        //                 <div className='flex items-center  h-full '>
        //                     <p className='text-xl font-semibold text-left'>fullName</p>
        //                 </div>
        //                 <p className='text-lg text-left mt-auto'>Birth:
        //                     {/* {calculateAge(athlete.date_of_birth)} */}
        //                 </p>
        //             </div>
        //         </div>
        //         <div className='w-full flex flex-col justify-between text-lg font-semibold'>

        //             <div className='flex flex-col text-sm'>
        //                 <p className='w-full'>Result</p>
        //                 {/* <p className='w-full text-2xl '>{record.event_description}</p> */}
        //             </div>
        //             <div className='flex text-sm font-light mt-5'>
        //                 <p className='w-full'>Date</p>
        //                 <p className='w-full'>City</p>
        //             </div>
        //             <p className='w-full'>{event.event_gender}</p>
        //             <p className='w-full'>{event.event_name}</p>
        //             <p className='w-full'>{event.event_class}</p>
        //             <p className='w-full'></p>
        //         </div>

        //     </div>
        // </>
    )
}

export default WorldRC


 // https://thaiparaathletics.com/thaiparaApp/world/records.php?**gender=M**&**event_type=100**%20m&****class=T38**
 // https://thaiparaathletics.com/thaiparaApp/world/records.php?gender=M&event_type=100+m&class=T34