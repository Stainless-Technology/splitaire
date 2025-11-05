import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple, User, CheckCircle, AlertCircle } from "lucide-react";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { handlePendingGuestBill, hasPendingGuestBill } from "../../utility/guestBillHandler";
export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    loading
  } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasPendingBill, setHasPendingBill] = useState(false);
  useEffect(() => {
    setHasPendingBill(hasPendingGuestBill());
  }, []);
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ""
      });
    }
    if (error) setError("");
  };
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.agree) {
      errors.agree = "You must agree to the Terms of Service and Privacy Policy";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    if (!validateForm()) {
      return;
    }
    try {
      const response = await register({
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      if (response.success) {
        const pendingBillResult = await handlePendingGuestBill();
        if (pendingBillResult) {
          if (pendingBillResult.success) {
            alert(`${pendingBillResult.message}\nYou can now view and share your bill.`);
            navigate(`/bill/${pendingBillResult.bill.billId}`);
            return;
          } else {
            console.error('Failed to create pending bill:', pendingBillResult.message);
          }
        }
        alert("Account created successfully! Welcome to Splitaire.");
        navigate("/dashboard");
      } else {
        setError(response.message || "Registration failed. Please try again.");
        if (response.errors && Array.isArray(response.errors)) {
          const backendErrors = {};
          response.errors.forEach(err => {
            backendErrors[err.field] = err.message;
          });
          setValidationErrors(backendErrors);
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {}
          <div className="px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-lg">
              <Logo />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Splitaire</h2>
            <p className="text-gray-600">Create your account and start splitting bills effortlessly</p>
          </div>

          {}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
            {}
            {hasPendingBill && <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-emerald-800 mb-1">
                    Bill Saved!
                  </p>
                  <p className="text-sm text-emerald-700">
                    Complete signup to create your bill and share it with participants.
                  </p>
                </div>
              </div>}

            {}
            {error && <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">{error}</p>
                </div>
              </div>}

            {}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${validationErrors.name ? "text-red-500" : "text-gray-400 group-focus-within:text-emerald-600"}`} />
                  <input type="text" name="name" placeholder="John Smith" value={formData.name} onChange={handleChange} disabled={loading} className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none transition-all text-gray-900 font-medium ${validationErrors.name ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} />
                </div>
              </div>
              {validationErrors.name && <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.name}</span>
                </p>}
            </div>

            {}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${validationErrors.email ? "text-red-500" : "text-gray-400 group-focus-within:text-emerald-600"}`} />
                  <input type="email" name="email" placeholder="john.smith@email.com" value={formData.email} onChange={handleChange} disabled={loading} className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none transition-all text-gray-900 font-medium ${validationErrors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} />
                </div>
              </div>
              {validationErrors.email && <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.email}</span>
                </p>}
            </div>

            {}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${validationErrors.password ? "text-red-500" : "text-gray-400 group-focus-within:text-emerald-600"}`} />
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} disabled={loading} className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none transition-all text-gray-900 font-medium ${validationErrors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={loading} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {validationErrors.password && <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.password}</span>
                </p>}
              {!validationErrors.password && formData.password && <p className="mt-1.5 text-xs text-gray-500">
                  Use 6 or more characters with a mix of letters, numbers & symbols
                </p>}
            </div>

            {}
            <div>
              <label className="block text-gray-800 font-semibold mb-2 text-sm">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity"></div>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${validationErrors.confirmPassword ? "text-red-500" : "text-gray-400 group-focus-within:text-emerald-600"}`} />
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={handleChange} disabled={loading} className={`w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 rounded-xl focus:bg-white focus:outline-none transition-all text-gray-900 font-medium ${validationErrors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"} ${loading ? "opacity-50 cursor-not-allowed" : ""}`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={loading} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {validationErrors.confirmPassword && <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.confirmPassword}</span>
                </p>}
            </div>

            {}
            <div>
              <div className="flex items-start space-x-3 py-2">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} disabled={loading} className={`mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`} />
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
              {validationErrors.agree && <p className="mt-1.5 text-sm text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{validationErrors.agree}</span>
                </p>}
            </div>

            {}
            <button type="submit" disabled={loading} className={`w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-2xl hover:scale-105"}`}>
              {loading ? <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </> : <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>}
            </button>

            {}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">Or sign up with</span>
              </div>
            </div>

            {}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" disabled={loading} className={`flex items-center justify-center space-x-2 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 group transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:border-emerald-500 hover:shadow-md"}`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <Chrome className="w-4 h-4 text-red-500" />
                </div>
                <span>Google</span>
              </button>
              <button type="button" disabled={loading} className={`flex items-center justify-center space-x-2 px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 group transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:border-emerald-500 hover:shadow-md"}`}>
                <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                  <Apple className="w-4 h-4 text-white" />
                </div>
                <span>Apple</span>
              </button>
            </div>

            {}
            <div className="text-center pt-4 pb-2">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button onClick={() => navigate("/login")} type="button" disabled={loading} className={`text-emerald-600 font-bold transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:text-emerald-700 hover:underline"}`}>
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        {}
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
    </div>;
}