import { useState } from "react";
import DashboardComponent from "../components/Dashboard"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Dashboard = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <>
     <Navbar handleOpenSidebar={handleOpenSidebar} />
     <Sidebar sidebarOpen={sidebarOpen} handleOpenSidebar={handleOpenSidebar} />
     <DashboardComponent />
    </>
  )
}

export default Dashboard