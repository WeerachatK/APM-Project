// add-modal.jsx
import React, { useEffect, useState } from 'react';
import { Button, Modal, Carousel } from 'flowbite-react';
import { fetchSports } from '../../../redux/slices/sportSlice';
import { useSelector, useDispatch } from 'react-redux';
import { capitalizeFirstLetter } from '../../date_time_format'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addEvent } from '../../../redux/actionCreator/addEvent';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import {
  discusThrowIcon,
  hammerThrowIcon,
  highJumpIcon,
  hurdlingIcon,
  javelinThrowingIcon,
  sprintRunningIcon,
  longJumpIcon,
  poleVaultIcon,
  raceWalkingIcon,
  relayRunningIcon,
  shotPutIcon,
  tripleJumpIcon
} from '../../../assets/icon/iconIndex';



const AddEventModal = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ


    const formData = new FormData(event.target);
    const eventData = {
      event_name: formData.get('event_name'),
      event_class: formData.get('event_class'),
      event_date_time: formData.get('event_date_time'),
      event_gender: formData.get('event_gender'),
      status: formData.get(false),
      event_location: formData.get('event_location'),
      sport_id: parseInt(formData.get('sport_id'), 10),
      committee_id: parseInt(formData.get('committee_id'), 10),
      remark: formData.get('remark'),
      event_number: formData.get('event_number'),
      score_format: formData.get('score_format'),
      icon: formData.get('icon')
    };

    dispatch(addEvent(eventData));
    setShowModal(false);
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} z-10 right-3 text-white rounded-full `}
        // style={{ ...style, display: "block", width: '30px', height: '30px' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className}  z-10 left-3 text-white rounded-full w-5 h-5`}
        // style={{ ...style, display: "block", width: '30px', height: '30px' }}
        onClick={onClick}
      />
    );
  }
  const DateTimePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
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
        className='py-1 px-2 w-80 rounded-lg border border-black bg-white'
      />
    );
  };
  const TimePickerComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        // showTimeInput
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className='py-1 px-2 w-80 mt-1 rounded-lg border border-black bg-white'
      />
    );
  };
  const [selectedIcon, setSelectedIcon] = useState('running');
  const [displaySelectedIcon, setDisplaySelectedIcon] = useState('Running');
  const [slider, setSlider] = useState();
  const icons = [
    { component: sprintRunningIcon, value: 'running', alt: 'Running' },
    { component: discusThrowIcon, value: 'discusThrow', alt: 'DiscusThrow' },
    { component: hammerThrowIcon, value: 'hammerThrow', alt: 'HammerThrow' },
    { component: highJumpIcon, value: 'highJump', alt: 'HighJump' },
    { component: hurdlingIcon, value: 'hurdling', alt: 'Hurdling' },
    { component: javelinThrowingIcon, value: 'javelinThrowing', alt: 'Javelin Throwing' },
    { component: longJumpIcon, value: 'longJump', alt: 'Long Jump' },
    { component: poleVaultIcon, value: 'poleVault', alt: 'Pole Vault' },
    { component: raceWalkingIcon, value: 'raceWalking', alt: 'Race Walking' },
    { component: relayRunningIcon, value: 'relayRunning', alt: 'Relay Running' },
    { component: shotPutIcon, value: 'shotPut', alt: 'Shot Put' },
    { component: tripleJumpIcon, value: 'tripleJump', alt: 'Triple Jump' }
  ];
  const settings = {
    afterChange: (current) => setSelectedIcon(icons[current].value),
    // afterChange: (current) => setDisplaySelectedIcon(icons[current].alt),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  const sports = useSelector(state => state.sport.data);

  return (
    <Modal dismissible className=' p-32' show={showModal} onClose={() => setShowModal(false)} size="">
      <form onSubmit={handleSubmit}>
        {/* <Modal.Header>Terms of Service</Modal.Header> */}
        <Modal.Body>
          <div className=''>
            <p className='flex justify-between'>
              <div className='w-[65%]  p-2'>
                <p>Event Name</p>
                <input className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                  name='event_name'
                  type="text"
                  placeholder="Enter event name"
                  required
                >
                </input>
              </div>
              <div className='w-[35%]  p-2'>
                <p>Event Type</p>
                <select name='sport_id' className='py-1 px-2 w-full rounded-lg border border-black bg-white'>
                  <option value="" selected disabled hidden>- Select Event Type -</option>
                  {sports.map(sport => (
                    <option key={sport.id} value={sport.id}>
                      {capitalizeFirstLetter(sport.type)}/{capitalizeFirstLetter(sport.sub_type)}
                    </option>
                  ))}
                </select>
              </div>
            </p>
            <p className='flex justify-evenly'>
              <div className='p-2 w-[35%]'>
                <p>Icon</p>
                <div className='rounded-lg border border-black bg-white w-full object-cover'>
                  <Slider ref={setSlider} {...settings}
                    className=' bg-gray-300 rounded-t-lg'
                  >
                    {icons.map((icon, index) => (
                      <img key={index} src={icon.component} alt={`Icon ${icon.alt}`} className=" h-56 object-contain" />
                    ))}
                  </Slider>
                  {/* <Carousel className='bg-Blue-200' slide={false}>
                  {icons.map((icon, index) => (
                    <div key={index} className="flex justify-center items-center h-full p-3">
                      <img
                        src={icon.component}
                        alt={`Icon ${index}`}
                        className="h-full cursor-pointer"
                        onChange={() => setCurrentIconIndex(index)}
                      />
                    </div>
                  ))}
                </Carousel> */}
                  <div className='w-full flex justify-center'>
                    {displaySelectedIcon}
                  </div>

                </div>
              </div>
              <div className='p-2 w-[90%] '>
                <p>Date & time</p>
                <DatePickerComponent />
                <TimePickerComponent />
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDateTimePicker orientation="landscape" className=' bg-Purple-400' />
              </LocalizationProvider> */}
              </div>
              <div className='p-2 w-full flex flex-col'>
                <div className=''>
                  <p>Event Number</p>
                  <input className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                    name='event_number'
                    type="text"
                    placeholder="Enter event number"
                    required
                  ></input>
                </div>
                <div className='mt-4 flex justify-evenly'>
                  <div className='w-[50%]'>
                    <p>Gender</p>
                    <select name='event_gender' className='py-1 px-2 w-full rounded-lg border border-black bg-white'>
                      <option value="" selected disabled hidden >- Select gender -</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                    </select>
                  </div>
                  <div className='w-[40%]'>
                    <p>Classification</p>
                    <input className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                      name='event_class'
                      type="text"
                      placeholder="Enter event classification"
                      required
                    ></input>
                  </div>
                </div>

                <div className='mt-4'>
                  <p>Location Link</p>
                  <input className='py-1 px-2 w-full rounded-lg border border-black bg-white'
                    name='location'
                    type="text"
                    placeholder="Enter event location link"
                    required
                  ></input>
                </div>
              </div>
            </p>
            <p className='flex bg-red-100 justify-evenly'>
              <div>3.1</div>
              <div>3.2</div>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-center'>
          {/* <Button color="black"  onClick={() => setShowModal(false)}>as</Button> */}
          <Button color="gray" onClick={handleSubmit}>
            Create Event
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddEventModal;
