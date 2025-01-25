import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      // console.log("Login successful:", response.data);
      dispatch(addUser(response?.data));

      return navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid email or password.");
    }
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      return navigate("/profile");
    } catch (error) {
      console.log(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8  bg-opacity-90 rounded shadow-lg bg-white opacity-95">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {isLogin ? "Login" : "signUp"}
        </h2>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm  text-gray-700 font-bold"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="firstName"
                id="email"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black focus:border-transparent"
                placeholder="Enter Your First Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm  text-gray-700 font-bold"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black focus:border-transparent"
                placeholder="Enter your Last Name"
                required
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm  text-gray-700 font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-black focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block mb-2 text-sm  text-gray-700 font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 border-black focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-1 top-7 flex items-center pr-3 text-gray-500 focus:outline-none"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
        )}

        <button
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin((value) => !value)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setIsLogin((value) => !value)}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
