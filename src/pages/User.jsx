import { useState } from "react";
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import UserComponent from "../components/UserComponent";

const UserPage = () => {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <>
     <Navbar handleOpenSidebar={handleOpenSidebar} />
     <Sidebar sidebarOpen={sidebarOpen} handleOpenSidebar={handleOpenSidebar} />
     <UserComponent />
    </>
  )
}

export default UserPage