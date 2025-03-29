import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Store separate data for English and Khmer
  const [content, setContent] = useState({
    english: {
      sliders: [],
      departments: [],
      academics: [],
    },
    khmer: {
      sliders: [],
      departments: [],
      academics: [],
    },
  });

  // Store selected language separately
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  return (
    <LanguageContext.Provider value={{ content, setContent, selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};