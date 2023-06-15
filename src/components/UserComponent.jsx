import UserTable from "./UserTable"
const UserComponent = () => {
  return (
    <>    
<div className="p-4 sm:ml-64">
   <div className="p-2 rounded-lg mt-14">
      <div className="grid grid-cols-3 gap-4 mb-4">
         <div className="flex items-center justify-center h-24 rounded bg-gray-100">
            <p className="text-2xl text-gray-400">+</p>
         </div>
         <div className="flex items-center justify-center h-24 rounded bg-gray-100">
            <p className="text-2xl text-gray-400">+</p>
         </div>
         <div className="flex items-center justify-center h-24 rounded bg-gray-100">
            <p className="text-2xl text-gray-400">+</p>
         </div>
      </div>
      <div className="flex items-center p-2 justify-center h-76 mb-4 rounded bg-gray-100">
         <UserTable />
      </div>
     
      <div className="flex items-center justify-center h-64 mb-4 rounded bg-gray-100">
         <p className="text-2xl text-gray-400">+</p>
      </div>
     
   </div>
</div>

    </>
  )
}

export default UserComponent