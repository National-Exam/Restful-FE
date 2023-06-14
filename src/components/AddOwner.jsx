import { useDispatch, useSelector } from "react-redux";
import { clearState, createUser, getUsers, userSelector } from "../store/UserSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  nationalId: yup.string().max(16).min(16).required("National id is required"),
  phone: yup.string(),
  address: yup.string()
});
const AddOwner = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
      const dispatch = useDispatch();
    const navigate = useNavigate();    
    const { isCreating, createdSuccess, createdError, createdErrorMessage } = useSelector(
        userSelector
    ); 
  
  const onSubmit = (data) =>{         
     dispatch(createUser(data));
    reset();
}
 useEffect(() => {  
        if (createdError) {                 
            toast.error(createdErrorMessage);
            dispatch(clearState());
        }

        if (createdSuccess) {
            dispatch(getUsers());
            dispatch(clearState());            
            toast.success("User created successfully")          
        }
    }, [dispatch, createdErrorMessage, createdError, createdSuccess, navigate]);
  return (
    <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">Create owner</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">Firstname</label>
                        <input {...register("firstName")} type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="firstname" required/>
                        <p className="text-red-700">{errors.firstName?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Lastname</label>
                        <input  {...register("lastName")} type="text" name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="lastname" required/>
                        <p className="text-red-700">{errors.lastName?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">phone</label>
                        <input  {...register("phone")} type="text" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0788888888" required/>
                        <p className="text-red-700">{errors.phone?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="nationalId" className="block mb-2 text-sm font-medium text-gray-900">National Id</label>
                        <input  {...register("nationalId")} type="text" name="nationalId" id="nationalId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1200312345678901" required/>
                        <p className="text-red-700">{errors.nationalId?.message}</p>
                    </div>  
                     <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">address</label>
                        <input {...register("address")} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Kigali" required/>
                        <p className="text-red-700">{errors.address?.message}</p>
                    </div> 

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        
                         {
                  isCreating ? <span className="ml-3">Creating...</span> : 'Create owner'
                }
                        </button>                   
                </form>
            </div>
  )
}

export default AddOwner