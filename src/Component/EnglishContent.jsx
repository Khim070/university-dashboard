import React from 'react';
import HomeAllSection from './Home/HomeAllSection';
import { useLocation } from 'react-router-dom';
import AboutAllSection from './About/AboutAllSection';

const EnglishContent = ({ content }) => {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/home' && <HomeAllSection content={content} />}
            {location.pathname === '/about' && <AboutAllSection content={content} />}
        </>
    );
};

export default EnglishContent;