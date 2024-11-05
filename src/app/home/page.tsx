"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
console.log(e)
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });

    // if (!result.error) {
    //   // Redirect to a protected page or home page
    //   router.push("/protected");
    // } else {
    //   setError("Invalid email or password");
    // }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
    <h1>Welcome Ai ki duniaya</h1>
    </div>
  );
}

