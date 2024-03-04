import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteData } from '../../../redux/actionCreator/deleteDataAction';
// import { fetchEvents } from '../../../redux/slices/eventSlice';
import { formatDate, formatTime, getGenderDisplay } from "../../date_time_format";
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLogicOperator,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';

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

export default function EventsList({setEventSelect, setAthleteSelect}) {

  const events = useSelector((state) => state.event.data);
  const handleAthleteClick = (id) => () => {
    console.log(`Athlete action on row ${id}`);
    setAthleteSelect(id);
  };

  const handleEditClick = (id) => () => {
    console.log(`Edit action on row ${id}`);
    setEventSelect(id);
  };

  const handleDeleteClick = (id) => {
    const dispatch = useDispatch();
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/events`;
    return () => {
      dispatch(deleteData(apiUrl, id));
    };
  };
  // if (!events || events.length === 0) {
  //   console.log('No events data available');
  //   return <div>No events data available</div>;
  // }

  const rows = events.map(events => ({
    id: events.id,
    dateTime: events.date_time,
    number: events.number,
    gender: `${getGenderDisplay(events.gender)}`,
    name: events.name,
    classification: events.classification,
    stage: events.stage,
    status: events.status,
    remark: events.remark,
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
      field: 'remark',
      headerName: 'Remark',
      width: 100,
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
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      getActions: (params) => [
        <div className='w-full flex justify-end text-right'>
          <GridActionsCellItem
            icon={<PersonIcon />}
            label="Athlete"
            className="textPrimary"
            onClick={handleAthleteClick(params.id)}
            color="inherit"
          />
           <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
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
        ,
      ],
    },
  ];


  return (
    <div className='flex justify-between w-full h-screen-nav'>
      <div className='h-full w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={25}
          rowsPerPageOptions={[25, 45, 65]}
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
    </div>
  );
}
