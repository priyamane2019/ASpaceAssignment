import React from 'react'
import {NavLink} from "react-router-dom";

const Error = () => {
  return (
    <div className="container-error">
      <div className="subcontainer-error">
        <h1> WE ARE SORRY, PAGE NOT FOUND! </h1>
     <button className='errorbtn'> <NavLink to="/">BACK TO HOMEPAGE</NavLink></button>  
      </div>
    </div>
  )
}

export default Error