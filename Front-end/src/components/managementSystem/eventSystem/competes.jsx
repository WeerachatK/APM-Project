import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { setRefreshEventId } from '../../../redux/slices/refreshEventIdSlice';
import { deleteData } from '../../../redux/actionCreator/deleteDataAction';
import { postData } from '../../../redux/actionCreator/postDataAction';
import { putData } from '../../../redux/actionCreator/putDataAction';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLogicOperator,
  GridActionsCellItem,
  useGridApiRef,
} from '@mui/x-data-grid';
import { CountryFlag } from '../../athletePage/countryFlag';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
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

export default function Competes({ event }) {
  const dispatch = useDispatch();
  const athletes = useSelector(state => state.athlete.data);
  const events = useSelector((state) => state.event.data);
  const selectedEvent = events.find(events => events.id === event);
  console.log(selectedEvent)
  useEffect(() => {
    dispatch(setRefreshEventId(event));
    dispatch(fetchEventById(event));
  }, [dispatch, event]);
  const competesById = useSelector(state => state.fetchEventById?.data);
  const refreshEventId = useSelector(state => state.refreshEventId.data);
  const apiRef = useGridApiRef();
  const [formData, setFormData] = useState({
    athlete_id: '',
    event_id: event,
    score: '{}',
    medal: 0,
    rank: 0,
    point: 0,
    order: '',
    remark: ''
  });


  const competesRows = competesById?.map(competes => ({
    id: competes.id,
    order: competes.order,
    bib: competes.bib,
    fullName: `${competes.first_name} ${competes.last_name}`,
    gender: competes.gender,
    classification: competes.classification,
    country: competes.country,
  })) ?? [];
  const competedAthleteIds = competesById?.map(item => item.athlete_id) || [];
  const rows = athletes
    .filter(athlete => !competedAthleteIds.includes(athlete.id))
    .map(athlete => ({
      id: athlete.id,
      bib: athlete.bib,
      fullName: `${athlete.first_name} ${athlete.last_name}`,
      gender: athlete.gender,
      classification: athlete.classification,
      country: athlete.country,
    }));

  const updateOrderAfterDelete = (apiUrl, dispatch, updatedCompetesById) => {
    updatedCompetesById.forEach((competes, index) => {
      const updatedData = { ...competes, order: index + 1 };
      dispatch(putData(`${apiUrl}/${competes.id}`, updatedData, competes.event_id));
    });
  };



  const handleDeleteClick = (dispatch, id, competesById) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/competitions`;
    return () => {
      dispatch(deleteData(apiUrl, id, refreshEventId))
        .then(() => {
          updateOrderAfterDelete(apiUrl, dispatch, competesById.filter(competes => competes.id !== id));
        });
    };
  };



  const handleAddClick = (athleteId) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/competitions`;
    const orderValue = competesById?.length ? competesById.length + 1 : 1;
    const updatedFormData = {
      ...formData,
      athlete_id: athleteId,
      order: orderValue,
    };
    console.log("orderValue :" + orderValue);
    console.log("Updated Form Data:", updatedFormData);
    dispatch(postData(apiUrl, updatedFormData, refreshEventId));
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      headerAlign: 'center',
      getActions: (params) => [
        <div className='w-full flex justify-end text-right'>
          <GridActionsCellItem
            icon={<PersonAddIcon />}
            label="addPerson"
            onClick={() => handleAddClick(params.id)}
            color="inherit"
          />
        </div>
        ,
      ],
    },
    {
      field: 'bib', headerName: 'BIB', flex: 0.8,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    {
      field: 'gender', headerName: 'Gender', flex: 0.5,
      headerAlign: 'right',
      renderCell: (params) => (
        <div className="text-right  w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'classification', headerName: 'Classification', flex: 0.8,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full ">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.8,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className='h-[60%] w-[20%]'>
            <CountryFlag countryCode={params.value} />
          </div>
          <span>{params.value}</span>
        </div>
      ),
    },
  ];

  const Order = selectedEvent?.sport_id === 1 ? 'Track' : 'Order';
  console.log('Order', selectedEvent?.sport_id)
  const competesColumns = [
    {
      field: 'order',
      headerName: Order,
      flex: 0.4,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'bib', headerName: 'BIB', flex: 0.8,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    { field: 'fullName', headerName: 'Full Name', flex: 1.2 },
    {
      field: 'gender', headerName: 'Gender', flex: 0.5,
      headerAlign: 'right',
      renderCell: (params) => (
        <div className="text-right  w-full">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'classification', headerName: 'Classification', flex: 0.8,
      headerAlign: 'center',
      renderCell: (params) => (
        <div className="text-center w-full ">
          <p>{params.value}</p>
        </div>
      ),
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 0.8,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className='h-[60%] w-[20%]'>
            <CountryFlag countryCode={params.value} />
          </div>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      headerAlign: 'center',
      getActions: (params) => [
        <div className='w-full flex justify-end text-right'>
          <GridActionsCellItem
            icon={<PersonRemoveIcon />}
            label="removePerson"
            onClick={handleDeleteClick(dispatch, params.id, competesById)}
            color="inherit"
          />
        </div>
        ,
      ],
    },
  ];

  return (
    <div className='flex flex-col items-center justify-start pt-8 w-full border border-black'>
      <div className='B w-[80%] mb-8'>
        <p className='p-1 text-lg font-semibold text-Blue-600 uppercase '>Participating athletes</p>
        <DataGrid
          sx={{
            '.MuiDataGrid-columnHeaders': {
              backgroundColor: '#002880',
              color: '#ffffff',
              fontWeight: '600',
            },
            '.MuiDataGrid-menuIcon': {
              backgroundColor: '#ffffff',
            },
            '.MuiDataGrid-sortIcon': {
              color: '#ffffff',
            },
          }}
          apiRef={apiRef}
          rows={competesRows}
          columns={competesColumns}
          pageSize={5}
        />
      </div>

      {/* <div className="selected-rows">
        {selectedRows.length}
        {selectedRows.length > 0 ? (
          <ul>
            {selectedRows.map((row) => (
              <li key={row.id}>ID: {row.id}, BIB: {row.bib}</li>
            ))}
          </ul>
        ) : (
          <p>No rows selected</p>
        )}
      </div> */}

      <div className='B w-[80%] h-[600px] mb-4'>
        <p className='p-1 text-lg font-semibold text-gray-text  uppercase '>athletes</p>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          pageSize={5}
          // checkboxSelection
          components={{ Toolbar: QuickSearchToolbar }}
        />
      </div>
    </div>
  );
}

