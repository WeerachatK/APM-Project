// add-modal.jsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button, Modal, Carousel } from 'flowbite-react';
import { fetchSports } from '../../../redux/slices/sportSlice';
import { useSelector, useDispatch } from 'react-redux';
import { capitalizeFirstLetter } from '../../date_time_format'
import DatePicker from 'react-datepicker';
import { postData } from '../../../redux/actionCreator/postDataAction';
import Alert from '@mui/material/Alert';
import Competes from './competes';
import AddCircleIcon from '@mui/icons-material/AddCircle';




function AddEventModal() {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    classification: '',
    date_time: '',
    gender: '',
    status: 'start-list',
    location: '',
    sport_id: '',
    stage: 'final',
    bypoint: '',
    score_format: '',
    remark: '',
  });
  const formattedDateTime = formData.date_time ? format(formData.date_time, 'yyyy-MM-dd HH:mm') : '';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    setOpenModal(false);
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/events`;
    const dataToSend = {
      ...formData,
      date_time: formattedDateTime,
    };
    dispatch(postData(apiUrl, dataToSend));

    // try {
    //   await dispatch(postData(apiUrl, dataToSend));
    //   setAlertContent({ severity: 'success', message: 'Event created successfully!' });
    //   setShowAlert(true);
    // } catch (error) {
    //   setAlertContent({ severity: 'error', message: 'Error creating event.' });
    //   setShowAlert(true);
    // }
    setFormData({
      number: '',
      name: '',
      classification: '',
      date_time: '',
      gender: '',
      status: '',
      location: '',
      sport_id: '',
      stage: '',
      bypoint: '',
      score_format: '',
      remark: '',
    });

  };
  const handleDateChange = (date) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      date_time: date
    }));
  };
  const DateTimePickerComponent = () => {
    // const [startDate, setStartDate] = useState(new Date());
    return (
      <>
        <DatePicker
          selected={formData.date_time ? new Date(formData.date_time) : new Date()}
          onChange={handleDateChange}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          className='w-full h-full py-3 text-xl px-2 font-medium rounded-sm border border-black bg-white text-center'
          required
        />
      </>
    );
  };
  const DatePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className='w-full h-full py-4 px-2  rounded-sm border border-black bg-white text-center'
      />
    );
  };
  const TimePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        // showTimeSelect
        // showTimeSelectOnly
        // showTimeInput
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className='w-[95%] h-full py-4 px-2 rounded-sm border border-black bg-white text-center'
      />
    );
  };
  // const sports = useSelector(state => state.sport.data);
  // const athletes = useSelector(state => state.athlete.data);
  return (
    <>
      <button
       className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center mb-3 text-Blue-600`}
        onClick={() => setOpenModal(true)}>
        <AddCircleIcon sx={{ color: '#002880' }} /> <span className='ml-1'>Create New Event</span>
      </button>
      <Modal className=' p-32' show={openModal} onClose={() => setOpenModal(false)} size="">
        <Modal.Header><div
        className={`px-3 py-1  mx-1  border-Blue-600 text-2xl font-semibold
        flex justify-center items-center mb-3 text-Blue-600`}
        onClick={() => setOpenModal(true)}>
        <AddCircleIcon sx={{ color: '#002880' }} /> <span className='ml-1'>Create New Event</span>
      </div></Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body className='bg-gray-component'>
              <div className='flex w-full'>
                <div className='w-[20%]'>
                  <p className='text-sm  text-gray-text'>Number</p>
                  <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                    name='number'
                    type="text"
                    placeholder="Enter event number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className='w-[60%] px-4'>
                  <p className='text-sm  text-gray-text'>Event Name</p>
                  <input
                    className='p-1 w-full rounded-sm border border-black bg-white text-center'
                    name='name'
                    type="text"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='w-[20%]'>
                  <p className='text-sm  text-gray-text'>Type</p>
                  <select required
                    name='sport_id'
                    value={formData.sport_id}
                    className={`p-1 w-full rounded-sm border border-black bg-white text-center  ${formData.sport_id ? 'text-black': 'text-gray-text '}`}
                    onChange={handleChange}>
                    <option hidden>- Select Type -</option>
                    <option value="1">Track </option>
                    <option value="2">Field </option>
                    {/* {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>
                      {capitalizeFirstLetter(sport.type)}/{capitalizeFirstLetter(sport.sub_type)}
                    </option>
                  ))} */}
                  </select>
                </div>
              </div>
              <div className='flex justify-evenly h-full '>
                <div className='mt-4 flex flex-col justify-evenly w-[50%] h-full '>
                  <div className='w-full flex justify-evenly'>
                    <div className='w-full pr-1'>
                      <p className='text-sm  text-gray-text'>Gender</p>
                      <select required
                        name='gender'
                        value={formData.gender}
                        className={`p-1 w-full rounded-sm border border-black bg-white text-center  ${formData.gender ? 'text-black': 'text-gray-text '}`}
                        onChange={handleChange}>
                        <option value="" hidden>- Select Gender -</option>
                        <option value="M">Men</option>
                        <option value="W">Women</option>
                        <option value="X">Mixed</option>
                      </select>
                    </div>
                    <div className='w-full pl-1'>
                      <p className='text-sm  text-gray-text'>Classification</p>
                      <input
                        className='p-1 w-full rounded-sm border border-black bg-white text-center'
                        name='classification'
                        type="text"
                        placeholder="Enter event classification"
                        value={formData.classification}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className='w-full flex justify-evenly pt-2'>
                    <div className='pr-1 w-full'>
                      <p className='text-sm  text-gray-text'>Score Type</p>
                      <select
                        required
                        name='score_format'
                        className={`p-1 w-full rounded-sm border border-black bg-white text-center  ${formData.score_format ? 'text-black': 'text-gray-text '}`}
                        value={formData.score_format}
                        onChange={handleChange}
                      >
                        <option value="" hidden>- Select Type -</option>
                        <option value="time">Time</option>
                        <option value="distance">Distance</option>
                        <option value="height">Height</option>
                      </select>
                    </div>
                    <div className='w-full pl-1'>
                      <p className='text-sm text-gray-text'>Date & time</p>
                      <input
                        type="datetime-local"
                        name="date_time"
                        value={formData.date_time}
                        onChange={handleChange}
                        placeholder="date_time"
                        className="p-1 w-full rounded-sm border border-black bg-white text-center"
                      />
                      {/* <TimePickerComponent /> */}
                      {/* <div className='w-full flex items-center'>
                      <DateTimePickerComponent />
                    </div> */}
                    </div>
                  </div>

                  <div className='w-full flex justify-evenly mt-6'>
                    <div className='w-full pr-1'>
                      <p className='text-sm  text-gray-text'>Status</p>
                      <select
                        name='status'
                        className='p-1 w-full rounded-full border border-black bg-white text-center'
                        value={formData.status}
                        onChange={handleChange}>
                        <option value="start-list">Start list</option>
                        <option value="live">Live</option>
                        <option value="result">Result</option>
                      </select>
                    </div>
                    <div className='w-full pl-1'>
                      <p className='text-sm  text-gray-text'>Stage</p>
                      <select
                        name='stage'
                        className={`p-1 w-full rounded-full border border-black bg-white text-center  ${formData.stage ? 'text-black': 'text-gray-text '}`}
                        value={formData.stage}
                        onChange={handleChange}>
                        <option value="final">Final</option>
                        <option value="semi-final">Semi final</option>
                        <option value="">No stage</option>
                      </select>
                    </div>
                  </div>
                  <div className='w-full pl-1 mt-2'>
                    <p className='text-sm  text-gray-text'>Remark</p>
                    <input
                      className='p-1 w-full rounded-sm border border-black bg-white text-center'
                      name='remark'
                      type="text"
                      placeholder="Enter event remark"
                      value={formData.remark}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>
                <div className=' pl-2 flex flex-col w-[50%] '>
                  <div className='mt-4'>
                    <p className='text-sm  text-gray-text'>Location Link</p>
                    <input
                      className='p-1 w-full rounded-sm border border-black bg-white text-center'
                      name='location'
                      type="text"
                      placeholder="Enter event location link"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='p-1  '>
                    <p className='text-sm  text-gray-text'>map</p>
                    <div className='rounded-sm border border-black bg-white w-full min-h-40 overflow-hidden'>
                      <iframe src={formData.location}
                        className='w-full min-h-40 bg-gray-component'></iframe>
                    </div>
                  </div>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-center'>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
            <Button color="gray" onClick={handleSubmit} className='border-2 hover:border-blue-500 hover:bg-Blue-100'>
              Create Event
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
};

export default AddEventModal;
