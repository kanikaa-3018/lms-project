import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex -mt-16">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link
            to="dashboard"
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              location.pathname === "/dashboard"
                ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="course"
            className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
              location.pathname === "/course"
                ? "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
