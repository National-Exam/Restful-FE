import { Link, useNavigate } from "react-router-dom";
import { clearState, loginSelector, loginUser } from "../store/LoginSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
const schema = yup.object().shape({ 
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8).max(32).required("The password is required"),
});
export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit,reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    loginSelector
  );
  const onSubmit = (data) => {    
    dispatch(loginUser(data));
    reset()
  };


  useEffect(() => {
    if (isError) {      
      toast.error(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      navigate('/employees');
    }
  }, [dispatch, errorMessage, isError, isSuccess, navigate]);
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          Equipment distribution system   
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
                <p className="text-red-700">{errors.email?.message}</p>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                />
                <p className="text-red-700">{errors.password?.message}</p>
              </div>              
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >                
                {isFetching ? 'Loading...' : 'Sign in'}
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
