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
import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



function AddEventModal3() {
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
  const handleDateChange = (date) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      date_time: date
    }));
  };

  const handleSubmit = (e) => {
    setOpenModal(false);
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `http://localhost:3001/api/events`;
    const dataToSend = {
      ...formData,
      date_time: formattedDateTime,
    };
    const formDataString = `
    Number: ${formData.number}
    Name: ${formData.name}
    Classification: ${formData.classification}
    Date and Time: ${formData.date_time}
    Gender: ${formData.gender}
    Status: ${formData.status}
    Location: ${formData.location}
    Sport ID: ${formData.sport_id}
    Stage: ${formData.stage}
    Bypoint: ${formData.bypoint}
    Score Format: ${formData.score_format}
    Remark: ${formData.remark}
  `;
    // alert(formDataString);
    // alert(formattedDateTime);
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
          className='w-full h-full py-3 text-xl px-2 font-medium rounded-lg border border-black bg-white text-center'
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
        className='w-full h-full py-4 px-2  rounded-lg border border-black bg-white text-center'
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
        className='w-[95%] h-full py-4 px-2 rounded-lg border border-black bg-white text-center'
      />
    );
  };
  // const sports = useSelector(state => state.sport.data);

  return (
    <>
      <Button className=' bg-Blue-100 p-2 ' onClick={() => setOpenModal(true)}>
        Event {openModal === false ? 'false' : 'true'}
      </Button>
      <Modal className='p-32' show={openModal} onClose={() => setOpenModal(false)} size="">
        <form onSubmit={handleSubmit}>
          <Modal.Header>Create New Event {openModal === false ? 'false' : 'true'}</Modal.Header>
          <Modal.Body>
            <div className=''>
              <div className='flex justify-between'>
                <div className=''>
                  <p>Number</p>
                  <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
                    name='number'
                    type="text"
                    placeholder="Enter event number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
                <div className='w-[65%] pl-2'>
                  <p>Event Name</p>
                  <input
                    className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                    name='name'
                    type="text"
                    placeholder="Enter event name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='w-[35%] pl-2'>
                  <p>Type</p>
                  <select required
                    name='sport_id'
                    value={formData.sport_id}
                    className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
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
                      <p>Gender</p>
                      <select required
                        name='gender'
                        value={formData.gender}
                        className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
                        onChange={handleChange}>
                        <option value="" hidden>- Select Gender -</option>
                        <option value="M">Men</option>
                        <option value="W">Women</option>
                        <option value="X">Mixed</option>
                      </select>
                    </div>
                    <div className='w-full pl-1'>
                      <p>Classification</p>
                      <input
                        className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
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
                      <p>Score Type</p>
                      <select
                        required
                        name='score_format'
                        className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
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
                      <p>Date & time</p>
                      <input
                        type="datetime-local"
                        name="date_time"
                        value={formData.date_time}
                        onChange={handleChange}
                        placeholder="date_time"
                        className="py-2 px-2 w-full rounded-lg border border-black bg-white text-center text-xl"
                      />
                      {/* <TimePickerComponent /> */}
                      {/* <div className='w-full flex items-center'>
                      <DateTimePickerComponent />
                    </div> */}
                    </div>
                  </div>

                  <div className='w-full flex justify-evenly mt-6'>
                    <div className='w-full pr-1'>
                      <p>Status</p>
                      <select
                        name='status'
                        className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
                        value={formData.status}
                        onChange={handleChange}>
                        <option value="start-list">Start list</option>
                        <option value="live">Live</option>
                        <option value="result">Result</option>
                      </select>
                    </div>
                    <div className='w-full pl-1'>
                      <p>Stage</p>
                      <select
                        name='stage'
                        className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
                        value={formData.stage}
                        onChange={handleChange}>
                        <option value="final">Final</option>
                        <option value="semi-final">Semi final</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className=' pl-2 flex flex-col w-[50%] '>
                  <div className='mt-4'>
                    <p>Location Link</p>
                    <input
                      className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                      name='location'
                      type="text"
                      placeholder="Enter event location link"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='py-1 px-2  '>
                    <p>map</p>
                    <div className='rounded-lg border border-black bg-white w-full min-h-40 overflow-hidden'>
                      <iframe src={formData.location}
                        className='w-full min-h-40 bg-gray-component'></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <p className='flex bg-red-100 justify-evenly'>
                <div>3.1</div>
                <div>3.2</div>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-center'>
            {/* <Button color="black"  onClick={() => setOpenModal(false)}>as</Button> */}
            <Button color="gray" onClick={handleSubmit}>
              Create Event
            </Button>
            <Button color="gray" onClick={setOpenModal(false)}>
              Decline
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>

  )
};

export default AddEventModal3;
