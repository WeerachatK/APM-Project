import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGenderDisplay } from "../date_time_format";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { fetchEventsByAthlete  } from '../../redux/slices/fetchEventByAthleteSlice';
import { fetchAthletes } from '../../redux/slices/athleteSlice';
import { setDisplay } from '../../redux/slices/displaySlice';
import Avatar from '@mui/material/Avatar';
import { CountryFlag } from './countryFlag';
import "./index.css";
function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 2,
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
        </Box>
    );
}
function Index() {
    const [athleteSelect, setAthleteSelect] = useState(null);
    const [athleteInfo, setAthleteInfo] = useState(null);
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const athletes = useSelector(state => state.athlete.data);
    useEffect(() => {
        dispatch(setDisplay('athlete'));
        dispatch(fetchAthletes());
    }, [dispatch]);
    // const eventsByAthlete = useSelector((state) => state.fetchEventsByAthlete.data);

    const handleClick = async (params) => {
        await dispatch(fetchEventsByAthlete(params.id)).unwrap().then((fetchedEvents) => {
            const athleteClicked = athletes.find(athlete => athlete.id === params.id);
            if (athleteClicked) {
                navigate('/athlete/information', { state: { athlete: athleteClicked , eventsByAthlete: fetchedEvents || [] } });
            }
        }).catch((error) => console.error('Error fetching events:', error));
    };

    const columns = [
        {
            field: 'bib', headerName: 'BIB', width: 110,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'dob', headerName: 'DOB', width: 110,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'country', headerName: 'Country', flex: 0.6,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="flex items-center w-full justify-center">
                    <div className='w-[20%] mr-2'>
                        <CountryFlag countryCode={params.value} />
                    </div>
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'name', headerName: 'Name', flex: 1.5,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className='flex items-center w-full justify-start'>
                    <div className='w-[20%] mr-2'>
                        <Avatar className='' alt={params.value.first_name} src={params.value.gender === 'W' ? WomanProfile : ManProfile} />
                    </div>
                    <p className='ml-2'>{params.value.first_name} {params.value.last_name}</p>
                </div>
            ),
        },
        {
            field: 'gender', headerName: 'Gender', width: 100,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'classification', headerName: 'Classification', width: 100,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            width: 100,
            getActions: (params) => [
                <div className='w-full flex text-right'>
                    <GridActionsCellItem
                        icon={<ContactPageIcon />}
                        label="Information"
                        onClick={(params) => handleClick(params)}
                        color="inherit"
                    />
                </div>

            ],

        },
    ];
    const rows = athletes.map(athletes => ({
        id: athletes.id,
        bib: athletes.bib,
        dob: `${athletes.date_of_birth?.split('T')[0] ?? '-'}`,
        country: athletes.country,
        name: athletes,
        classification: athletes.classification,
        gender: `${getGenderDisplay(athletes.gender)}`,
    }));

    const sortedRows = rows.sort((a, b) => {
        const bibA = parseInt(a.bib, 10);
        const bibB = parseInt(b.bib, 10);
        return bibA - bibB;
    });
    return (
        <div className='flex justify-center w-full'>
            <div className='w-[75%] my-6'>
                <div className='flex justify-between w-full '>
                    <div className='h-full w-full'>
                        <DataGrid
                            sx={{
                                '.MuiDataGrid-columnHeaders': {
                                    backgroundColor: '#002880',
                                    color: '#ffffff',
                                    fontWeight: '600',
                                    
                                },
                                '.MuiDataGrid-menuIcon': {
                                    backgroundColor: '#ffffff', 
                                    color: '#ffffff',
                                },
                                '.MuiDataGrid-sortIcon': {
                                    color: '#ffffff',
                                },
                            }}
                            rows={sortedRows}
                            columns={columns}
                            components={{ Toolbar: QuickSearchToolbar }}
                            onCellDoubleClick={(params) => handleClick(params)}
                            rowHeight={70}
                            headerHeight={50}
                        />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Index
{/* <div className='flex justify-center w-full '>
<div className='w-[70%] mt-6'>
    <div className="grid grid-cols-athlete gap-4 bg-Blue-600 text-white font-semibold">
        <p className="text-center">BIB</p>
        <p className="text-center">DOB</p>
        <p className="text-center">COUNTRY</p>
        <p className="text-center">ATHLETE</p>
        <p className="text-center">CLASSIFICATION</p>
        <p className="text-center">GENDER</p>
    </div>
    {athletes.map((athlete, index) => (
        <div
            key={index}
            className={`grid grid-cols-athlete gap-4 items-center font-semibold py-2 ${index % 2 !== 0 ? 'bg-gray-component   ' : ''}`}
        >
            <p className="text-center">{athlete.bib}</p>
            <p className="text-center">{athlete.date_of_birth?.split('T')[0] ?? 'N/A'}</p>
            <div className='flex w-full h-full justify-center items-center'>
                <div className='h-[60%] w-[30%] '>
                    <CountryFlag countryCode={athlete.country}/>
                </div>
                <p className="text-center ml-2">{athlete.country}</p>
            </div>
            <div className='justify-center'>
                <div className='flex'>
                <Avatar alt={athlete.first_name} src={athlete.gender === 'W' ? WomanProfile : ManProfile} />
                    <p>{athlete.first_name} {athlete.last_name}</p>
                </div></div>

            <p className="text-center">{athlete.classification}</p>
            <p className="text-center">{athlete.gender}</p>
        </div>
    ))}
</div>
</div> */}