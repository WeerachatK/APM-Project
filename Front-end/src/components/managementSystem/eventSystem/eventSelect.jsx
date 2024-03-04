import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../../redux/actionCreator/putDataAction';
import ReplyIcon from '@mui/icons-material/Reply';


function checkIfChanged(selectedEvent, formData) {
  const formattedSelectedEventDate = selectedEvent.date_time
    ? format(new Date(selectedEvent.date_time), 'yyyy-MM-dd\'T\'HH:mm')
    : '';

  const fields = ['number', 'name', 'classification', 'gender', 'status', 'location', 'sport_id', 'stage', 'bypoint', 'score_format', 'remark'];
  for (const field of fields) {
    if ((selectedEvent[field] === formData[field]) && (formattedSelectedEventDate === formData.date_time)) {
    } else {
      return true;
    }
  }
}

function EventSelect({ eventSelect, setEventSelect }) {
  const events = useSelector((state) => state.event.data);
  const selectedEvent = events.find(event => event.id === eventSelect);
  const [isOnChange, setIsOnChange] = useState(false);
  const handleBackClick = () => {
    setEventSelect(null);
  };
  const dispatch = useDispatch();
  const dateTimeDisplay = selectedEvent.date_time ? format(new Date(selectedEvent.date_time), 'yyyy-MM-dd\'T\'HH:mm') : '';
  const [formData, setFormData] = useState({
    number: selectedEvent.number,
    name: selectedEvent.name,
    classification: selectedEvent.classification,
    date_time: dateTimeDisplay,
    gender: selectedEvent.gender,
    status: selectedEvent.status,
    location: selectedEvent.location,
    sport_id: selectedEvent.sport_id,
    stage: selectedEvent.stage,
    bypoint: selectedEvent.bypoint,
    score_format: selectedEvent.score_format,
    remark: selectedEvent.remark,
  });
  const formattedDateTime = formData.date_time ? format(formData.date_time, 'yyyy-MM-dd HH:mm') : '';
  useEffect(() => {
    const isChanged = checkIfChanged(selectedEvent, formData);
    console.log(isChanged, selectedEvent, formData)
    setIsOnChange(isChanged);
  }, [selectedEvent, formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'sport_id' ? parseInt(value, 10) : value
    }));
  };
  const handleCancel = (e) => {
    setFormData({
      number: selectedEvent.number,
      name: selectedEvent.name,
      classification: selectedEvent.classification,
      date_time: dateTimeDisplay,
      gender: selectedEvent.gender,
      status: selectedEvent.status,
      location: selectedEvent.location,
      sport_id: selectedEvent.sport_id,
      stage: selectedEvent.stage,
      bypoint: selectedEvent.bypoint,
      score_format: selectedEvent.score_format,
      remark: selectedEvent.remark,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/events/${eventSelect}`;
    const dataToSend = {
      ...formData,
      date_time: formattedDateTime,
    };
    dispatch(putData(apiUrl, dataToSend));
  };
  return (
    <div className='h-full'>
      <button
       className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center mb-3 text-Blue-600`}
        onClick={handleBackClick}>
        <ReplyIcon sx={{ color: '#002880' }} /> <span className='ml-1'>Back</span>
      </button>
      <div className='w-full flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='mt-10 w-[90%] '>
          <div>
            <div className=''>
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
            </div>
          </div>
          <div className=' flex justify-center mt-10'>
            <Button disabled={!isOnChange} color="gray" onClick={handleCancel} className='border-2 border-red-300 hover:border-red-500'>
              Cancel
            </Button>
            <Button disabled={!isOnChange} color="gray" onClick={handleSubmit} className='border-2 border-blue-300 hover:border-blue-500 hover:bg-Blue-100 ml-4 px-3'>
              Save
            </Button>
          </div>
        </form>
      </div>

    </div>

  )
}

export default EventSelect