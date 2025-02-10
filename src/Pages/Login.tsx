import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import imgLogin from "../Images/login-image.png"; // Update path if needed
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/useAuth";

const Login: React.FC = () => {
  const { authLoading, user, refreshAuth } = useAuth()
  
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);

    axios.post("/auth/login", { email, password })
    .then(() => {
      toast.success("Logged in");
      refreshAuth()
      navigate("/");
    })
    .catch((err) => {
      console.error(err)
      toast.error(err.response.data.error ?? "Failed to Login");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleSignup = () => {
    navigate("/signup");
  };
  
  const handleForgotPassword = () => {
    navigate("/reset-password")
  } 

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate("/");
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6">
      {/* Left-Aligned Title Container */}
      <div className="w-full max-w-sm">
        <h2 className="text-black text-2xl md:text-3xl font-semibold text-left">
          Hop In!
        </h2>
        <h2 className="text-black text-2xl md:text-3xl font-semibold text-left">
          Smarter Rides Start Here.
        </h2>
      </div>

      {/* Increased Gap Between Text and Image */}
      <div className="mt-6"></div>

      {/* Centered Image with Balanced Size */}
      <img
        src={imgLogin}
        alt="Login"
        className="w-[85%] sm:w-[50%] md:w-[40%] lg:w-[30%] max-w-[350px] max-h-[220px] md:max-h-[260px] lg:max-h-[280px] object-contain"
      />

      {/* Input Fields - Centered */}
      <div className="w-full max-w-sm flex flex-col gap-4 mt-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008955]"
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008955]"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      {/* Sign Up & Forgot Password - Centered */}
      <div className="w-full max-w-sm flex justify-between text-lg mt-3">
        <button
          disabled={loading}
          onClick={handleSignup}
          className="text-black font-semibold"
        >
          Sign Up
        </button>
        <button onClick={handleForgotPassword} className="text-black font-semibold">Forgot Password?</button>
      </div>

      {/* Start Sharing Button - Centered */}
      <button
        disabled={loading}
        onClick={handleLogin}
        className="disabled:opacity-50 mt-6 px-6 py-3 bg-[#008955] text-white font-semibold rounded-lg text-lg w-full max-w-sm hover:bg-[#007144] transition border border-black"
      >
        Start Sharing!
      </button>
    </div>
  );
};

export default Login;
