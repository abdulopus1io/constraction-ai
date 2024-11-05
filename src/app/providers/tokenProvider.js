"use client"
import { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
// Create a context for the token
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If there's no token and the user is not on the login page, redirect
    if (!token) {
      if (router.pathname !== "/") {
        router.push("/");
      }
    } 
  }, [router]);

  return (
    <TokenContext.Provider value={{}}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the Token context
export const useToken = () => {
  return useContext(TokenContext);
};
