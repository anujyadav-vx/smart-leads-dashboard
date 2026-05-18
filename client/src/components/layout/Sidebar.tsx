import {
  LayoutDashboard,
  LogOut,
  Moon,
  Sun
} from "lucide-react";

import {
  Link,
  useLocation
} from "react-router-dom";

import {
  useAuth
} from "../../store/AuthContext";

interface SidebarProps {

  darkMode: boolean;

  toggleDarkMode: () => void;
}

const Sidebar = ({
  darkMode,
  toggleDarkMode
}: SidebarProps) => {

  const location =
    useLocation();

  const { logout } =
    useAuth();

  return (

    <aside
      className="
      w-64
      min-h-screen
      bg-white
      dark:bg-gray-900
      border-r
      dark:border-gray-800
      flex
      flex-col
      justify-between
      p-6
    "
    >

      <div>

        <h1
          className="
          text-2xl
          font-bold
          mb-10
          text-black
          dark:text-white
        "
        >
          Smart Leads
        </h1>

        <nav
          className="
          flex
          flex-col
          gap-3
        "
        >

          <Link
            to="/dashboard"
            className={`
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              transition
              ${
                location.pathname ===
                "/dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              }
            `}
          >

            <LayoutDashboard
              size={20}
            />

            Dashboard

          </Link>

        </nav>

      </div>

      <div
        className="
        flex
        flex-col
        gap-3
      "
      >

        <button
          onClick={toggleDarkMode}
          className="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-lg
          hover:bg-gray-100
          dark:hover:bg-gray-800
          text-gray-700
          dark:text-gray-200
        "
        >

          {
            darkMode
              ? <Sun size={20} />
              : <Moon size={20} />
          }

          {
            darkMode
              ? "Light Mode"
              : "Dark Mode"
          }

        </button>

        <button
          onClick={logout}
          className="
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-lg
          hover:bg-red-100
          text-red-500
        "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;