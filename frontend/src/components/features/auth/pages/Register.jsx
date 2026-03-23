import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ================= LOGIN COMPONENT =================
export function Register() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Register success");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-800"
      >
        <div className="flex justify-center items-start flex-col mb-6">
          <h2 className="text-3xl font-semibold text-center mb-1">Create Account</h2>
          <p className="text-xs font-normal text-center mb-1" >Register with username, email and password.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
          />

          <button
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4 cursor-pointer">
          Already have an account? <Link className="underline" to={'/login'}> Login</Link>
        </p>
      </motion.div>
    </div>
  );
}




