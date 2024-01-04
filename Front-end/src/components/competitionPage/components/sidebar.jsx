import React from 'react'
import "./filter.css"
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/slices/filterSlice';
import { setSportFilter, selectSportFilter } from '../../../redux/slices/sportFilterSlice';
import { fetchEvents } from '../../../redux/slices/eventSlice';
import { fetchSports } from '../../../redux/slices/sportSlice';
function MenuCard({ event, handleFilterClick, sport, filter }) {
  return (
    <>
      <div
        className={`sport-item ${filter === sport.id && 'sport-item-active'}`}
        onClick={() => handleFilterClick(sport.id)}
      >
        {sport.sub_type} Event
      </div>
    </>
  )
}

function SideBarMenu() {
  const dispatch = useDispatch();
  const filter = useSelector(selectSportFilter);

  React.useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchSports());
  }, [dispatch])
  const events = useSelector(state => state.event.data);
  const sports = useSelector(state => state.sport.data);
  // const isLoading = useSelector(state => state.event.loading);
  // const error = useSelector(state => state.event.error);

  const handleFilterClick = (filterValue) => {
    dispatch(setSportFilter(filterValue));
  };
  return (
    <>
      <div className='flex flex-col justify-between fixed bg-[#142E4F] left-0 w-[20%] h-screen-nav'>
        <div className='sport-container'>
          <h1>Sports type</h1>
          <div
            className={`sport-item ${filter === 'All' && 'sport-item-active'}`}
            onClick={() => handleFilterClick('All')}
          >
            All
          </div>
          {sports.map((sport) => (
              <MenuCard 
                key={sport.id} 
                event={events} 
                handleFilterClick={handleFilterClick} 
                sport={sport}
                filter={filter}
            />
          ))}
          {/* แสดง * sports.sub_type */}
          {/* {sports.map(sport => (
            <MenuCard 
                key={sport.id} 
                event={events} 
                handleFilterClick={handleFilterClick} 
                sport={sport}
            />
        ))} */}
          {/* <a className={`sport-item ${filter === 'The Sprints' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>The Sprints</a>
          <a className={`sport-item ${filter === 'Combined Competitions' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>Combined Competitions</a>
          <a className={`sport-item ${filter === 'Cross-Country Races' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>Cross-Country Races</a> */}
        </div>
        <div className='map-container'>
          <div className="map-image">
            {/* <img src="https://www.google.com/maps/d/thumbnail?mid=1IiSZmA46ha-bnHijm9cdN-kwVwI&hl=en_US" alt="Description" className="object-cover w-full h-full" /> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1304.9833736696628!2d102.04968662049286!3d14.927479122976726!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311eb2c1fbbc0131%3A0xbcc4725147c5b872!2z4Liq4LiZ4Liy4Lih4LiB4Li14Lis4Liy4LmA4LiJ4Lil4Li04Lih4Lie4Lij4Liw4LmA4LiB4Li14Lii4Lij4LiV4Li0IDgwIOC4nuC4o-C4o-C4qeC4siA1IOC4mOC4seC4meC4p-C4siAyNTUw!5e1!3m2!1sth!2sth!4v1704254380311!5m2!1sth!2sth" 
            className='w-full h-[20%]'></iframe>
          </div>
          <div className='map-text'>
            <div className='map-location'>80th Birthday Stadium</div>
            <div className='map-subscrib' >Suranari, Mueang Nakhon Ratchasima District, Nakhon Ratchasima 30000</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBarMenu