import React, { useState } from "react";
import { api, setAuthToken } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthBackground from "../components/AuthBackground";
import Loader from "../components/Loader"; // Assuming you have the Loader component
import Popup from "../components/Popup"; // Assuming you have the Popup component

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const showPopup = (msg, type = "success") => {
    setPopup({ message: msg, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ message: "", type: "" }); // Clear previous popup message

    try {
      const { data } = await api.post("/login", { email, password });

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setAuthToken(data.token);

      // Show success message after login
      showPopup("Login successful!", "success");
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      showPopup("Invalid email or password", "error"); // Show error popup if login fails
    }

    setLoading(false);
  };

  return (
    <AuthBackground>
      <Popup message={popup.message} type={popup.type} />

      <form
        onSubmit={handleLogin}
        className="bg-black/70 p-10 rounded-xl w-80 shadow-xl"
      >
        <h1 className="text-3xl mb-4 font-bold text-center">Login</h1>

        {/* Display error message if any */}
        {popup.message && (
          <p className={`text-${popup.type === "error" ? "red" : "green"}-400 text-sm mb-3 text-center`}>
            {popup.message}
          </p>
        )}

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded mt-3 hover:bg-red-700 font-bold flex justify-center"
        >
          {loading ? <Loader /> : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400">Register</Link>
        </p>
      </form>
    </AuthBackground>
  );
}
