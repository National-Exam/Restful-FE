import EmployeeTable from "./EmployeeTable"

const EmployeeComponent = () => {
  return (
    <>    
<div className="p-4 sm:ml-64">
   <div className="p-2 rounded-lg mt-14">
    
      <div className="flex items-center p-2 justify-center h-76 mb-4 rounded bg-gray-100">
         <EmployeeTable />
      </div>
     
      
     
   </div>
</div>

    </>
  )
}

export default EmployeeComponent