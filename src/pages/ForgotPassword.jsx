import React, { useState } from "react";
import { api } from "../api/auth";
import { Link } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";
import Loader from "../components/Loader";
import Popup from "../components/Popup";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const showPopup = (msg, type = "success") => {
    setPopup({ message: msg, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Wake server
      await fetch("https://authen-eytd.onrender.com/api/auth/test")
        .catch(() => {});

      // Give time to wake
      await new Promise(res => setTimeout(res, 1800));

      // Actual request
      const res = await api.post("/forgot-password", { 
        email: email.toLowerCase()  // IMPORTANT FIX
      });

      console.log("Response:", res.data);
      showPopup("Reset link sent!", "success");

    } catch (err) {
      console.log("ERR:", err.response?.data);  // FIXED POSITION

      showPopup(
        err.response?.data?.msg || "Email not found",
        "error"
      );
    }

    setLoading(false);
  };

  return (
    <AuthBackground>
      <Popup message={popup.message} type={popup.type} />

      <form onSubmit={handleSubmit}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl">

        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded hover:bg-red-700 font-bold flex justify-center"
        >
          {loading ? <Loader /> : "Send Reset Link"}
        </button>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-400">⬅ Back to Login</Link>
        </p>
      </form>
    </AuthBackground>
  );
}
