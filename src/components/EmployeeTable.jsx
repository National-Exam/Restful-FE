import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "./TableHeader";
import { getEmployees, employeeSelector } from "../store/EmployeeSlice";
import AddEmployee from "./AddEmployee";

const EmployeeTable = () => {
    const [showAdd,setShowAdd] = useState(false);
    const handleShowAdd = () => {
        setShowAdd(!showAdd);
    } 
    const fields = ["First Name", "Last Name", "National Id", "telephone", "email", "department", "position", "Laptop Manufacturer", "Laptop Model", "Serial Number"];
    const dispatch = useDispatch();
    const [employeesData,setEmployees] = useState([])
      const { isFetching, createdSuccess, employees } = useSelector(
        employeeSelector
    );
    useEffect(() => {
        if (employees && employees?.employeesData?.length > 0 && !isFetching) {            
            setEmployees(employees.employeesData);
        }
    },[employees,isFetching])        
    useEffect(() => {
        if(createdSuccess)
         handleShowAdd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[createdSuccess])
    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [pages,setPages] = useState([])
    console.log(employees, 'the employees')
    
    useEffect(() => {
        dispatch(getEmployees({page,limit:10}));
        setTotalPages(employees.totalPages);
        let newArray = Array.from({ length: totalPages }, (value, index) => index);
        setPages(newArray)
    },[dispatch, employees.totalPages, page, totalPages])
    
  return (
    <div className="relative w-full p-3 overflow-x-auto sm:rounded-lg">
      <div className="pb-4 flex justify-between items-center">
        
        <div>
            <button onClick={()=>handleShowAdd()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex items-center mr-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
</svg>
  Add employee
</button>
{
    showAdd && (
<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed flex justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="fixed inset-0 bg-black bg-opacity-50"></div>
    <Modal handleShow={handleShowAdd} >
        <AddEmployee />
    </Modal>
</div>
    )
}


        </div>
</div>

      <table className="w-full text-sm text-left text-gray-500">
       <TableHeader fields={fields} />
        <tbody>
            {
                employeesData?.map(employee=>{
                    return (
<tr key={employee._id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {employee.firstName}
            </th>
            <td className="px-6 py-4">{employee.lastName}</td>
            <td className="px-6 py-4">{employee.nationalId ?? '--'}</td>
            <td className="px-6 py-4">{employee.telephone}</td>
            <td className="px-6 py-4">{employee.email}</td>
            <td className="px-6 py-4">{employee?.department?.name}</td>           
            <td className="px-6 py-4">{employee.position}</td>           
            <td className="px-6 py-4">{employee?.laptop?.laptopManufacturer}</td>           
            <td className="px-6 py-4">{employee?.laptop?.laptopModel}</td>           
            <td className="px-6 py-4">{employee?.laptop?.serialNumber}</td>           
          </tr> 
                    )
                })
            }
                 
        </tbody>
      </table>
      <nav className="mt-6" aria-label="Page navigation">
  <ul className="inline-flex -space-x-px">
   
    
    <li>
      <button disabled={page < 2} onClick={()=>setPage(page-1)} className="px-3 rounded-l-lg py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">Previous</button>
    </li>
    {
      pages.map(page=> (
        <li key={page}>
      <button onClick={()=>setPage(page)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{page}</button>
    </li>
      ))
    }
    <li>
      <button disabled={(page == totalPages || employees.totalCount < 10)} onClick={()=>setPage(page+1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
    </li>
  </ul>
</nav>

    </div>
  );
}

export default EmployeeTable;
