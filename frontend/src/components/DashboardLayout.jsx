import React from "react";
import SideNav from "../components/SideNav";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <SideNav />
      </div>

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="p-6 bg-base-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
