import React from 'react'
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import Test from './component/test';

function Index() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setDisplay(''));
    }, [dispatch]);
    return (
        <>
        <Test/>
        </>
    )
}

export default Index