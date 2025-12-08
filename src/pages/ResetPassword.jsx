import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/auth";
import AuthBackground from "../components/AuthBackground";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const { data } = await resetPasswordApi(token, { password });
      setMsg("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMsg("Invalid or expired link");
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        {msg && <p className="text-green-400 text-sm mb-3 text-center">{msg}</p>}

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-red-600 py-3 rounded hover:bg-red-700 font-bold">
          Reset Password
        </button>

        <p className="text-center mt-4 text-sm">
          <Link to="/login" className="text-blue-400">
            ⬅ Back to Login
          </Link>
        </p>
      </form>
    </AuthBackground>
  );
}
