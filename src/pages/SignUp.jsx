import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signup form submitted!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-700"> Splitaire</h1>
        <h2 className="text-xl font-semibold mt-2 text-gray-600">
          Create your account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white"
      >
        <div>
          <label className="block text-gray-600 mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            placeholder="jon smith"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

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

        <div>
          <label className="block text-gray-600 mb-1 text-sm">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
          />
          <span>
            I understood the{" "}
            <span className="text-indigo-500 underline cursor-pointer">
              terms & policy
            </span>
            .
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-300 hover:bg-indigo-400 cursor-pointer text-white py-2 rounded-md font-medium transition"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center text-gray-400 text-l mt-2">
          <span className="mx-2">or sign up with</span>
        </div>

        <div className="flex justify-center gap-4 mt-2">
          <button className="border p-2 rounded-md hover:bg-gray-100">
            <FaGoogle />
          </button>
          <button className="border p-2 rounded-md hover:bg-gray-100">
            <FaApple />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          Have an account?{" "}
          <span
            className="text-indigo-500 underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            SIGN IN
          </span>
        </p>
      </form>
    </div>
  );
}
