import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Film } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvider";
const Login = () => {
    const navigate = useNavigate();
  const {login}=useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ✅ use context login function
    const res = await login(form);

    localStorage.setItem("token", res.token);

    // alert(res.message || "Login Successful!");
     toast.success("Login Successful!")
    navigate("/");
  } catch (err) {
    toast.error(err.response?.data?.message||"Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-[radial-gradient(circle_at_top,#1b1f3a,#06070f)]">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 items-center justify-center border-r border-white/10 px-16">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <Film className="text-[#9b6cff]" size={40} />
            <h1 className="text-4xl font-bold text-white">
              GraphRAG Movie
            </h1>
          </div>

          <h2 className="text-3xl font-bold text-[#9b6cff]">
            Query System
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            Login to explore movies using natural language queries.
            Discover actors, directors, genres and personalized
            recommendations powered by AI & GraphRAG.
          </p>

          <div className="mt-12 flex items-center justify-center w-32 h-32 rounded-full bg-[#171a2f] border border-white/10">
            <Film size={65} className="text-[#9b6cff]" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center px-6 py-8">
        <div className="w-full max-w-md bg-[#171a2f] border border-white/10 rounded-2xl shadow-2xl p-10">

          {/* Logo */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6a6afc] to-[#9b6cff] flex items-center justify-center mx-auto">
              <Film className="text-white" size={28} />
            </div>

            <h2 className="text-3xl font-bold text-white mt-5">
              Welcome Back
            </h2>

            <p className="text-gray-400 mt-2">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6 mt-8">

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#0e1020] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#6a6afc]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#0e1020] border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white placeholder-gray-500 outline-none focus:border-[#6a6afc]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-[#6a6afc] to-[#9b6cff] text-white font-semibold hover:scale-105 duration-300 disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
     <p className="text-center text-gray-400 mt-8 flex flex-col sm:flex-row justify-center items-center gap-1">
  <span>Don't have an account?</span>

  <Link
    to="/register"
    className="text-[#9b6cff] hover:text-[#b7a8ff] font-semibold"
  >
    Create Account
  </Link>
</p>

        </div>
      </div>
    </div>
  )
}

export default Login