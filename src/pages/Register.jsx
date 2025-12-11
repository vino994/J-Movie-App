import React, { useState } from "react";
import { api } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";
import Loader from "../components/Loader";
import Popup from "../components/Popup";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  const showPopup = (msg, type) => {
    setPopup({ message: msg, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/register", { name, email, password });

      showPopup("Registered successfully!", "success");
      setTimeout(() => navigate("/login"), 2000);

    } catch {
      showPopup("User already exists", "error");
    }

    setLoading(false);
  };

  return (
    <AuthBackground>
      <Popup message={popup.message} type={popup.type} />

      <form onSubmit={handleRegister}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl">

        <h1 className="text-3xl mb-4 font-bold text-center">Register</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 bg-[#333] rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded mt-3 hover:bg-red-700 font-bold flex justify-center"
        >
          {loading ? <Loader /> : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </form>
    </AuthBackground>
  );
}
