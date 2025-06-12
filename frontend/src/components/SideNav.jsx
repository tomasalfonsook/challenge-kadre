import React from "react";
import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <aside className="menu p-4 w-80 bg-base-200 text-base-content">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Challenge</h2>
        <h4 className="font-bold text-primary">By Tomas Alfonso</h4>
      </div>

      <ul className="menu w-full mt-4">
        <li>
          <NavLink to="/viajes" className={({ isActive }) => isActive ? "text-primary" : ""}>
            Viajes
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuarios" className={({ isActive }) => isActive ? "text-primary" : ""}>
            Usuarios
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
