import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import Content from './content';
import './index.css';
import NewsSystem from './newsSystem/newsSystem';
import EventSystem from './eventSystem/eventSystem';
import AthleteSystem from './athleteSystem/athleteSystem';
import ResultSystem from './resultSystem/resultSystem';
import { useSelector } from 'react-redux';
import { fetchEvents } from '../../redux/slices/eventSlice';
import { fetchAthletes } from '../../redux/slices/athleteSlice';

function Index() {
  const dispatch = useDispatch();
  const systemDisplay = useSelector(state => state.systemDisplay);
  useEffect(() => {
    dispatch(setDisplay('management'));
    dispatch(fetchEvents());
    dispatch(fetchAthletes());
  }, [dispatch]);



  return (
    <div className="index-body">
      {/* <div className='w-[20%] bg-gray-component h-screen-nav' />  */}
      <div className='ml-[20%] content-container pt-3 pl-3 bg-gray-component h-full'>
        {systemDisplay === "event" && <EventSystem />}
        {systemDisplay === "result" && <ResultSystem />}
        {systemDisplay === "news" && <NewsSystem />}
        {systemDisplay === "athlete" && <AthleteSystem />}
      </div>
    </div>
  );
}

export default Index