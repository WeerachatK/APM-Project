import React from 'react'
import StartList from './startList'
import Result from './result'
import { useSelector} from 'react-redux';
import "./content.css"


function Content({ event }) {
    const eventDisplay = useSelector(state => state.eventDisplay);
    return (
       <>
       {eventDisplay === 'start-list' && <StartList event = { event }/>}
       {eventDisplay === 'result' && <Result event = { event }/>}
       {/* {eventDisplay === 'official' && <StartList/>} */}
       </>
    )
}

export default Content