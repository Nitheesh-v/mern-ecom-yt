import React from 'react'
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Link } from "react-router-dom";

export const Shoplayout = () => {
  return (
    <div>
        <Header/>
        <main><Outlet/></main>


     
    </div>
  )
}
