import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './root.css'
import { useSelector } from 'react-redux';
import UserDropdown from '../components/userDropDown/index';
import SideBarMenu from '../components/competitionPage/components/sidebar';
import EventSideBar from '../components/eventPage/components/eventSidebar'
import WebLogo from '../assets/images/Web-Logo2.svg'



function LineHighlight() {
  return (<div className='Line flex flex-col  items-center'>
    <div className='bg-white h-[0.1rem]  w-[8.125rem]  '></div>
    <div className='bg-white h-[0.2rem] w-[10.625rem] mt-1 '></div>
  </div>)
}

function ArrowUp() {
  return (
    <svg width="15" className=' mx-6 ' height="9" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.0607 1.34852C12.4749 0.762733 11.5251 0.762733 10.9393 1.34852L1.3934 10.8945C0.807611 11.4802 0.807611 12.43 1.3934 13.0158C1.97919 13.6016 2.92893 13.6016 3.51472 13.0158L12 4.5305L20.4853 13.0158C21.0711 13.6016 22.0208 13.6016 22.6066 13.0158C23.1924 12.43 23.1924 11.4802 22.6066 10.8945L13.0607 1.34852ZM13.5 3.966V2.40918H10.5V3.966H13.5Z" fill="white" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg width="15" className=' mx-6 ' height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M6.89879 8.53466C7.28931 8.92519 7.92248 8.92519 8.313 8.53466L14.677 2.1707C15.0675 1.78018 15.0675 1.14701 14.677 0.756489C14.2864 0.365965 13.6533 0.365965 13.2628 0.756489L7.6059 6.41334L1.94904 0.756489C1.55852 0.365965 0.925353 0.365965 0.534828 0.756489C0.144304 1.14701 0.144304 1.78018 0.534828 2.1707L6.89879 8.53466ZM6.6059 7.16992V7.82756H8.6059V7.16992H6.6059Z" fill="white" />
    </svg>
  )
}

function Profile({ profileData, onDropdownClick, DropdownOpen }) {
  return (
    <>
      <div className='Profile flex flex-row items-center justify-end bg-while mx-6' onClick={onDropdownClick}>
        <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5462 15.24L17.3296 13.2204C17.0741 12.7702 16.8429 11.9186 16.8429 11.4198V8.3417C16.8429 5.48263 15.164 3.01288 12.7429 1.85708C12.1103 0.737788 10.9423 0.0443115 9.60401 0.0443115C8.27789 0.0443115 7.08564 0.762121 6.453 1.89358C4.08058 3.07371 2.43813 5.51913 2.43813 8.3417V11.4198C2.43813 11.9186 2.20697 12.7702 1.95148 13.2082L0.722691 15.24C0.236041 16.0551 0.126545 16.9554 0.430701 17.7827C0.722691 18.5979 1.41617 19.2305 2.31647 19.5347C4.67672 20.3376 7.15864 20.7269 9.64051 20.7269C12.1224 20.7269 14.6043 20.3376 16.9646 19.5468C17.8162 19.267 18.4732 18.6222 18.7895 17.7827C19.1059 16.9432 19.0207 16.0186 18.5462 15.24Z" fill="#5B72FF" />
          <path d="M13.0589 21.9558C12.548 23.3671 11.1975 24.3769 9.61589 24.3769C8.65476 24.3769 7.70579 23.9875 7.03664 23.2941C6.64732 22.9291 6.35533 22.4424 6.185 21.9436C6.34316 21.9679 6.50132 21.9801 6.67165 22.0044C6.95147 22.0409 7.24347 22.0774 7.53546 22.1018C8.22894 22.1626 8.93458 22.1991 9.64023 22.1991C10.3337 22.1991 11.0272 22.1626 11.7085 22.1018C11.964 22.0774 12.2195 22.0653 12.4628 22.0288C12.6575 22.0044 12.8521 21.9801 13.0589 21.9558Z" fill="#5B72FF" />
        </svg>

        <div class="Image w-10 h-10 mx-6 bg-white rounded-full ">
          <img class='object-cover rounded-full' src={profileData.imageUrl} alt={profileData.name} />
        </div>

        <label className=' text-white ' >{profileData.name}</label>
        {DropdownOpen ? <ArrowUp /> : <ArrowDown />}
        {/* <UserDropdown /> */}
      </div>
    </>

  )
}

function NoLogin() {
  return (
    < Link to="/login" className='h-full flex items-center flex-shrink-0'>
      <div className='rounded-full h-8 w-full bg-[#004CEE] text-[#fff]  items-center justify-center text-center px-6 p-1'>
        Login/ Sign up
      </div>
    </Link>
  )
}

function Root() {
  const profile = useSelector(state => state.profile);
  const display = useSelector(state => state.display);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const handleDropdownClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  return (
    <>
      <nav className='Navbar h-14 bg-[#002880] sticky top-0 px-[24px] flex justify-between z-50'>
        <Link to="/">
          <div className="group flex flex-shrink-0 h-20 w-20">
            <img
              className=" h-20 group-hover:h-28 transition-height duration-300 "
              src={WebLogo}
              alt="Logo"
            />
          </div>
        </Link>
        <div className=' flex flex-row justify-center items-center w-full '>
          <div className='Menu flex flex-row  text-[#fff] mt-2 '>
            <Link to="/" className={`Home MenuBox flex flex-col text-2xl  ${display === 'home' && 'font-bold '}`}>
              Home
              {display === 'home' && <LineHighlight />}
            </Link>
            <Link to="/competition" className={`Competition MenuBox flex flex-col text-2xl  ${(display === 'competition' || display === 'event') && 'font-bold '}`}>
              Competition
              {(display === 'competition' || display === 'event') && <LineHighlight />}
            </Link>
          </div>
        </div>
        {profile ? <Profile profileData={profile} onDropdownClick={handleDropdownClick} DropdownOpen={isUserDropdownOpen} /> : <NoLogin />}
      </nav>
      {isUserDropdownOpen && <UserDropdown handleClick={handleDropdownClick} />}
      {(display === 'competition') && <SideBarMenu />}
      {(display === 'event') && <EventSideBar />}
    </>
  );
}

export default Root;

// {/* <div className=' flex flex-row justify-center items-center w-full bg-orange'>
// <div className='Menu flex flex-row  text-[#fff] bg-Purple-400'>
//   <Link to="/" className={`Home MenuBox flex flex-col text-3xl ${display === 'home' && 'font-bold'}`}>
//     Home
//     {/* {display === 'home' && <LineHighlight />} */}
//   </Link>
//   <Link to="/competition" className={`Competition MenuBox flex flex-col text-3xl  ${(display === 'competition' || display === 'event') && 'font-bold '}`}>
//     Competition
//     {/* {(display === 'competition' || display === 'event') && <LineHighlight />} */}
//   </Link>
// </div>
// </div> */}