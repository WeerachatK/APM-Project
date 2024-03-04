import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById } from '../../../redux/slices/fetchEventByIdSlice';
import { setRefreshEventId } from '../../../redux/slices/refreshEventIdSlice';
import { putData } from '../../../redux/actionCreator/putDataAction';
import { Button } from 'flowbite-react';


function HeightForm({ event, competes, dispatch }) {
  // const [formData, setFormData] = useState({
  //   athlete_id: '',
  //   event_id: `${event.id}`,
  //   score: '{}',
  //   medal: '',
  //   rank: '',
  //   point: '',
  //   order: `${competes.order}`,
  //   remark: ''
  // })
  const [point, setPoint] = useState(competes.point || 0);
  const [rank, setRank] = useState(competes.rank || 0);
  const [medal, setMedal] = useState(competes.medal || 0);
  const initialHeight = competes.score?.height || '';
  const [height, setHeight] = useState(initialHeight);
  useEffect(() => {
    setPoint(competes.point);
    setRank(competes.rank);
    setMedal(competes.medal);
    setHeight(competes.score?.height);
}, [competes]);
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };
  const handleReset = () => {
    setHeight(competes.score?.height);
  };
  const handleSubmit = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/competitions/${competes.id}`;
    const updatedScore = {
      medal: medal,
      rank: rank,
      point: point,
      score: {
        height: parseFloat(height)
      }
    };
    dispatch(putData(apiUrl, updatedScore, event.id));
  };
  return (
    <div className='p-2'>
      <div className='mb-4 flex w-full'>
        <div className='px-1 w-[20%]'>
          <p>Point</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='point'
            type="text"
            value={point || "No Point"}
            placeholder="point"
            onChange={(e) => setPoint(e.target.value)}
            required
          ></input>
        </div>
        <div className='px-1 w-[20%]'>
          <p>Rank</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='rank'
            type="text"
            placeholder="rank"
            value={(rank == 0 ? "No Rank" : rank) || "No Rank"}
            onChange={(e) => setRank(e.target.value)}
            required
          ></input>
        </div>
        <div className='w-[20%] px-1'>
          <p>Medal</p>
          <select required
            name='medal'
            value={medal}
            onChange={(e) => setMedal(e.target.value)}
            className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'>
            <option value="0" >No Medal</option>
            <option value="1">Gold</option>
            <option value="2">Silver</option>
            <option value="3">Bronze</option>
          </select>
        </div>
      </div>

      <div className='flex w-full mb-2 items-end'>
        <div className='w-[40%]'>
          <label htmlFor="scoreHeight">Score (MM:SS.ss):</label>
          <input
            id="scoreHeight"
            name="scoreHeight"
            type="text"
            pattern="^\d*\.?\d*$"
            title="Only numbers and a decimal point are allowed."
            value={height}
            onChange={handleHeightChange}
            className='py-2 px-2 w-full rounded-lg border text-xl font-bold border-black bg-white text-center'
            required
          />
        </div>
        <Button color="blue"
          className='h-[50%] ml-5 bg-gray-text  '
          onClick={handleSubmit}>Submit</Button>
        <Button color="blue"
          className='h-[50%] ml-5 bg-gray-text  '
          onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
function TimeForm({ event, competes, dispatch, Index}) {
  // const [formData, setFormData] = useState({
  //   athlete_id: '',
  //   event_id: `${event.id}`,
  //   score: '{}',
  //   medal: '',
  //   rank: '',
  //   point: '',
  //   order: `${competes.order}`,
  //   remark: ''
  // });
  const [point, setPoint] = useState(competes.point || 0);
  const [track, setTrack] = useState(competes.order || 0);
  const [rank, setRank] = useState(competes.rank || 0);
  const [medal, setMedal] = useState(competes.medal || 0);
  const initialTime = competes.score?.time || '';
  const [time, setTime] = useState(initialTime);
  useEffect(() => {
    setPoint(competes.point);
    setRank(competes.rank);
    setMedal(competes.medal);
    setTrack(competes.order);
    setTime(competes.score?.time);
}, [competes]);
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  const handleReset = () => {
    setPoint(competes.point);
    setRank(competes.rank);
    setMedal(competes.medal);
    setTrack(competes.order);
    setTime(competes.score?.time);
  };
  const handleSubmit = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const apiUrl = `${API_URL}/competitions/${competes.id}`;
    const updatedScore = {
      medal: medal,
      rank: rank,
      point: point,
      order: track,
      score: {
        time: time
      }
    };
    dispatch(putData(apiUrl, updatedScore, event.id));
    dispatch(fetchEventById(event.id));
  };
  return (
    <div className='p-2'>
      <div className='mb-4 flex w-full'>
      <div className={`px-2 w-[20%] flex items-center rounded-lg border bg-gray-component`}>
          <p className='text-2xl text-gray-text'>Track</p>
          <input className='ml-2 py-0 px-1 w-full rounded-lg border border-black bg-white text-center text-lg '
            name='track'
            type="text"
            value={track || null}
            placeholder="Track"
            onChange={(e) => setTrack(e.target.value)}
            required
          ></input>
        </div>
        <div className='px-1 w-[20%] ml-4'>
          <p>Point</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='point'
            type="text"
            value={point || "No Point"}
            placeholder="point"
            onChange={(e) => setPoint(e.target.value)}
            required
          ></input>
        </div>
        <div className='px-1 w-[20%]'>
          <p>Rank</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='rank'
            type="text"
            placeholder="rank"
            value={(rank == 0 ? "No Rank" : rank) || "No Rank"}
            onChange={(e) => setRank(e.target.value)}
            required
          ></input>
        </div>
        <div className='w-[20%] px-1'>
          <p>Medal</p>
          <select required
            name='medal'
            value={medal}
            onChange={(e) => setMedal(e.target.value)}
            className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'>
            <option value="0" >No Medal</option>
            <option value="1">Gold</option>
            <option value="2">Silver</option>
            <option value="3">Bronze</option>
          </select>
        </div>
      </div>

      <div className='flex w-full mb-2 items-end'>
        <div className='w-[40%]'>
          <label htmlFor="scoreTime">Score (MM:SS.ss):</label>
          <input
            id="scoreTime"
            name="scoreTime"
            type="text"
            pattern="\d{2}:\d{2}\.\d{2}" // Regex pattern สำหรับ MM:SS.ss
            title="Format: MM:SS.ss"
            placeholder="MM:SS.ss"
            value={time}
            onChange={handleTimeChange}
            className='py-2 px-2 w-full rounded-lg border text-xl font-bold border-black bg-white text-center'
            required
          />
        </div>
        <Button color="blue"
          className='h-[50%] ml-5 bg-gray-text  '
          onClick={handleSubmit}>Submit</Button>
        <Button color="blue"
          className='h-[50%] ml-5 bg-gray-text  '
          onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
function Attempt({ attemptNumber, onUpdate, initialData }) {
  const initialStatus = initialData && initialData.mark !== null ? initialData.mark.toString() : "1";
  const initialScore = initialData && initialData.distance !== null ? initialData.distance.toString() : '0';
  const [status, setStatus] = useState(initialStatus);
  const [score, setScore] = useState(initialScore);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onUpdate(attemptNumber, newStatus, score);
  };

  const handleScoreChange = (e) => {
    const newScore = e.target.value;
    setScore(newScore);
    onUpdate(attemptNumber, status, newScore);
  };

  return (
    <div className='flex-col text-center w-[30%] pb-1 mx-2'>
      <div className='bg-gray-component w-full'>Attempt {attemptNumber}</div>
      <div className='flex'>
        <div className='px-1 ml-1 w-[50%]'>
          <p className='text-gray-text text-left'>Status</p>
          <select required
            value={status}
            onChange={handleStatusChange}
            className='py-2 px-2 w-full rounded-lg bg-white text-center'>
            <option value="1">Score</option>
            <option value="0">Foul</option>
          </select>
        </div>
        <div className='px-1 mr-1 w-[50%]'>
          <p className='text-gray-text text-left'>Score</p>
          <input className={`py-1.5 px-2 w-full rounded-lg bg-white text-center text-xl font-bold ${status === "0" && ' font-normal'}`}
            disabled={status === "0"}
            value={score}
            onChange={handleScoreChange}
            type="text"
            pattern="^\d*\.?\d*$"
            title="Only numbers and a decimal point are allowed."
            required
          ></input>
        </div>
      </div>
    </div>
  );
}
function AttemptForm({ event, competes, dispatch, }) {
  const [point, setPoint] = useState(competes.point || 0);
  const [rank, setRank] = useState(competes.rank || 0);
  const [medal, setMedal] = useState(competes.medal || 0);
  const scores = Array.isArray(competes.score) ? competes.score : [];
  const attempts = [1, 2, 3, 4, 5, 6];
  const [attemptData, setAttemptData] = useState({});
  const [resetFlag, setResetFlag] = useState(false);
  const validScores = scores.filter(s => s.mark === 1)
  const [maxDistance, setMaxDistance] = useState(Math.max(...validScores.map(s => s.distance) || [0]));
  useEffect(() => {
    setPoint(competes.point);
    setRank(competes.rank);
    setMedal(competes.medal);
    const newMaxDistance = Math.max(...validScores.map(s => s.distance) || [0]);
    setMaxDistance(newMaxDistance);
}, [competes]);
  const [formData, setFormData] = useState({
    score: '{}',
    medal: competes.medal || 0,
    rank: competes.rank || 0,
    point: competes.point || 0,
    remark: ''
  });
  const handleAttemptUpdate = (attemptNumber, status, score) => {
    const distance = parseFloat(score);
    // const distance = status === "1" ? parseFloat(score) || 0 : 0;
    setAttemptData(prev => ({
      ...prev,
      [attemptNumber]: { mark: parseInt(status, 10), attempt: attemptNumber, distance }
    }));
  };
  const handleReset = () => {
    setAttemptData({});
    setResetFlag(prev => !prev);
  };

  const handleSubmit = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/competitions/${competes.id}`;
    const scoreArray = attempts.map(attemptNumber => {
      const existingAttempt = competes.score.find(attempt => attempt.attempt === attemptNumber);
      // ตรวจสอบและใช้ข้อมูลจาก attemptData ถ้ามีการเปลี่ยนแปลง
      const attemptInfo = attemptData[attemptNumber] ||
        existingAttempt || // ใช้ข้อมูลที่มีอยู่ถ้าไม่มีการเปลี่ยนแปลง
        { mark: 1, distance: 0 }
      return {
        mark: attemptInfo.mark,
        attempt: attemptNumber,
        distance: attemptInfo.distance
      };
    });

    const updatedFormData = {
      ...formData,
      medal: medal,
      rank: rank,
      point: point,
      score: scoreArray
    };
    console.log('putData', apiUrl, updatedFormData)
    dispatch(putData(apiUrl, updatedFormData, event.id));
    dispatch(fetchEventById(event.id));
  };

  return (
    <div className='p-2'>
      <div className='mb-4 flex w-full'>
        <div className='px-1 w-[20%]'>
          <p>Point</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='point'
            type="text"
            value={point}
            placeholder="No Point"
            onChange={(e) => setPoint(e.target.value)}
            required
          ></input>
        </div>
        <div className='px-1 w-[20%]'>
          <p>Rank</p>
          <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
            name='rank'
            type="text"
            placeholder="rank"
            value={(rank == 0 ? "No Rank" : rank) || "No Rank"}
            onChange={(e) => setRank(e.target.value)}
            required
          ></input>
        </div>
        <div className='w-[20%] px-1'>
          <p>Medal</p>
          <select required
            name='medal'
            value={medal}
            onChange={(e) => setMedal(e.target.value)}
            className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'>
            <option value="0" >No Medal</option>
            <option value="1">Gold</option>
            <option value="2">Silver</option>
            <option value="3">Bronze</option>
          </select>
        </div>
      </div>

      <div className='w-full mb-2 items-end'>
        <div className='flex justify-between items-end w-full '>
          <div className='w-full flex flex-wrap'>
            {attempts.map((attemptNumber) => {
              const initialData = scores.find(s => s.attempt === attemptNumber);
              return (
                <Attempt
                  key={`${attemptNumber}-${resetFlag}`}
                  attemptNumber={attemptNumber}
                  onUpdate={handleAttemptUpdate}
                  initialData={initialData}
                />
              );
            })}
          </div>
          <div className='flex-col text-center  w-[30%] pb-1 mx-2'>
            <div className=' bg-Blue-600 text-white    w-full'>Best Score</div>
            <div className='flex'>
              <div className='px-1 mr-1 w-full'>
                <input className='py-2 px-2 mt-2 w-full rounded-lg  bg-white text-center text-xl font-bold'
                  Value={maxDistance}
                  readOnly
                  name='point'
                  type="text"
                  placeholder="point"
                  required
                ></input>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='flex mt-8 w-full justify-end px-2 pb-2'>
        <Button color="gray"
          className='h-[50%] ml-5 bg-gray-component  '
          onClick={handleReset}>Reset</Button>
        <Button color="blue"
          className='h-[50%] ml-5 bg-gray-text  '
          onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  )
}
function ResultList({ eventSelect, competesById }) {
  const dispatch = useDispatch();
  return (
    <>
      {competesById?.map((competes, Index) => (
        <div key={competes.id}
          className=' border border-black my-4'>
          <div className={`flex w-full items-center justify-center text-lg font-bold  px-8 pt-8 pb-4 ${Index % 2 === 0 ? ('bg-Blue-100 border-b border-Blue-200') : ('bg-gray-component border-b')}`}>
            <label className='w-[15%] text-center p-1 text-gray-text rounded-lg border bg-white'>Order : {Index+1}</label>
            <label className='w-[15%] text-center'><p className=' text-sm font-normal text-gray-text'>BIB</p>
              {competes.bib}</label>
            <label className='w-[15%] text-center'><p className=' text-sm font-normal text-gray-text'>Country</p>
              {competes.country}</label>
            <label className='w-[40%] text-center'>
              <label className='mr-2'>{competes.first_name}</label> {competes.last_name}</label>
            <label className='w-[15%] text-center'><p className=' text-sm font-normal text-gray-text'>Gender</p>
              {competes.gender}</label>
            <label className='w-[15%] text-center'><p className=' text-sm font-normal text-gray-text'>Classification</p>
              {eventSelect.sport_id === 1 ? `T${competes.classification.substring(competes.classification.length - 2)}` : `F${competes.classification.substring(competes.classification.length - 2)}`}</label>
          </div>
          <form>
            {eventSelect.score_format === "time" &&
              <TimeForm
                event={eventSelect}
                competes={competes}
                dispatch={dispatch}
                Index={Index}
              />}
            {eventSelect.score_format === "distance" &&
              <AttemptForm
                event={eventSelect}
                competes={competes}
                dispatch={dispatch}
              />}
            {eventSelect.score_format === "height" &&
              <HeightForm
                event={eventSelect}
                competes={competes}
                dispatch={dispatch}
              />}

          </form>
        </div>
      ))}
    </>
  )
}

export default ResultList