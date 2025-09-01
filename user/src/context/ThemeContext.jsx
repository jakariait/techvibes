// src/context/ThemeContext.jsx
import { createContext, useContext, useState } from "react";
import themeConfig from "../config/themeConfig";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Hardcoded default theme for now
  const [themeName, setThemeName] = useState("dark");
  const [theme, setTheme] = useState(themeConfig.gray);

  return (
    <ThemeContext.Provider value={{ themeName, theme, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
