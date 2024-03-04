import React, { useEffect, useState } from 'react';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { setRefreshEventId } from '../../../redux/slices/refreshEventIdSlice';
import { useSelector, useDispatch } from 'react-redux';
import { putData } from '../../../redux/actionCreator/putDataAction';
import ReplyIcon from '@mui/icons-material/Reply';
import axios from 'axios';
import ResultList from './resultList';
function EventSelect({ eventSelect, setEventSelect }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRefreshEventId(eventSelect.id));
    dispatch(fetchEventById(eventSelect.id));
  }, [dispatch, eventSelect]);
  const [sortBy, setSortBy] = useState('id');
  const sortButtons = [
    { label: 'ID', value: "id" },
    { label: "Rank", value: "rank" },
    // { label: "Afternoon", value: "afternoon" },
  ];
  const competesById = useSelector(state => state.fetchEventById?.data) || [];
  const sortedCompetes = React.useMemo(() => {
    return [...competesById].sort((a, b) => {
      if (sortBy === 'id') {
        return a.id - b.id;
      } else if (sortBy === 'point') {
        return a.point - b.point;
      }
    });
  }, [sortBy, competesById]);
  const handleBackClick = () => {
    setEventSelect(null);
  };
  // const handleSortClick = (e) => {
  //   setSortBy(e.target);
  // };

  const handleAcceptClick = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/events/${eventSelect.id}`;
    const dataToSend = {
      status: 'result',
    };
    dispatch(putData(apiUrl, dataToSend));
  };

  const handleCalPointClick = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    let updatesWithPoints = await Promise.all(competesById?.map(async (competes) => {
      let apiUrl;
      function convertTimeToFloat(timeString) {
        // ตรวจสอบว่า timeString เป็น string และมีค่า
        if (typeof timeString !== 'string' || !timeString) return parseFloat(timeString) || null;

        const parts = timeString.split(':');

        if (parts.length === 2) {
          const minutes = parseFloat(parts[0]);
          const seconds = parseFloat(parts[1]);
          return minutes * 60 + seconds;
        } else {
          return parseFloat(timeString);
        }
      }
      const numberClass = competes.classification.substring(competes.classification.length - 2);
      const scores = Array.isArray(competes.score) ? competes.score : [];
      const validScores = scores.filter(s => s.mark === 1)
      const formData = {
        score:
          eventSelect.score_format === "time" ? convertTimeToFloat(competes.score?.time) :
            eventSelect.score_format === "height" ? competes.score?.height :
              Math.max(...validScores.map(s => s.distance) || [0]),
        gender: competes.gender,
        class: eventSelect.sport_id === 1 ? `T${numberClass}` : `F${numberClass}`,
        event: eventSelect.name.trim()
      };
      if (eventSelect.score_format === "distance" || eventSelect.score_format === "height") {
        apiUrl = `${API_URL}/calculatePoints/field`;
      } else if (eventSelect.score_format === "time") {
        apiUrl = `${API_URL}/calculatePoints/track`;
      }
      if (apiUrl) {
        try {
          console.log('sport_id: ', eventSelect.sport_id);
          console.log('formData: ', formData);
          const response = await axios.post(apiUrl, formData);
          setSortBy('rank');
          return {
            ...competes,
            point: response.data.point,
          };
        } catch (error) {
          console.error("Error calculating points: ", error.response ? error.response.data : error.message);
          return competes;
        }
      } else {
        return competes;
      }
    }));

    updatesWithPoints.sort((a, b) => b.point - a.point);

    let currentRank = 1;
    let prevPoint = updatesWithPoints[0]?.point;
    const updatesWithRankAndMedal = updatesWithPoints.map((competes, index) => {

      if (competes.point === null || competes.point === 0) {
        return {
          ...competes,
          rank: 0,
          medal: 0,
        };
      }

      if (competes.point !== prevPoint) {
        currentRank = index + 1;
        prevPoint = competes.point;
      }
      let medal = 0;
      if (currentRank === 1) medal = 1;
      else if (currentRank === 2) medal = 2;
      else if (currentRank === 3) medal = 3;

      return {
        ...competes,
        rank: currentRank,
        medal: medal,
      };
    });

    updatesWithRankAndMedal.forEach(async (updatedCompetes) => {
      const putApiUrl = `${API_URL}/competitions/${updatedCompetes.id}`;
      try {
        await dispatch(putData(putApiUrl, updatedCompetes, eventSelect.id));
        // อาจมีการจัดการ response หรือ state อัปเดตที่นี่
      } catch (error) {
        console.error("Error updating rank/medal: ", error.response ? error.response.data : error.message);
      }
    });

  };


  return (
    <>
      {/* <div>{eventSelect.id}</div> */}
      <div className='flex justify-between'>
        <button
          className={`px-3 py-1 border rounded-full mx-1 bg-Blue-200 border-Blue-700 hover:bg-Blue-100 hover:border-Blue-500 
        flex justify-center items-center  text-Blue-600`}
          onClick={handleBackClick}>
          <ReplyIcon sx={{ color: '#002880' }} /><span className='ml-1'>Back</span>
        </button>
        <div className='flex'>
          <button
            className={`px-3 py-1 border rounded-full mx-1 bg-yellow-200 border-yellow-300   hover:bg-yellow-100 hover:border-orange-500
        flex justify-center items-center  text-orange-500  shadow-shadow-base `}
            onClick={handleCalPointClick}>
            {/* <AddCircleIcon sx={{ color: '#002880' }} />  */}
            <span className='ml-1'>Calculate Point</span>
          </button >
          <button
            className={`px-3 py-1 border rounded-full mx-1 bg-green-200 border-green-400   hover:bg-green-100 hover:border-green-700
        flex justify-center items-center  text-green-700 shadow-shadow-base `}
            onClick={handleAcceptClick}>
            {/* <AddCircleIcon sx={{ color: '#002880' }} />  */}
            <span className='ml-1'>Accept and public</span>
          </button >
        </div>

      </div>

      {/* <div>
              {sortButtons.map((btn) => (
                <button
                key={btn.value}
                onClick={(e) => setSortBy(e.target.value)}
                value={btn.value}
                className='bg-blue-700 text-white p-3 mx-4'
              >
                {btn.label}
              </button>
                // <FilterButton
                //   key={btn.value}
                //   label={btn.label}
                //   value={btn.value}
                //   selectedValue={filterTime}
                //   onClick={handleSortClick}
                // />
              ))}
      </div> */}
      {/* <button
        onClick={handleCalPointClick}
        className='bg-blue-700 text-white p-3 mx-4'
      >
        Ranked
      </button> */}
      {console.log('sortBy', sortBy)}
      <ResultList eventSelect={eventSelect} competesById={sortedCompetes} />

    </>

  )
}

export default EventSelect