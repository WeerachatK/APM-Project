
// Import the necessary React library
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/loginPage';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
// Define a functional component named App
function Index() {
  const dispatch = useDispatch();
  React.useEffect(() => {
      dispatch(setDisplay('login'));
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path='/' element={
          <nav><Login/></nav>
        } />
      </Routes>

    </>
  )
}

export default Index;


