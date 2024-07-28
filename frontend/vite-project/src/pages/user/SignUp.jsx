import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
 
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.success === false) {
        setLoading(false);

        toast.error(res.data.message);
        return;
      }
      setLoading(false);
      toast.success(res.data.message || "Sign up successfull!");
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message;

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-5">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-4xl text-center font-bold text-gray-500 mb-8">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="User Name"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="confirm Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Password is not Match</p>
          )}
         
          <button
            disabled={loading}
            className="bg-blue-500 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {loading ? "Loading..." : "SIGN UP"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 justify-center text-gray-700">
          Already have an account?
          <Link to="/sign-in">
            <span className="text-blue-700 hover:underline">Sign In</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}
