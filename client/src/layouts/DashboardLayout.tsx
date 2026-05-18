import {
  useEffect,
  useState
} from "react";

import type {
  ReactNode
} from "react";

import Sidebar
from "../components/layout/Sidebar";

interface DashboardLayoutProps {

  children: ReactNode;
}

const DashboardLayout = ({
  children
}: DashboardLayoutProps) => {

  const [
    darkMode,
    setDarkMode
  ] = useState(
    localStorage.getItem("theme")
    === "dark"
  );

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [darkMode]);

  const toggleDarkMode =
    () => {

      setDarkMode(
        (prev) => !prev
      );
    };

  return (

    <div
      className="
      flex
      min-h-screen
      bg-gray-100
      dark:bg-gray-950
      transition
    "
    >

      <Sidebar
        darkMode={darkMode}
        toggleDarkMode={
          toggleDarkMode
        }
      />

      <main
        className="
        flex-1
        p-6
        text-black
        dark:text-white
      "
      >

        {children}

      </main>

    </div>
  );
};

export default DashboardLayout;