/* eslint-disable react/prop-types */
const navigation = [
  {
    link: "/users",
    icon: <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>,
    text: "Owners",
    badge: null,
  },
  {
    link: "/vehicles",
    icon: <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
    text: "Vehicles",
    badge: null,
  },  
];
const Sidebar = ({sidebarOpen}) => {
  return (
   <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${!sidebarOpen && '-translate-x-full'}  bg-white border-r border-gray-200 sm:translate-x-0`} aria-label="Sidebar">
   <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
      <ul className="space-y-2 font-medium">
        {
            navigation.map((item,index) => {
                  return (
                     <li key={index}>
                           <a href={item.link} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">                              
                                 {item.icon}                              
                              <span className="ml-3">{item.text}</span>
                            {item.badge && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">{item.badge}</span>}
                           </a>
                     </li>
                  )
            })
        }       
      </ul>
   </div>
</aside>

  )
}

export default Sidebar