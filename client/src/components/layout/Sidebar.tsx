import {
  LayoutDashboard,
  Users,
  LogOut,
  Moon,
  Sun,
  Shield,
  Sparkles,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar = ({ darkMode, toggleDarkMode }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between p-5 transition-colors duration-200 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-1.5">
              SmartLeads
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Enterprise CRM
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xs shadow-indigo-600/30"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
        {/* User Profile Card */}
        {user && (
          <div className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-100 dark:border-gray-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs uppercase">
                {user.name ? user.name.slice(0, 2) : "US"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield size={10} className="text-indigo-500" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
        >
          <span className="flex items-center gap-2.5">
            {darkMode ? (
              <Sun size={16} className="text-amber-400" />
            ) : (
              <Moon size={16} className="text-gray-500" />
            )}
            <span>{darkMode ? "Light Theme" : "Dark Theme"}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {darkMode ? "Dark" : "Light"}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;