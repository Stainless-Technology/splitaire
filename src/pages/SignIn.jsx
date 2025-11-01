import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login form submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-700">Splitaire</h1>
        <h2 className="text-xl font-semibold mt-2 text-gray-600">Log In</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white"
      >
        <div>
          <label className="block text-gray-600 mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            placeholder="jon.smith@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <p className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
          Forget Password
        </p>

        <button
          type="submit"
          className="w-full bg-indigo-300 cursor-pointer hover:bg-indigo-400 text-white py-2 rounded-md font-medium transition"
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="w-full border border-indigo-300 cursor-pointer text-indigo-500 py-2 rounded-md font-medium hover:bg-indigo-50 transition"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center text-gray-400 text-sm mt-4">
          <span className="mx-2">or</span>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button className="border p-2 rounded-md hover:bg-gray-100">
            <FaGoogle />
          </button>
          <button className="border p-2 rounded-md hover:bg-gray-100">
            <FaApple />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4 cursor-pointer hover:underline">
          Continue as Guest
        </p>
      </form>
    </div>
  );
}
