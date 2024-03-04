import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatTime, getGenderDisplay } from "../date_time_format";
import { CountryFlag } from './countryFlag';
import ReplyIcon from '@mui/icons-material/Reply';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { fetchEventsByAthlete  } from '../../redux/slices/fetchEventByAthleteSlice';
import { setDisplay } from '../../redux/slices/displaySlice';
import {
  DataGrid,
} from '@mui/x-data-grid';


function AthleteMedal({ events = [] }) {
  // console.log('events', events)
  const medalCounts = events.reduce((acc, event) => {
    if (event.medal === 1) acc.gold++;
    else if (event.medal === 2) acc.silver++;
    else if (event.medal === 3) acc.bronze++;
    return acc;
  }, { gold: 0, silver: 0, bronze: 0 });

  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-[50%] flex justify-around items-center font-semibold'>
        <div className='bg-Blue-600 rounded-s-lg w-full'>
          <p className='text-white p-2 flex justify-center items-center'><WorkspacePremiumIcon sx={{ color: '#FFD700' }} /> Gold</p>
          <input className='w-full py-1 rounded-es-lg border border-black bg-white text-center'
            readOnly
            value={medalCounts.gold}
          ></input>
        </div>
        <div className='bg-Blue-600 w-full'>
          <p className='text-white p-2 flex justify-center items-center'><WorkspacePremiumIcon sx={{ color: '#C0C0C0' }} /> Silver</p>
          <input className='w-full py-1 border border-black bg-white text-center'
            readOnly
            value={medalCounts.silver}
          ></input>
        </div>
        <div className='bg-Blue-600 rounded-e-lg w-full'>
          <p className='text-white p-2 flex justify-center items-center'><WorkspacePremiumIcon sx={{ color: '#CD7F32' }} /> Bronze</p>
          <input className='w-full py-1 rounded-ee-lg border border-black bg-white text-center'
            readOnly
            value={medalCounts.bronze}
          ></input>
        </div>
      </div>
    </div>
  );
}

function AthleteInfo() {
  const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
  const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const athlete = location.state?.athlete;
  const eventsByAthlete = location.state?.eventsByAthlete || [];
  useEffect(() => {
    console.log('athlete', athlete)
    console.log('athleteID', athlete.id)
    dispatch(setDisplay('athlete'));
    dispatch(fetchEventsByAthlete (athlete.id));
    console.log('fetchEventsByAthlete', eventsByAthlete)
  }, [dispatch]);
  // useEffect(() => {
  //   if (athlete) {
  //     console.log(athlete.id)
  //     dispatch(fetchEventsByAthlete (athlete.id));
  //     console.log(fetchEventsByAthlete)
  //   }
  // }, [athlete, dispatch]);
  if (!athlete) {
    return <div>No Athlete Data Available</div>;
  }
  const handleBackClick = () => {
    navigate(-1);
  };

  const rows = eventsByAthlete?.map(events => ({
    id: events.id,
    dateTime: events.date_time || 0,
    number: events.number || 0,
    gender: `${getGenderDisplay(events.gender) || 0}`,
    name: events.name || 0,
    classification: events.classification || 0,
    stage: events.stage || 0,
    status: events.status || 0,
    rank: events.rank || 0,
    medal: events.medal || 0,
  }));

  const columns = [
    {
      field: 'dateTime',
      headerName: 'Date&Time',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p className="font-semibold">{formatTime(params.value)}</p>
          <p className="text-xs ">{formatDate(params.value)}</p>
        </div>
      ),
    },
    {
      field: 'number',
      headerName: 'No.',
      width: 60,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 80,
      headerAlign: 'right',
      renderCell: (params) => (
        <div className="text-right  w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.8,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'classification',
      headerName: 'Classification',
      flex: 0.8,
      headerAlign: 'left',
      renderCell: (params) => (
        <div className="text-left  w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'stage',
      headerName: 'Stage',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'rank',
      headerName: 'Rank',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value || <span> - </span>}</p>
        </div>
      ),
    },
    {
      field: 'medal',
      headerName: 'Medal',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full flex justify-center items-center">
          {params.value === 1 ? (<>
            <div className='bg-Blue-600  p-1 rounded-full mr-2'>
              <WorkspacePremiumIcon sx={{ color: '#FFD700' }} />
            </div>
            <span> Gold</span></>) :
            params.value === 2 ? (<>
              <div className='bg-Blue-600 p-1 rounded-full mr-2'>
                <WorkspacePremiumIcon sx={{ color: '#C0C0C0' }} />
              </div>
              <span> Silver</span></>) :
              params.value === 3 ? (<>
                <div className='bg-Blue-600 p-1 rounded-full mr-2'>
                  <WorkspacePremiumIcon sx={{ color: '#CD7F32' }} />
                </div>
                <span> Bronze</span></>) :
                <span> - </span>}
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <button
        onClick={handleBackClick}
        className='bg-blue-700 text-white p-3'
      >
        Back
      </button> */}
      <body className='w-full flex justify-center items-center'>
        <div className='w-[90%] h-screen-nav pt-2'>
          <div className='HEADER w-full flex p-2 bg-Blue-600 text-white justify-around items-end font-bold text-2xl rounded-t-3xl flex-shrink-0 relative'>
            <button
              onClick={handleBackClick}
              className='text-white p-3 absolute left-4 top-1'>
              <ReplyIcon sx={{
                color: '#ffffff',
                '&:hover': {
                  color: '#335eff',
                  cursor: 'pointer', 
                }
              }} />
            </button>
            <label className='w-full text-center text-orange-500 text-4xl  '>{athlete.bib}</label>
            <label className='w-full text-center'>{athlete.first_name} {athlete.last_name}</label>
            <div className='w-full flex justify-center items-end font-semibold text-xl '>
              {/* <label className='mr-4'>{athlete.gender === 'M' ? 'Male' : 'Female'}</label>
              <label className=''>{athlete.classification}</label> */}
              {/* <div className='w-[11%] border shadow-shadow-base'>
                <CountryFlag countryCode={athlete.country} />
              </div>
              <label className='ml-4 text-2xl font-semibold '>{athlete.country}</label> */}
            </div>

          </div>
          <div className='INFORMATION w-full h-[30%] flex justify-around items-center relative'>
            <div className='w-full bg-Blue-600 h-[10%] absolute -z-10 top-0' />
            <div className='w-full flex justify-center text-center'>
              <div className='flex-col justify-around items-center text-2xl font-bold mr-16'>
                <p className='w-full'>{athlete.gender === 'M' ? 'Male' : 'Female'}</p>
                <p className='w-full text-Blue-600 mt-4'>{athlete.classification}</p>
              </div>
              <div className='w-[15%] flex-col justify-around items-center text-center'>
                <p className='text-2xl font-semibold mb-1'>{athlete.country}</p>
                <div className='border shadow-shadow-base'>
                  <CountryFlag countryCode={athlete.country} />
                </div>
              </div>
            </div>
            <div className='w-[30%] h-full flex border-4 rounded-full overflow-hidden '>
              <img className='object-cover' src={athlete.gender === 'M' ? ManProfile : WomanProfile} alt={athlete.first_name} />
            </div>
            <div className='w-full text-center'>
              <AthleteMedal events={eventsByAthlete || []} />
            </div>
          </div>
          <div className='EVENT w-full mt-4 h-[60%]'>
            <div className='h-full'>
              <DataGrid
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f1f1f1',
                    color: '#9f9f9f',
                  },
                }}
                rows={rows}
                columns={columns}
              />
            </div>

          </div>
        </div>
      </body>


    </>
  )
}

export default AthleteInfo