import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearState, createEmployee, getEmployees, employeeSelector, getDepartments, getLaptops } from "../store/EmployeeSlice";
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  nationalId: yup.string().required().min(16).max(16),
  telephone: yup.string().required().max(10).min(10).matches(/^\d+$/, 'Telephone must be  numbers'),
  email: yup.string().email().required(),  
  position: yup.string().required(), 
  departmentId: yup.number(),
  laptopId: yup.number()
});
const AddEmployee = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
      const dispatch = useDispatch();
    const navigate = useNavigate();    
    const { isCreating, createdSuccess, createdError, createdErrorMessage,departments,laptops } = useSelector(
        employeeSelector
    ); 
    useEffect(()=>{
            dispatch(getDepartments());
     dispatch(getLaptops());
    },[dispatch])  
  const onSubmit = (data) =>{         
     dispatch(createEmployee(data));
 
    reset();
}
 useEffect(() => {  
        if (createdError) {                 
            toast.error(createdErrorMessage);
            dispatch(clearState());
        }

        if (createdSuccess) {
            dispatch(getEmployees());
            dispatch(clearState());            
            toast.success("Employee created successfully")          
        }
    }, [dispatch, createdErrorMessage, createdError, createdSuccess, navigate]);
  return (
    <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">Create employee</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">Firstname</label>
                        <input {...register("firstName")} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="firstname" required/>
                        <p className="text-red-700">{errors.firstName?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                        <input  {...register("lastName")} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="lastname" required/>
                        <p className="text-red-700">{errors.lastName?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-gray-900">Telephone</label>
                        <input  {...register("telephone")} type="text" name="telephone" id="telephone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0788845600" required/>
                        <p className="text-red-700">{errors.telephone?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">email</label>
                        <input  {...register("email")} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="example@gmail.com"/>
                        <p className="text-red-700">{errors.email?.message}</p>
                    </div>  
                   
                   
                    <div className="my-2">
                        <label htmlFor="departments" className="block mb-2 text-sm font-medium text-gray-900 ">Select a department</label>
<select  {...register("departmentId")} name="departmentId" id="departmentId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
  <option >Choose a department</option>
  {
     departments.map(dep=>{
        return (
            <option  key={dep.name} value={dep.id}>{dep?.name}</option>
        )
     })
  }
</select>

                    </div>
                    <div>
                         <label htmlFor="departments" className="block mb-2 text-sm font-medium text-gray-900 ">Select a laptop</label>
                        <select {...register("laptopId")} name="laptopId" id="laptopId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
  <option >Choose a laptop</option>
  {
     laptops.map(laptop=>{
        return (
            <option  key={laptop.serialNumber} value={laptop.id}>{`${laptop?.laptopModel} ${laptop.laptopManufacturer} ${laptop.serialNumber}` }</option>
        )
     })
  }
</select>
                    </div>
                     <div>
                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Employee position</label>
                        <input {...register("position")} type="text" name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Manager"/>
                        <p className="text-red-700">{errors.position?.message}</p>                        
                    </div>                    
                     <div>
                        <label htmlFor="nationalId" className="block mb-2 text-sm font-medium text-gray-900">National id</label>
                        <input {...register("nationalId")} type="text" name="nationalId" id="nationalId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="12003245678909"/>
                        <p className="text-red-700">{errors.nationalId?.message}</p>
                    </div> 

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        
                         {
                  isCreating ? <span className="ml-3">Creating...</span> : 'Create employee'
                }
                        </button>                   
                </form>
            </div>
  )
}

export default AddEmployee