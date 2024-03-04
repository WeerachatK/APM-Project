import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import IndexHomePage from './components/homePage/index';
import IndexSchedulePage from './components/competitionPage/index';
import IndexEventPage from './components/eventPage/index';
import IndexLoginPage from './components/login/index';
import IndexManageProfile from './components/manageProfilePage/index';
import IndexManagementSystem from './components/managementSystem/index';
import IndexAthlete from './components/athletePage/index'
import AthleteInfo from './components/athletePage/athleteInfo'
import { useAuth } from './components/login/components/useAuth';
import { setRole } from './redux/slices/roleSlice';
import { useSelector, useDispatch } from 'react-redux';
// import IndexUserDropDown from './components/userDropDown/index';
// import IndexUserCenter from './components/userCenter/index';
import Root from './routes/root';
import { Routes, Route } from "react-router-dom";
import './App.css'
function App() {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const role = useSelector(state => state.role);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setRole(decoded.role));
    }
  }, [token]);
  return (
    <>
      <Root />
      <Routes>
      <Route path="/" element={<IndexHomePage />} />
      {/* <Route path="/userdropdown" element={<IndexUserDropDown/>} /> */}
      <Route path="/profile" element={<IndexManageProfile/>} />
      <Route path="/competition" element={<IndexSchedulePage />} />
      <Route path="/competition/event" element={<IndexEventPage />} />
      <Route path="/login" element={<IndexLoginPage />} /> 
      <Route path="/athlete" element={<IndexAthlete />} /> 
      <Route path="/athlete/information" element={<AthleteInfo />} /> 
      {role === "admin" && (
          <Route path="/management" element={<IndexManagementSystem />} /> 
      )}
       <Route path="/management" element={<IndexManagementSystem />} /> 
      </Routes>
    </>
  )
}
export default App
