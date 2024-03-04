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
    // });
    const initialHeight = competes.score?.height || '';
    const [height, setHeight] = useState(initialHeight);
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
        score: {
          height: height
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
              placeholder="point"
              required
            ></input>
          </div>
          <div className='px-1 w-[20%]'>
            <p>Rank</p>
            <input className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'
              name='rank'
              type="text"
              placeholder="rank"
              required
            ></input>
          </div>
          <div className='w-[20%] px-1'>
            <p>Medal</p>
            <select required
              name='medal'
              className='py-1 px-2 w-full rounded-lg border border-black bg-white text-center'>
              <option value="" hidden>medal</option>
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
              pattern="\d{2}:\d{2}\.\d{2}" // Regex pattern สำหรับ MM:SS.ss
              title="Format: MM:SS.ss"
              placeholder="MM:SS.ss"
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