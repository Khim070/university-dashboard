import React from 'react';
import HomeAllSection from './Home/HomeAllSection';
import AboutAllSection from './About/AboutAllSection';
import { useLocation } from 'react-router-dom';

const KhmerContent = ({ content }) => {
    const location = useLocation();
    return (
        <>
            {location.pathname === '/home' && <HomeAllSection content={content} />}
            {location.pathname === '/about' && <AboutAllSection content={content} />}
        </>
    );
}

export default KhmerContent