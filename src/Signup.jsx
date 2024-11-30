import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    if (password !== repass) {
      setStatus("Passwords do not match! Please try again.");
      return;
    }

    localStorage.setItem("email", email);

    axios
      .post("http://localhost:3000/users", { email, password })
      .then((response) => {
        console.log("User created:", response);
        setStatus("");
        navigate("/Home");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setStatus("Error creating user. Please try again.");
      });
  };

  return (
    <div>
      <section className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
          <Link
            to="/"
            className="flex justify-center text-4xl font-bold text-indigo-600 mb-6 hover:text-indigo-800 transition duration-300"
          >
            Home
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Create Your Account
          </h1>
          <form className="space-y-6" onSubmit={handleClick}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={repass}
                onChange={(e) => setRepass(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <input
                id="terms"
                type="checkbox"
                className="w-5 h-5 text-indigo-500 rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 font-medium"
              >
                I accept the{" "}
                <Link
                  to="/terms"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          {status && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {status}
            </p>
          )}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-indigo-600 font-bold hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
