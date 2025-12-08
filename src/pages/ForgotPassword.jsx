import React, { useState } from "react";
import { api } from "../api/auth";
import { Link } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  console.log("Form submitted");
  console.log("API Base URL:", api.defaults.baseURL);

  try {
    console.log("Sending POST request...");
    const res = await api.post("/forgot-password", { email });

    console.log("Response received:", res.data);

    alert("Reset link sent!");
    setMessage(res.data.msg || "Reset link sent to your email");
  } catch (err) {
    console.log("Error occurred:", err);
    console.log("Axios error response:", err.response?.data);

    alert("Error: " + (err.response?.data?.msg || "Request failed"));
    setMessage("Email not found");
  }
};



  return (
    <AuthBackground>
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        {message && <p className="text-green-400 text-sm mb-3 text-center">{message}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

       <button type="submit" className="w-full bg-red-600 py-3 rounded hover:bg-red-700 font-bold">
  Send Reset Link
</button>


        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-400">⬅ Back to Login</Link>
        </p>
      </form>
    </AuthBackground>
  );
}
