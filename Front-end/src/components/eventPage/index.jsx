import React from 'react'
import Content from './components/content';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import { useLocation } from 'react-router-dom';

function Index() {
    const location = useLocation();
    const event = location.state?.selectedEvent;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setDisplay('event'));
        console.log('index', event)
    }, [dispatch]);
    return (
        <>
            <div className="index-body">
                <blank className='w-[20%]'/>
                <div className='w-[80%]'>
                    <Content event = { event }/>
                </div>
            </div>
        </>
    )
}

export default Index