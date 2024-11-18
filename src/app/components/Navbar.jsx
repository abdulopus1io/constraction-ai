"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Navbar() {
  const { status } = useSession();
  const router = useRouter(); // Initialize the router

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirecting immediately
    router.push("/"); // Redirect to the login page after signing out
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Link className="font-bold text-lg text-blue-700" href={"/"}>
        Constraction AI
      </Link>
      {status === "authenticated" ? (
        <button
          onClick={handleSignOut} // Use the handleSignOut function
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          Sign In
        </button>
      )}
    </div>
  );
}
