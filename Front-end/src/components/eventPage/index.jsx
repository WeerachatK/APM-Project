import React from 'react'
import Content from './componants/content';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';

function Index() {
    
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setDisplay('event'));
    }, [dispatch]);
    return (
        <>
            <div className="index-body">
                <blank className='w-[20%]'/>
                <div className='content-container'>
                    <Content/>
                </div>
            </div>
        </>
    )
}

export default Index