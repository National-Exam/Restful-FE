import { useEffect, useState } from "react";
import Modal from "./Modal";
import AddOwner from "./AddOwner";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/UserSlice";
import TableHeader from "./TableHeader";
import { vehicleSelector } from "../store/VehicleSlice";

const VehicleTable = () => {
    const [showAdd,setShowAdd] = useState(false);
    const handleShowAdd = () => {
        setShowAdd(!showAdd);
    } 
    const fields = ["Chasis number","Manufacture company","Manufacture year","Price","Vehicle plate number", "Model"];
    const dispatch = useDispatch();
    const [vehiclesData,setVehicles] = useState([])
      const { isFetching, createdSuccess, vehicles } = useSelector(
        vehicleSelector
    );
    useEffect(() => {
        if (vehicles && vehicles.length > 0 && !isFetching) {            
            setVehicles(vehicles);
        }
    },[vehicles,isFetching])    
    useEffect(() => {
        if(createdSuccess)
         handleShowAdd()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[createdSuccess])
    useEffect(() => {
        dispatch(getUsers());
    },[dispatch])
    
  return (
    <div className="relative w-full p-3 overflow-x-auto sm:rounded-lg">
      <div className="pb-4 flex justify-between items-center">
        <div>

  <label htmlFor="table-search" className="sr-only">Search</label>
  <div className="relative mt-1">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
      </svg>
    </div>
    <input
      type="text"
      id="table-search"
      className="block p-2 pl-10 text-sm text-gray-900 bg-white rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-0"
      placeholder="Search vehicles"
    />
  </div>
        </div>
        <div>
            <button onClick={()=>handleShowAdd()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex items-center mr-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
</svg>
  Add vehicle
</button>
{
    showAdd && (
<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed flex justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="fixed inset-0 bg-black bg-opacity-50"></div>
    <Modal handleShowAdd={handleShowAdd} >
        <AddOwner />
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
                vehiclesData?.map(vehicle=>{
                    return (
<tr key={vehicle._id} className="bg-white border-b">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {vehicle.chasisNumber}
            </th>
            <td className="px-6 py-4">{vehicle.mfgCompany}</td>
            <td className="px-6 py-4">{vehicle.mfgYear ?? '--'}</td>
            <td className="px-6 py-4">{vehicle.price}</td>
            <td className="px-6 py-4">{vehicle.plateNumber}</td>
            <td className="px-6 py-4">{vehicle.model}</td>           
          </tr> 
                    )
                })
            }
                 
        </tbody>
      </table>
      <nav className="mt-6" aria-label="Page navigation">
  <ul className="inline-flex -space-x-px">
    <li>
      <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</a>
    </li>
    <li>
      <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
    </li>
  </ul>
</nav>

    </div>
  );
}

export default VehicleTable;
