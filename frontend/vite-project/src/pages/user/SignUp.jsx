import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-5">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-4xl text-center font-bold text-gray-500 mb-8">
          Sign Up
        </h1>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="User Name"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
          />
          <button className="bg-blue-500 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5 justify-center text-gray-700">
          Already have an account? 
          <Link to="/sign-in">
            <span className="text-blue-700 hover:underline">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
