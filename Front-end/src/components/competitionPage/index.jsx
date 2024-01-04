import React from 'react'
import Content from './components/content';
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import "./index.css"
function Index() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setDisplay('competition'));
    }, [dispatch]);

    return (
        <>
            <div className="index-body">
                <blank className='w-[20%]'/>
                <div className='content-container'>
                    <Content />
                </div>
            </div>
        </>
    )
}
export default Index