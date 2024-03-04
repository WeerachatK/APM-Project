import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Routes, Route } from "react-router-dom";
import runningImg from '../././../../assets/images/runningLogo.svg';
import GLogin from './googleLogin';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from './useAuth';
import { setRole } from '../../../redux/slices/roleSlice';
import { Link } from 'react-router-dom';
// import runningImg from '../../../assets/images/'
import './login.css'
function LoginPage() {
  const dispatch = useDispatch();
  const role = useSelector(state => state.role);
  const { isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      const decoded = jwtDecode(data.token); 
      alert(`Login successful\nUsername: ${decoded.username}\nRole: ${decoded.role}`);
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    dispatch(setRole(''));
    logout();
  };

  return (
    <>
      <div className=" h-screen-nav flex items-center justify-center bg-blue-gradient overflow-hidden relative">
        <img className='h-full absolute top-0 left-0'
          src={runningImg} alt="Web logo Athletics Program Management" />
        <div className='Blank'></div>
        <section onSubmit={handleLogin} className='LoginMenu flex flex-col justify-center items-center w-[611px] absolute right-[0px] '>
          <div className='UserLogin flex flex-col items-center'>

            {isAuthenticated ? (
              <button onClick={handleLogout} className='ButtonFilter text-white mt-4'>
                Logout
              </button>
            ) : (
              <form onSubmit={handleLogin} className='UserLogin flex flex-col items-center'>
                <label className='text-shadow text-[40px] font-[900]'>
                  User Login
                </label>
                <line className='w-[170px] h-[5px] bg-[#fff] mt-[18px]' />
                <line className='w-[70px] h-[3px] bg-[#fff] mt-[13px]' />
                <div className='Textfield'>
                  <div className='Name relative'>
                    <div class="IconPerson w-[76px] h-[71px] bg-white rounded-full flex items-center justify-center absolute mt-[51px]">
                      <svg width="41" height="47" viewBox="0 0 41 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3915 23.3046C26.8276 23.3046 32.0438 18.0884 32.0438 11.6523C32.0438 5.21623 26.8276 0 20.3915 0C13.9555 0 8.73923 5.21623 8.73923 11.6523C8.73923 18.0884 13.9555 23.3046 20.3915 23.3046ZM28.5481 26.2177H27.0279C25.0069 27.1462 22.7584 27.6742 20.3915 27.6742C18.0247 27.6742 15.7852 27.1462 13.7552 26.2177H12.2349C5.48022 26.2177 0 31.6979 0 38.4526V42.2396C0 44.652 1.95722 46.6092 4.36961 46.6092H36.4134C38.8258 46.6092 40.7831 44.652 40.7831 42.2396V38.4526C40.7831 31.6979 35.3028 26.2177 28.5481 26.2177Z" fill="black" />
                      </svg>
                    </div>
                    <div className='Input flex flex-col ml-[60px]'>
                      <label className='ml-[30px] mb-[1px] mt-[40px] text-white'>Name - Last name</label>
                      <input
                        class="w-[345px] h-[40px] bg-white text-gray-500 italic placeholder-gray-500 pl-[30px] rounded-md"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                  </div>
                  <div className='Password relative'>
                    <div class="IconLock w-[76px] h-[71px] bg-white rounded-full flex items-center justify-center absolute mt-[37px]">
                      <svg width="35" height="40"
                        viewBox="0 0 35 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.859 17.281H29.0074V11.7264C29.0074 5.26146 23.746 0 17.281 0C10.8161 0 5.55462 5.26146 5.55462 11.7264V17.281H3.70308C1.65867 17.281 0 18.9397 0 20.9841V35.7964C0 37.8408 1.65867 39.4995 3.70308 39.4995H30.859C32.9034 39.4995 34.562 37.8408 34.562 35.7964V20.9841C34.562 18.9397 32.9034 17.281 30.859 17.281ZM22.8356 17.281H11.7264V11.7264C11.7264 8.66366 14.2183 6.17179 17.281 6.17179C20.3438 6.17179 22.8356 8.66366 22.8356 11.7264V17.281Z" fill="black" />
                      </svg>
                    </div>
                    <div className='Input flex flex-col ml-[60px]'>
                      <label className='ml-[30px] mb-[1px] mt-[26px] text-white'>Password</label>
                      <input
                        class="w-[345px] h-[40px] bg-white text-gray-500 italic placeholder-gray-500 pl-[30px] rounded-md"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                  </div>
                </div>
                <line className='w-[470px] h-[3px] bg-[#fff] mt-[54px]' />
                <button type="submit" className='ButtonFilter text-white mt-4'>
                  Login
                </button>
              </form>
            )
            }
          </div>
        </section>

      </div>
    </>
  )
}
export default LoginPage