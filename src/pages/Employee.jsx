import { useState } from "react";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import EmployeeComponent from "../components/EmployeeComponent";

const EmployeePage = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <>
     <Navbar handleOpenSidebar={handleOpenSidebar} />
     <Sidebar sidebarOpen={sidebarOpen} handleOpenSidebar={handleOpenSidebar} />
     <EmployeeComponent />
    </>
  )
}

export default EmployeePage