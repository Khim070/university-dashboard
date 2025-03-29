import React, { useContext } from 'react';
import Aside from '../Component/Home/Aside';
import Content from '../Component/Home/Content';
import { LanguageContext } from '../Context/LanguageContext'; // Import Language Context

const Home = () => {
  const { content, selectedLanguage } = useContext(LanguageContext); // Get selected language data

  return (
    <div className='bg-white'>
      <div id="main-wrapper" className="flex">
        <Aside />
        {/* Pass content dynamically based on selected language */}
        <Content content={content[selectedLanguage]} />
      </div>
    </div>
  );
}

export default Home;