import React from "react";
import logout from "../image/log-out.png";
import Header from "../Header";
import Banner from "./Banner";
import Introduction from "./Introduction/Introduction";
import Innovation from "./Innovation/Innovation";
import Bannertwo from "./BannerTwo/Bannertwo";
import Strategic from "./Strategic/Strategic";
import Faq from "./FAQ/Faq";
import Language from "../Language";

const Content = () => {
  return (
    <div class=" w-full page-wrapper overflow-hidden">
      <Header />
      <Language />
    </div>
  );
};

export default Content;
