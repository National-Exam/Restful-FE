import { useState } from "react";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VehicleComponent from "../components/VehicleComponent";

const VehiclePage = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <>
     <Navbar handleOpenSidebar={handleOpenSidebar} />
     <Sidebar sidebarOpen={sidebarOpen} handleOpenSidebar={handleOpenSidebar} />
     <VehicleComponent />
    </>
  )
}

export default VehiclePage