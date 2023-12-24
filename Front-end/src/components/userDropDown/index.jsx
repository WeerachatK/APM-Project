import React from 'react'
import UserDropDown from './component/userDropDown';

function Index( {handleClick} ) {
    return (
        <>
        <UserDropDown handleClick = {handleClick}/>
        </>
    )
}

export default Index