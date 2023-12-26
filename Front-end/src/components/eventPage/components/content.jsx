import React from 'react'
import StartList from './startList'
import Result from './result'
import { useSelector} from 'react-redux';
import "./content.css"


function Content() {
    const eventDisplay = useSelector(state => state.eventDisplay);
    return (
       <>
       {eventDisplay === 'start-list' && <StartList/>}
       {eventDisplay === 'result' && <Result/>}
       {/* {eventDisplay === 'official' && <StartList/>} */}
       </>
    )
}

export default Content