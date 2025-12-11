import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/auth";
import AuthBackground from "../components/AuthBackground";
import Loader from "../components/Loader";
import Popup from "../components/Popup";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const showPopup = (msg, type) => {
    setPopup({ message: msg, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPasswordApi(token, { password });
      showPopup("Password reset successful!", "success");

      setTimeout(() => navigate("/login"), 2000);
    } catch {
      showPopup("Invalid or expired link", "error");
    }

    setLoading(false);
  };

  return (
    <AuthBackground>
      <Popup message={popup.message} type={popup.type} />

      <form
        onSubmit={handleSubmit}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded hover:bg-red-700 font-bold flex justify-center"
        >
          {loading ? <Loader /> : "Reset Password"}
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
