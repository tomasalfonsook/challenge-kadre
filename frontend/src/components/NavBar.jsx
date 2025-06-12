import React from "react";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/viajes": "Viajes",
  "/usuarios": "Usuarios",
  "/": "Panel de control",
};

export default function Navbar() {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";

  return (
    <div className="w-full navbar bg-base-100 shadow-md px-4">
      <div className="flex-none lg:hidden">
        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <span className="text-xl font-bold">{title}</span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pravatar.cc/300" alt="avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li><a>Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
