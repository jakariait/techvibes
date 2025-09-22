// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import themeConfig from "../config/themeConfig";
import useUserProfileStore from "../store/useUserProfileStore.jsx";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { profile } = useUserProfileStore();

  const [themeName, setThemeName] = useState("dark");
  const [theme, setTheme] = useState(themeConfig.dark);

  useEffect(() => {
    const newThemeName = profile?.themeAccessLevel;
    if (newThemeName && themeConfig[newThemeName]) {
      setThemeName(newThemeName);
      setTheme(themeConfig[newThemeName]);
    } else {
      // Fallback to a default theme if the one from profile is not valid
      setThemeName("dark");
      setTheme(themeConfig.dark);
    }
  }, [profile?.themeAccessLevel]);

  return (
    <ThemeContext.Provider value={{ themeName, theme, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
