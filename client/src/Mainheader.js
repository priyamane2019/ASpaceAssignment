import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'




const Mainheader = () => {
  return (
    <>
      <Header />
      <Outlet />

    </>
  )
}

export default Mainheader


