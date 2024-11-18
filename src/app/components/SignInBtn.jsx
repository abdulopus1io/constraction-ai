"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center shadow-xl rounded-lg  w-full"
    >
      {/* <Image src="/google-logo.png" height={30} width={30} /> */}
      <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105" >
        Sign in with Google
      </span>
    </button>
  );
}
