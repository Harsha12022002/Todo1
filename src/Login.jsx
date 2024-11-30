import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function posting(e) {
    e.preventDefault();
    axios
      .get("http://localhost:3000/Login", {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("email", email);
          navigate("/Home");
        }
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in to access your account
        </p>
        <form className="mt-6 space-y-6" onSubmit={posting}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-800 focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-800 focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 focus:outline-none"
            />
            <div className="mt-2 text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 px-4 py-3 text-lg font-bold text-white shadow-lg hover:from-indigo-600 hover:via-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Not a member?{" "}
          <Link
            to="/sign"
            className="font-bold text-indigo-500 hover:text-indigo-600"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
