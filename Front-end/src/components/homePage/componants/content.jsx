import React from 'react'

function content() {
  return (
    <>
       <body className='flex flex-col h-full justify-evenly bg-Blue-300'>
                <div className='bg-white  h-full flex justify-center items-center'>
                    <img className='h-72 p-4' src={CoverImg} alt='Thai Para Cover image'/>
                </div>
                <div className=' bg-yellow h-full'>2</div>
                <div className='h-full'>
                    {/* <SlideShow /> */}3
                </div>
                <div className='bg-Purple-400 h-full'>4</div>
            </body>
    </>
  )
}

export default content