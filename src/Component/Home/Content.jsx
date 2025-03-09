import React from "react";
import logout from "../image/log-out.png";
import Header from "../Header";
import Slider from "./Slider";
import Department from "./Department/Department";
import Academics from "./Academics/Academics";
import Research from "./Research/Research";
import Faculty from "./Faculty/Faculty";
import EventsNews from "./EventsNews/EventsNews";
import Language from "../Language";

const Content = () => {
  return (
    <div class=" w-full page-wrapper overflow-hidden">
      <Header />
      <Language/>
    </div>
  );
};

export default Content;
