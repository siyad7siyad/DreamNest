import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../components/OAuth";


export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.success === false) {
        dispatch(signInFailure(res.data.message));

        toast.error(res.data.message);
        return;
      }
      dispatch(signInSuccess(res.data.user));
      toast.success("Login successfull!");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure());
      const errorMessage = error.response?.data?.message || error.message;

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-5">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto">
        <h1 className="text-4xl text-center font-bold text-gray-500 mb-8">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

          <button
            disabled={loading}
            className="bg-blue-500 text-white p-3 rounded-lg uppercase font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {loading ? "Loading..." : "SIGN IN"}
          </button>
       <OAuth />
        </form>
        <div className="flex gap-2 mt-5 justify-center text-gray-700">
          dont have an account?
          <Link to="/sign-up">
            <span className="text-blue-700 hover:underline">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}
