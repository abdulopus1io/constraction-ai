"use client"; // Indicates that this is a client component
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "./services/apiService"; // Adjust path as necessary
import { signIn } from "next-auth/react";
import {jwtDecode} from "jwt-decode";
import UserInfo from "../app/components/UserInfo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check for the token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token); // Decode the JWT token to get expiration time
      const isExpired = Date.now() >= exp * 1000; // Check if the token is expired
      if (!isExpired) {
        router.push("/home"); // If token is valid, redirect to home
      }
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError(null); // Reset any previous error

    try {
      const result = await postRequest("/user", { email, password }); // Call the login API
console.log(result,"result");
      // If login is successful, store the token in local storage
      localStorage.setItem("token", result.token); // Assuming result.token contains the JWT
      // Redirect to the protected page
      router.push("/home");
    } catch (err) {
      // Handle error if login fails
      setError(err.message || "Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { redirect: false });
    if (result.error) {
      setError(result.error);
    } else {
      // Assuming the token is managed by NextAuth, we can access it from the session
      const session = await getSession(); // Import and call getSession from 'next-auth/react'
      if (session) {
        localStorage.setItem("token", session.accessToken); // Store token from session
        localStorage.setItem("user", JSON.stringify(session.user)); // Store user info
        router.push("/home"); // Redirect to home
      } else {
        setError("Failed to log in with Google");
      }
    }
  };
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without redirecting
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("user"); // Remove user info from local storage
    router.push("/login"); // Redirect to login page
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-fadeIn">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>
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
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <UserInfo/>
      
      </div>
    </div>
  );
}



