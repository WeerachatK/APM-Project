import React, { useEffect, useState } from 'react';
import { deleteData } from '../../../redux/actionCreator/deleteDataAction';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGenderDisplay } from "../../date_time_format";
import { CountryFlag } from '../../athletePage/countryFlag';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { fetchEventsByAthlete  } from '../../../redux/slices/fetchEventByAthleteSlice';
import { fetchAthletes } from '../../../redux/slices/athleteSlice';

import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
    GridActionsCellItem,
} from '@mui/x-data-grid';

function QuickSearchToolbar() {
    return (
        <Box
            sx={{
                p: 2,
                pb: 0,
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
function AthleteList({ setAthleteSelect, setAthleteInfo }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ManProfile = "https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png";
    const WomanProfile = "https://www.nicepng.com/png/detail/377-3778780_helper4u-maid-bai-cook-chef-empty-profile-picture.png";
    const athletes = useSelector(state => state.athlete.data);
    const handleEditClick = (id) => () => {
        console.log(`Edit action on row ${id}`);
        setAthleteSelect(id);
    };
    // const handleInfoClick = async (id) =>  {
    //     await dispatch(fetchEventsByAthlete(id)).unwrap().then((fetchedEvents) => {
    //         const athleteClicked = athletes.find(athlete => athlete.id === id);
    //         if (athleteClicked) {
    //             navigate('/athlete/information', { state: { athlete: athleteClicked , eventsByAthlete: fetchedEvents } });
    //         }
    //     }).catch((error) => console.error('Error fetching events:', error));
    // };
    // const handleClick = async (params) => {
    //     await dispatch(fetchEventsByAthlete(params.id)).unwrap().then((fetchedEvents) => {
    //         const athleteClicked = athletes.find(athlete => athlete.id === params.id);
    //         if (athleteClicked) {
    //             navigate('/athlete/information', { state: { athlete: athleteClicked , eventsByAthlete: fetchedEvents } });
    //         }
    //     }).catch((error) => console.error('Error fetching events:', error));
    // };

    const handleDeleteClick = (id) => {
        const API_URL = import.meta.env.VITE_API_URL;
        const apiUrl = `${API_URL}/athletes`;
        return () => {
            dispatch(deleteData(apiUrl, id));
        };
    };

    const columns = [
        {
            field: 'bib', headerName: 'BIB', width: 120,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'name', headerName: 'Name', flex: 1,
            // headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-start w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'gender', headerName: 'Gender', width: 120,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'classification', headerName: 'Classification', width: 120,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="text-center w-full">
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'country', headerName: 'Country', width: 120,
            headerAlign: 'center',
            renderCell: (params) => (
                <div className="flex text-center w-full justify-center">
                    <div className='h-[60%] w-[30%] mr-2'>
                        <CountryFlag countryCode={params.value} />
                    </div>
                    <p>{params.value}</p>
                </div>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            flex: 1.2,
            getActions: (params) => [
                <div className='w-full flex text-right'>
                    {/* <GridActionsCellItem
                        icon={<ContactPageIcon />}
                        label="Information"
                        onClick={handleInfoClick(params.id)}
                        color="inherit"
                    /> */}
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={handleEditClick(params.id)}
                        color="inherit"
                    />
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(params.id)}
                        color="inherit"
                    />
                </div>

            ],

        },
    ];
    const rows = athletes.map(athletes => ({
        id: athletes.id,
        bib: athletes.bib,
        name: `${athletes.first_name} ${athletes.last_name}`,
        gender: `${getGenderDisplay(athletes.gender)}`,
        classification: athletes.classification,
        country: athletes.country,
    }));

    const sortedRows = rows.sort((a, b) => {
        const bibA = parseInt(a.bib, 10);
        const bibB = parseInt(b.bib, 10);
        return bibA - bibB;
    });
    return (
        <div className='flex justify-between w-full h-screen-nav'>
            <div className='h-full w-full'>
                <DataGrid
                    rows={sortedRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{ Toolbar: QuickSearchToolbar }}
                />
            </div>
        </div>

    );
}

export default AthleteList;