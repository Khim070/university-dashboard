import React from 'react';
import HomeAllSection from './Home/HomeAllSection';
import AboutAllSection from './About/AboutAllSection';
import { useLocation } from 'react-router-dom';

const KhmerContent = () => {
    const location = useLocation();
  return (
    <>
        {location.pathname === '/home' && <HomeAllSection/>}
        {location.pathname === '/about' && <AboutAllSection/>}
    </>
  )
}

export default KhmerContent