import React from 'react';
import Slider from "./Slider";
import Department from "./Department/Department";
import Academics from "./Academics/Academics";
import Research from "./Research/Research";
import Faculty from "./Faculty/Faculty";
import EventsNews from "./EventsNews/EventsNews";

const HomeAllSection = ({ content }) => {
  return (
    <>
        <Slider content={content.sliders} />
        <Department content={content.departments} />
        <Academics content={content.academics} />
        <Research />
        <Faculty />
        <EventsNews />
    </>
  );
};

export default HomeAllSection;