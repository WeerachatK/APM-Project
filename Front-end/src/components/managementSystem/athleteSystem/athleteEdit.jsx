import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../../redux/actionCreator/putDataAction';
import ReplyIcon from '@mui/icons-material/Reply';


function checkIfChanged(selectedAthlete, formData) {
  const formattedSelectedBirthDate = selectedAthlete.date_of_birth
    ? format(new Date(selectedAthlete.date_of_birth), 'yyyy-MM-dd')
    : '';
    const formattedFormBirthDate = formData.date_of_birth
    ? format(new Date(formData.date_of_birth), 'yyyy-MM-dd')
    : '';
    
  const fields = ['email', 'first_name', 'last_name', 'profile_pic', 'country',
    'bib', 'gender', 'phone_number', 'classification', 'remark'];
    console.log("Date :" + formattedSelectedBirthDate + " | " + formattedFormBirthDate);
    const checkDate = formattedSelectedBirthDate === formattedFormBirthDate;
  for (const field of fields) {
    if ((selectedAthlete[field] === formData[field]) && (checkDate)) {
      // return false;
    } else {
      return true;
    }
  }
}
function AthleteEdit({ athleteSelect, setAthleteSelect }) {
  const athletes = useSelector((state) => state.athlete.data);
  const selectedAthlete = athletes.find(athlete => athlete.id === athleteSelect);
  const [isOnChange, setIsOnChange] = useState(false);
  const handleBackClick = () => {
    setAthleteSelect(null);
  };
  const dispatch = useDispatch();
  const dateTimeDisplay = selectedAthlete.date_of_birth ? format(new Date(selectedAthlete.date_of_birth), 'yyyy-MM-dd') : '';
  const [formData, setFormData] = useState({
    email: selectedAthlete.email,
    first_name: selectedAthlete.first_name,
    last_name: selectedAthlete.last_name,
    profile_pic: selectedAthlete.profile_pic,
    country: selectedAthlete.country,
    bib: selectedAthlete.bib,
    gender: selectedAthlete.gender,
    date_of_birth: dateTimeDisplay,
    phone_number: selectedAthlete.phone_number,
    classification: selectedAthlete.classification,
    remark: selectedAthlete.remark,
  });

  useEffect(() => {
    const isChanged = checkIfChanged(selectedAthlete, formData);
    setIsOnChange(isChanged);
  }, [selectedAthlete, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleCancel = (e) => {
    setFormData({
      email: selectedAthlete.email,
      first_name: selectedAthlete.first_name,
      last_name: selectedAthlete.last_name,
      profile_pic: selectedAthlete.profile_pic,
      country: selectedAthlete.country,
      bib: selectedAthlete.bib,
      gender: selectedAthlete.gender,
      date_of_birth: dateTimeDisplay,
      phone_number: selectedAthlete.phone_number,
      classification: selectedAthlete.classification,
      remark: selectedAthlete.remark,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/athletes/${athleteSelect}}`;
    dispatch(putData(apiUrl, formData));
  };
  return (
    <>
      <button
       className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center mb-3 text-Blue-600`}
        onClick={handleBackClick}>
        <ReplyIcon sx={{ color: '#002880' }} /><span className='ml-1'>Back</span>
      </button>
      <form onSubmit={handleSubmit} className='mt-10'>
      <div className='flex items-center justify-center w-full'>
                            <div className='w-full flex items-center justify-center '>
                                <div className=' w-[80%]'>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Email</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full '>
                                        <p className='text-sm  text-gray-text'>First Name</p>
                                        <input className=' p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Last Name</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Gender</p>
                                        <select required
                                            name='gender'
                                            value={formData.gender}
                                            className={`p-1 w-full rounded-sm border border-black bg-white text-center  ${formData.gender ? 'text-black' : 'text-gray-text '}`}
                                            onChange={handleChange}>
                                            <option value="" hidden>- Select Gender -</option>
                                            <option value="M">Men</option>
                                            <option value="W">Women</option>
                                            <option value="X">Mixed</option>
                                        </select>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Date of Birth</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="date" name="date_of_birth" value={formData.date_of_birth}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex items-center justify-center '>
                                <div className=' w-[80%]'>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Country</p>
                                        <select required
                                            name="country" value={formData.country}
                                            className={`p-1 w-full rounded-sm border border-black bg-white text-center  ${formData.gender ? 'text-black' : 'text-gray-text '}`}
                                            onChange={handleChange}>
                                            <option value="" hidden>- Select Country -</option>
                                            <option value="M">Men</option>
                                            <option value="W">Women</option>
                                            <option value="X">Mixed</option>
                                        </select>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>BIB</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="bib" value={formData.bib} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Phone Number</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="phone_number" value={formData.phone_number}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Classification</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="classification" value={formData.classification}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Remark</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Enter event number"
                                            type="text" name="remark" value={formData.remark}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>

        <div className='flex justify-center mt-10'>
          <Button disabled={!isOnChange} color="gray" onClick={handleCancel} className='border-2 border-red-300 hover:border-red-500'>
            Cancel
          </Button>
          <Button type="submit" disabled={!isOnChange} color="gray" className='border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-100 ml-4 px-3'>
            Save
          </Button>
        </div>
      </form>

    </>
  )
}

export default AthleteEdit