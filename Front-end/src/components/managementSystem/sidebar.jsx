import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSystemDisplay } from '../../redux/slices/systemDisplaySlice';
import { Link } from 'react-router-dom';


const SelectButton = ({ text, value, dispatch, display, onClick }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex pl-16 my-3 py-1 
      ${display === value ? ('border-l-4 border-Blue-600 bg-sky-x-gradient  text-Blue-600 font-semibold') : ('text-gray-text hover:text-Blue-600  hover:font-semibold')}`}>
      <p className={``}>{text}</p>
    </button>
  )
}

function Sidebar() {
  const dispatch = useDispatch();
  const systemDisplay = useSelector(state => state.systemDisplay);
  const handleClick = (value) => {
    dispatch(setSystemDisplay(value));
  };
  return (
    <div className='flex flex-col justify-between fixed bg-gray-component left-0 w-[20%] h-screen-nav pt-3'>
      <div className='bg-white  border border-gray-text h-full'>
        <div className='p-8 w-full h-full flex flex-col'>
          <p className=' text-Blue-600 font-semibold border-b border-Blue-600'>Management system</p>
          <div className='pl-7 w-full '>
            <SelectButton text="Event" value="event" dispatch={dispatch} display={systemDisplay} onClick={handleClick} />
            <SelectButton text="Result" value="result" dispatch={dispatch} display={systemDisplay} onClick={handleClick} />
            <SelectButton text="Athlete" value="athlete" dispatch={dispatch} display={systemDisplay} onClick={handleClick} />
            {/* <SelectButton text="News" value="news" dispatch={dispatch} display={systemDisplay} onClick={handleClick} /> */}
          </div>
          <div className='ml-7 w-[80%] h-full border-t border-gray-text  p-2'>
            <Link to="/login" className=''>
              <p className=' text-Blue-600 text-center text-sm p-1 border-Blue-600 rounded-full hover:font-semibold hover:border'>
                Log out
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar 