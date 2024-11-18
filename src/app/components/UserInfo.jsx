"use client";

import Image from "next/image";
import SignInBtn from "./SignInBtn";
import { useSession } from "next-auth/react";
import {useEffect} from "react"
import { useRouter } from "next/navigation";
export default function UserInfo() {
  const { status, data: session } = useSession();
console.log(session,"session")
const router = useRouter(); 

useEffect(() => {
  if (status === "authenticated") {
    // If the user is authenticated, redirect to the home page
    router.push("/home");
  }
}, [status, router]);

    return (
    <SignInBtn className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"/>
    )
}
