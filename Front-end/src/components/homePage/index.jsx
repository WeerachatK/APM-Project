import React from 'react'
import SlideShow from './componants/sliderShow';
import Content from './componants/content'
import { useDispatch } from 'react-redux';
import { setDisplay } from '../../redux/slices/displaySlice';
import CoverImg from '../../assets/images/cover_img.png';
import SubMenu from './componants/subMenu';


function Index() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(setDisplay('home'));
    }, [dispatch]);
    return (
        <>
            <body className='flex flex-col h-full justify-evenly'>
                <div className='bg-white  h-full flex justify-center items-center'>
                    <img className='h-72 p-4' src={CoverImg} alt='Thai Para Cover image' />
                </div>
                <div className=' bg-yellow h-full'>
                    <SlideShow />
                </div>
                <div className='h-full mt-6'>
                    <SubMenu/>
                </div>
                {/* <div className='bg-Purple-400 h-full'>4</div> */}
            </body>
        </>
    )
}
export default Index
