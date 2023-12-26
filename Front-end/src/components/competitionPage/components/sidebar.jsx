import React from 'react'
import "./filter.css"
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/slices/filterSlice';
import { setSportFilter, selectSportFilter } from '../../../redux/slices/sportFilterSlice';
function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectSportFilter);

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
      <div
        className={`sport-item ${filter === 'Track Events' && 'sport-item-active'}`}
        onClick={() => handleFilterClick('Track Events')}
      >
        Track Events
      </div>
      <div
        className={`sport-item ${filter === 'Road Races' && 'sport-item-active'}`}
        onClick={() => handleFilterClick('Road Races')}
      >
        Road Races
      </div>
      <div
        className={`sport-item ${filter === 'Field Events' && 'sport-item-active'}`}
        onClick={() => handleFilterClick('Field Events')}
      >
        Field Events
      </div>
          {/* <a className={`sport-item ${filter === 'The Sprints' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>The Sprints</a>
          <a className={`sport-item ${filter === 'Combined Competitions' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>Combined Competitions</a>
          <a className={`sport-item ${filter === 'Cross-Country Races' && 'sport-item-active'}`} href="" onClick={handleFilterClick}>Cross-Country Races</a> */}
        </div>
        <div v className='map-container'>
          <div className="map-image">
            {/* <img src="https://www.google.com/maps/d/thumbnail?mid=1IiSZmA46ha-bnHijm9cdN-kwVwI&hl=en_US" alt="Description" className="object-cover w-full h-full" /> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.7830320328017!2d100.43658159678957!3d13.852058400000017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b0f7bff3665%3A0x3a00557b9f0e2d47!2sNonthaburi%20Stadium!5e0!3m2!1sth!2sth!4v1698325079922!5m2!1sth!2sth" width="100%" height="300"></iframe>
          </div>
          <div className='map-text'>
            <div className='map-location'>Nonthaburi Stadium</div>
            <div className='map-subscrib' >67/90 Bang Len Soi 15, Bang Len Subdistrict, Bang Yai District, Nonthaburi 11000</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter