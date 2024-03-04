import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'flowbite-react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { postData } from '../../../redux/actionCreator/postDataAction';

function AddNewAthlete() {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        profile_pic: '',
        country: '',
        bib: '',
        gender: '',
        date_of_birth: '',
        phone_number: '',
        classification: '',
        remark: '',
    });

    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        setOpenModal(false);
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL;
        const apiUrl = `${API_URL}/athletes`;
        const dataToSend = {
            ...formData,
        };
        dispatch(postData(apiUrl, dataToSend));
        setFormData({
            email: '',
            first_name: '',
            last_name: '',
            profile_pic: '',
            country: '',
            bib: '',
            gender: '',
            date_of_birth: '',
            phone_number: '',
            classification: '',
            remark: '',
        });

    };

    return (
        <>
            <button
                className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center mb-3 text-Blue-600`}
                onClick={() => setOpenModal(true)}>
                <AddCircleIcon sx={{ color: '#002880' }} /> <span className='ml-1'>Create New Athlete</span>
            </button>

            <Modal className=' p-32' show={openModal} onClose={() => setOpenModal(false)} size="">
                <Modal.Header><div
                    className={`px-3 py-1  mx-1  border-Blue-600 text-2xl font-semibold
        flex justify-center items-center mb-3 text-Blue-600`}
                    onClick={() => setOpenModal(true)}>
                    <AddCircleIcon sx={{ color: '#002880' }} /> <span className='ml-1'>Create New Athlete</span>
                </div></Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className='flex items-center justify-center w-full'>
                            <div className='w-full flex items-center justify-center '>
                                <div className=' w-[80%]'>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Email</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Email"
                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full '>
                                        <p className='text-sm  text-gray-text'>First Name</p>
                                        <input className=' p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="First Name"
                                            type="text" name="first_name" value={formData.first_name} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Last Name</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Last Name"
                                            type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Gender</p>
                                        <select required
                                            name='Gender'
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
                                        </select>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>BIB</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="BIB"
                                            type="text" name="bib" value={formData.bib} onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Phone Number</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Phone Number"
                                            type="text" name="phone_number" value={formData.phone_number}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Classification</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Classification"
                                            type="text" name="classification" value={formData.classification}  onChange={handleChange}
                                            required
                                        ></input>
                                    </div>
                                    <div className='w-full mb-2'>
                                        <p className='text-sm  text-gray-text'>Remark</p>
                                        <input className='p-1 w-full rounded-sm border border-black bg-white text-center'
                                            placeholder="Remark"
                                            type="text" name="remark" value={formData.remark}  onChange={handleChange}
                                            required
                                        ></input>
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
}

export default AddNewAthlete;
