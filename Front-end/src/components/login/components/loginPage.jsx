import React from 'react'
import { Routes, Route } from "react-router-dom";
import runningImg from '../././../../assets/images/runningLogo.svg';
import GLogin from './googleLogin';
// import runningImg from '../../../assets/images/'
import './login.css'
function LoginPage() {
  return (
    <>
      <div className=" h-screen-nav flex items-center justify-center bg-blue-gradient overflow-hidden relative">
        <img className='h-full absolute top-0 left-0'
          src={runningImg} alt="Web logo Athletics Program Management" />
        <div className='Blank'></div>
        <section className='LoginMenu flex flex-col justify-center items-center w-[611px] absolute right-[0px] '>
          <div className='UserLogin flex flex-col items-center'>
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
                    placeholder="Your name ..."
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
                    type="text"
                    placeholder="Your password ..."
                  />
                </div>

              </div>
            </div>
            <line className='w-[470px] h-[3px] bg-[#fff] mt-[54px]' />
            <br />
            <GLogin />
            {/* <div className='GoogleLogin w-full flex justify-end flex-row'>
                <div className='Label flex flex-col items-end mt-[30px] mr-[10px] text-white text-shadow'>
                  <label>Login with</label>
                  <label>Google</label>
                </div>
                <div className='w-[60px] h-[60px]  mt-[16px] flex justify-center items-center box-shadow'>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.06937 15.4813C10.5446 11.0112 14.7455 7.80069 19.7213 7.80069C22.3961 7.80069 24.8121 8.74981 26.7103 10.3029L32.2325 4.78076C28.8674 1.84711 24.5532 0.0351562 19.7213 0.0351562C12.2392 0.0351562 5.79736 4.3035 2.70044 10.5546L9.06937 15.4813Z" fill="#EA4335" />
                    <path d="M26.1131 28.5286C24.3892 29.6418 22.1985 30.2344 19.7212 30.2344C14.7644 30.2344 10.5766 27.0484 9.08627 22.605L2.69629 27.4567C5.78936 33.7188 12.2311 37.9999 19.7212 37.9999C24.3606 37.9999 28.7938 36.3506 32.1138 33.2536L26.1131 28.5286Z" fill="#34A853" />
                    <path d="M32.114 33.2538C35.5861 30.0149 37.8409 25.1927 37.8409 19.0176C37.8409 17.8959 37.6683 16.688 37.4095 15.5663H19.7213V22.9004H29.9028C29.4004 25.3667 28.0519 27.2769 26.1132 28.5287L32.114 33.2538Z" fill="#4A90E2" />
                    <path d="M9.08638 22.605C8.70885 21.4794 8.50442 20.2731 8.50442 19.0175C8.50442 17.7809 8.7027 16.5922 9.06932 15.4813L2.70039 10.5546C1.42951 13.102 0.738892 15.973 0.738892 19.0175C0.738892 22.054 1.44248 24.9182 2.69639 27.4568L9.08638 22.605Z" fill="#FBBC05" />
                  </svg>
                </div>
              </div> */}

          </div>
        </section>

      </div>
    </>
  )
}
export default LoginPage

{/* <div className='PositionText absolute pl-[88px] pt-[210px]'>
<div className='Text flex flex-col'>
  <label class="text-shadow text-[100px] italic font-[900]">
    Athletics
  </label>
  <label class="text-shadow text-[40px] italic font-[900]">
    Program Management
  </label>
</div>
</div> */}