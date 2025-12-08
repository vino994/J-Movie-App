import React, { useState } from "react";
import { api, setAuthToken } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/login", { email, password });

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthToken(data.token);

      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <AuthBackground>
      <form
        onSubmit={handleLogin}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl"
      >
        <h1 className="text-3xl mb-4 font-bold text-center">Login</h1>

        {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

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

        <p className="text-right mt-2">
          <Link to="/forgot-password" className="text-blue-400 text-sm">
            Forgot Password?
          </Link>
        </p>

        <button className="w-full bg-red-600 py-3 rounded mt-3 hover:bg-red-700 font-bold">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </form>
    </AuthBackground>
  );
}
