import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple, User, CheckCircle, Sparkles } from "lucide-react";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup form submitted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md relative z-10">


        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12  rounded-2xl mb-4 shadow-lg">
              <Logo />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Splitaire</h2>
            <p className="text-gray-600">Create your account and start splitting bills effortlessly</p>
          </div>

          {/* Form */}
          <div className="px-8 pb-8 space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Jon Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    placeholder="jon.smith@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-gray-900 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white focus:outline-none transition-all text-gray-900 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-3 py-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <button type="button" className="text-emerald-600 font-semibold hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-emerald-600 font-semibold hover:underline">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">Or sign up with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all font-semibold text-gray-700 group"
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <Chrome className="w-4 h-4 text-red-500" />
                </div>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all font-semibold text-gray-700 group"
              >
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <Apple className="w-4 h-4 text-white" />
                </div>
                <span>Apple</span>
              </button>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-4 pb-2">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                onClick={()=>navigate('/login')}
                  type="button"
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <CheckCircle className="w-6 h-6 text-white mx-auto mb-1" />
            <p className="text-white text-xs font-semibold">Free Forever</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <CheckCircle className="w-6 h-6 text-white mx-auto mb-1" />
            <p className="text-white text-xs font-semibold">No Credit Card</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <CheckCircle className="w-6 h-6 text-white mx-auto mb-1" />
            <p className="text-white text-xs font-semibold">Instant Setup</p>
          </div>
        </div>
      </div>
    </div>
  );
}