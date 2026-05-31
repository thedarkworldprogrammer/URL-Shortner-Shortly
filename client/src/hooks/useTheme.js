import { useEffect, useState } from "react";

const THEME_KEY = "shortly-theme";

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
