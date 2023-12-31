/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userSelector } from "../store/UserSlice";
import { Link } from "react-router-dom";

const Navbar = ({handleOpenSidebar}) => {
  const [showInfo,setShowInfo] = useState(false);
  const handleOpenInfo = () => {
    setShowInfo(!showInfo);
  }  
  const dispatch = useDispatch();
    const [currentUserInfo,setCurrentUserInfo] = useState([])
      const { isFetchingCurrentUser, currentUser } = useSelector(
        userSelector
    );
    useEffect(() => {
        if (currentUser && !isFetchingCurrentUser) {            
            setCurrentUserInfo(currentUser);
        }
    },[currentUser,isFetchingCurrentUser])
      useEffect(() => {
        dispatch(getCurrentUser());
    },[dispatch])    
    const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  return (
   <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
  <div className="px-3 py-3 lg:px-5 lg:pl-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-start">
        <button onClick={()=>handleOpenSidebar()} data-drawer-target="logo-sidebar"  aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>
          <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
          <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Equipment distribution system</span>
        </a>
      </div>
      <div className="flex items-center">
          <div className="flex relative items-center ml-3">
            <div>
              <button onClick={()=>handleOpenInfo()} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
              </button>
            </div>
            {
              showInfo && <div className="z-50 top-4 right-0 absolute my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow" id="dropdown-user">
              <div className="px-4 py-3" >
                {/* <p className="text-sm text-gray-900 whitespace-nowrap" >
                  {`${currentUserInfo?.firstName} ${currentUserInfo?.lastName}`}
                </p> */}
                <p className="text-sm font-medium text-gray-900 truncate" >
                  {currentUserInfo?.email}
                </p>
              </div>
              <ul className="py-1" >                
                
                <li>
                  <Link to="/employees" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Employees</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
                </li>
              </ul>
            </div>
            }
            
          </div>
        </div>
    </div>
  </div>
</nav>

  )
}

export default Navbar