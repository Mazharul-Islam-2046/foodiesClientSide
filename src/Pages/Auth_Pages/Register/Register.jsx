import { useContext } from "react";
import { useForm } from "react-hook-form";
import {AuthContext} from "../../../providers/AuthProvider/AuthContext.js"

const Register = ({ isOpen, onClose, onSwitchToSignIn }) => {
  const { userRegister } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      await userRegister(data);
      reset();
      onClose();
      onSwitchToSignIn(); // Switch to sign in after successful registration
    } catch (error) {
      console.error("Error submitting form:", error.message);
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
                Welcome to Our Community!
              </h2>
              <p className="text-lg text-gray-700">
                Sign up and start your journey with us.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="block font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#1ABC9C] 
                    disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                  {...register("name", { required: "Name is required" })}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: {
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) || "Must contain an uppercase letter",
                      hasLowercase: (value) =>
                        /[a-z]/.test(value) || "Must contain a lowercase letter",
                      hasNumber: (value) =>
                        /[0-9]/.test(value) || "Must contain a number",
                      hasSpecialChar: (value) =>
                        /[^A-Za-z0-9]/.test(value) || "Must contain a special character",
                    },
                  })}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block font-medium text-gray-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+1 234 567 8900"
                  className={`w-full px-4 py-2.5 rounded-lg border bg-white 
                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#1ABC9C] 
                    disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    }`}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[\d\s-]{10,}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 mt-4 font-medium text-white text-base bg-[#1ABC9C] hover:bg-[#16A085] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1ABC9C] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>
          </div>
          <div className="px-8 py-6 border-t border-gray-200 text-center rounded-b-xl bg-gray-50">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => {
                  onClose();
                  onSwitchToSignIn();
                }} 
                className="text-[#1ABC9C] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
