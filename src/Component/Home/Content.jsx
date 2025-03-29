import React, { useContext } from "react";
import Header from "../Header";
import Language from "../Language";
import { LanguageContext } from "../../Context/LanguageContext"; // Import Language Context

const Content = () => {
  const { content, selectedLanguage } = useContext(LanguageContext); // Get language-specific content

  return (
    <div className="w-full page-wrapper overflow-hidden">
      <Header />
      {/* Pass content dynamically to Language component */}
      <Language content={content[selectedLanguage]} />
    </div>
  );
};

export default Content;