import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { clearState, createVehicle, getVehicles, vehicleSelector } from "../store/VehicleSlice";
const schema = yup.object().shape({
  chasisNumber: yup.string().required("Chasis number is required"),
  mfgCompany: yup.string().required("Manufacture company is required"),
  mfgYear: yup.string().required("Manufacture year is required"),
  price: yup.string().required("Price is required"),
  plateNumber: yup.string(),
  model: yup.string().required("Model is required"),
  owner: yup.string().min(16).max(16).required("Owner is required"),
});
const AddVehicle = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
      const dispatch = useDispatch();
    const navigate = useNavigate();    
    const { isCreating, createdSuccess, createdError, createdErrorMessage } = useSelector(
        vehicleSelector
    ); 
  
  const onSubmit = (data) =>{         
     dispatch(createVehicle(data));
    reset();
}
 useEffect(() => {  
        if (createdError) {                 
            toast.error(createdErrorMessage);
            dispatch(clearState());
        }

        if (createdSuccess) {
            dispatch(getVehicles());
            dispatch(clearState());            
            toast.success("Vehicle created successfully")          
        }
    }, [dispatch, createdErrorMessage, createdError, createdSuccess, navigate]);
  return (
    <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900">Create owner</h3>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="chasisNumber" className="block mb-2 text-sm font-medium text-gray-900">Chasis number</label>
                        <input {...register("chasisNumber")} type="text" name="chasisNumber" id="chasisNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="firstname" required/>
                        <p className="text-red-700">{errors.chasisNumber?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="mfgCompany" className="block mb-2 text-sm font-medium text-gray-900">Manufacture company</label>
                        <input  {...register("mfgCompany")} type="text" name="mfgCompany" id="mfgCompany" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="lastname" required/>
                        <p className="text-red-700">{errors.mfgCompany?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="mfgYear" className="block mb-2 text-sm font-medium text-gray-900">Manufacture year</label>
                        <input  {...register("mfgYear")} type="text" name="mfgYear" id="mfgYear" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="2003" required/>
                        <p className="text-red-700">{errors.mfgYear?.message}</p>
                    </div>                                   
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price(RWF)</label>
                        <input  {...register("price")} type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="1000000" required/>
                        <p className="text-red-700">{errors.price?.message}</p>
                    </div>  
                     <div>
                        <label htmlFor="plateNumber" className="block mb-2 text-sm font-medium text-gray-900">Vehicle plate number</label>
                        <input {...register("plateNumber")} type="text" name="plateNumber" id="plateNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="RAC234"/>
                        <p className="text-red-700">{errors.plateNumber?.message}</p>
                        <p className="text-blue-700">If the car is new it will be automatically generated</p>
                    </div> 
                     <div>
                        <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-900">Model</label>
                        <input {...register("model")} type="text" name="model" id="model" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="RAC234"/>
                        <p className="text-red-700">{errors.model?.message}</p>
                    </div> 
                     <div>
                        <label htmlFor="owner" className="block mb-2 text-sm font-medium text-gray-900">Owner national id</label>
                        <input {...register("owner")} type="text" name="owner" id="owner" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="RAC234"/>
                        <p className="text-red-700">{errors.owner?.message}</p>
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

export default AddVehicle