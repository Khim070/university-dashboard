import React from 'react';
import HomeAllSection from './Home/HomeAllSection';
import { useLocation } from 'react-router-dom';
import AboutAllSection from './About/AboutAllSection';

const EnglishContent = () => {
    const location = useLocation();
  return (
    <>
        {location.pathname === '/home' && <HomeAllSection/>}
        {location.pathname === '/about' && <AboutAllSection/>}
    </>
  )
}

export default EnglishContent