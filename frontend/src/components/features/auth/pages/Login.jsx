import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate ,Navigate} from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";


// ================= LOGIN COMPONENT =================
export function Login() {
  const { error, loading ,user} = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { handleLogin } = useAuth();
  const navigate = useNavigate();


// submit form handler
  const submitForm = async (e) => {
    e.preventDefault();

  // send data into redux state using hanleLogin
    const res = await handleLogin(formData);

    if (res) {
      toast.success(res?.message || "User logged In.")
      navigate("/");
    } else {
      toast.error(error?.response?.data?.message || "Login Failed!")
    }
  };

  // if there s no loading state and user is exist then naviage to '/' page dashboard
  if (!loading && user) {
    return <Navigate to={'/'} replace />
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-800"
      >
        <div className=" flex justify-center items-start flex-col mb-6">
          <h2 className="text-3xl font-semibold text-center mb-1">Login</h2>
          <p className="text-xs font-normal text-center mb-1">
            Login with you email and password.
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:ring-2 focus:ring-gray-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {/* error  */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="w-full py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link className="underline" to={"/register"}>
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
