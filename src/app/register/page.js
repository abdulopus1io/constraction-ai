// pages/register.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "../services/apiService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(null); // Reset any previous error

    try {
      // Call the postRequest function to register the user
      const result = await postRequest("/register", { email, password });

      // If registration is successful, redirect to the home page
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Failed to register");
      }
    } catch (err) {
      // Handle any network or unexpected errors
      setError(err.message || "An error occurred");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-fadeIn">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a href="/" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
  </div>
  );
}