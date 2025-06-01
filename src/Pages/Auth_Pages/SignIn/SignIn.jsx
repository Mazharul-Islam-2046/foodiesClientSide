import { useContext } from "react";
import { useForm } from "react-hook-form";
import {AuthContext} from "../../../providers/AuthProvider/AuthContext.js"
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate()

  const { userLogin, googleSignIn } = useContext(AuthContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      await userLogin(data); // Remove unused 'user' variable
      reset();
      onClose();
      navigate(location?.state ? location.state : '/')
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn(); // Remove unused 'user' variable
      onClose();
      navigate(location?.state ? location.state : '/')
    } catch (error) {
      console.error("Error with Google sign in:", error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="bg-[#F8F9FA] rounded-xl border border-[#E9E9E9] shadow-lg">
          <div className="px-8 pt-10 pb-8 md:px-14 md:pt-14 md:pb-12">
            <div className="space-y-2 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Welcome Back!
              </h2>
              <p className="text-lg text-gray-700">
                Log in and continue your journey with us.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#1ABC9C] 
                    disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#1ABC9C] 
                    disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    }`}
                  {...register("password", { required: "Password is required" })}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 mt-4 font-medium text-white text-base bg-[#1ABC9C] hover:bg-[#16A085] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full px-4 py-3 font-medium text-white text-base bg-gray-800 hover:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5 mr-2"
              >
                <path fill="#EA4335" d="M24 9.5c3.7 0 6.6 1.6 8.6 3.2l6.4-6.4C34.7 3.5 29.9 1 24 1 14.6 1 6.8 6.8 2.9 14l7.3 5.7C11.7 14.7 17.3 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3.3-2.5 6.2-5.4 8.1l7.8 6C43.4 36 46.1 30.1 46.1 24.5z"></path>
                <path fill="#FBBC05" d="M10.2 28.1c-1.2-3.3-1.2-6.9 0-10.2l-7.3-5.7C1.1 17.1 0 20.3 0 24s1.1 6.9 2.9 9.8l7.3-5.7z"></path>
                <path fill="#34A853" d="M24 47c6.5 0 12-2.1 16.1-5.7l-7.8-6C30.6 38.2 27.5 39 24 39c-6.7 0-12.3-4.5-14.3-10.7l-7.3 5.7C6.8 41.2 14.6 47 24 47z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className="px-8 py-6 border-t border-gray-200 text-center rounded-b-xl bg-gray-50">
            <p className="text-sm text-gray-600">
              {`Don't have an account?`}{" "}
              <Link to={"/register"} className="text-[#1ABC9C] hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
