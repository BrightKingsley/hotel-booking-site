import { createContext, useEffect, useState } from "react";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  color: string;
  setColor?: React.Dispatch<React.SetStateAction<string>>;
  saveColorTheme: Function;
};

const ThemeContext = createContext<ThemeContextType>({
  color: "",
  saveColorTheme: () => {},
});

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  //NOTE
  // const [color, setColor] = useState("#4f46e5");
  const [color, setColor] = useState("#fff");

  useEffect(() => {
    const savedColor = localStorage.getItem("themeColor");
    document.documentElement.style.setProperty("--primary", savedColor);
    setColor(savedColor!);
  }, [color]);

  const saveColorTheme = (selectedColor: string) => {
    setColor(selectedColor);
    localStorage.setItem("themeColor", selectedColor);
  };

  return (
    <ThemeContext.Provider value={{ color, saveColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
