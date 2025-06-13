
import { TruckIcon } from '@heroicons/react/24/outline';

import { NavLink } from "react-router-dom";

export default function SideNav() {
  return (
    <aside className="menu p-4 w-80 bg-base-200 text-base-content h-full">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Challenge</h2>
        <h4 className="font-bold text-primary">By Tomas Alfonso</h4>
      </div>

      <ul className="menu w-full mt-4">
        <li>
          <NavLink
            to="/viajes"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            <div className="flex items-center gap-2 p-2">
<TruckIcon className="h-6 w-6" />
              <h4 className="text-lg ">Viajes</h4>
            </div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
