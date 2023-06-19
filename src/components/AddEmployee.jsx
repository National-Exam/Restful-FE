import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearState, createEmployee, getEmployees, employeeSelector } from "../store/EmployeeSlice";
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  nationalId: yup.string().required(),
  telephone: yup.string().required(),
  email: yup.string().email().required(),
  department: yup.string().required(),
  position: yup.string().required(),
  laptopManufacturer: yup.string().required(),
  laptopModel: yup.string().required(),
  serialNumber: yup.string().required(),
});
const AddEmployee = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
      const dispatch = useDispatch();
    const navigate = useNavigate();    
    const { isCreating, createdSuccess, createdError, createdErrorMessage } = useSelector(
        employeeSelector
    ); 
  
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
                     <div>
                        <label htmlFor="serialNumber" className="block mb-2 text-sm font-medium text-gray-900">Laptop Serial number</label>
                        <input {...register("serialNumber")} type="text" name="serialNumber" id="serialNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="RAC234"/>
                        <p className="text-red-700">{errors.serialNumber?.message}</p>
                        
                    </div> 
                     <div>
                        <label htmlFor="laptopManufacturer" className="block mb-2 text-sm font-medium text-gray-900">Laptop Manufacturer</label>
                        <input {...register("laptopManufacturer")} type="text" name="laptopManufacturer" id="laptopManufacturer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Dell"/>
                        <p className="text-red-700">{errors.laptopManufacturer?.message}</p>
                        
                    </div> 
                     <div>
                        <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900">Employee department</label>
                        <input {...register("department")} type="text" name="department" id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Human resource"/>
                        <p className="text-red-700">{errors.department?.message}</p>                        
                    </div> 
                     <div>
                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900">Employee position</label>
                        <input {...register("position")} type="text" name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Manager"/>
                        <p className="text-red-700">{errors.position?.message}</p>                        
                    </div> 
                     <div>
                        <label htmlFor="laptopModel" className="block mb-2 text-sm font-medium text-gray-900">Laptop Model</label>
                        <input {...register("laptopModel")} type="text" name="laptopModel" id="laptopModel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="New Model"/>
                        <p className="text-red-700">{errors.laptopModel?.message}</p>
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