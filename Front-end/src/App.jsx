import React from 'react';
import IndexHomePage from './components/homePage/index';
import IndexSchedulePage from './components/competitionPage/index';
import IndexEventPage from './components/eventPage/index';
import IndexLoginPage from './components/login/index';
import IndexManageProfile from './components/manageProfilePage/index'
// import IndexUserDropDown from './components/userDropDown/index';
// import IndexUserCenter from './components/userCenter/index';
import Root from './routes/root';
import { Routes, Route } from "react-router-dom";
import './App.css'
function App() {
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
      </Routes>
    </>
  )
}
export default App
