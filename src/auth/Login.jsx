import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginAuthMutation } from "../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginAuthMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.role) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (userInfo.role === "teacher") {
        navigate("/teacher/dashboard", { replace: true });
      }
    }
  }, [userInfo, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      // Call API to login
      const res = await login({ email, password }).unwrap();

      // Set credentials in Redux + LocalStorage
      dispatch(setCredentials(res));
      localStorage.setItem("userInfo", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      // Navigate Based On Role Immediately
      if (res.user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (res.user.role === "teacher") {
        navigate("/teacher/dashboard", { replace: true });
      }
    } catch (error) {
      // Handle Token Expiry or Invalid Credentials
      if (error?.data?.message) {
        setErrorMessage(error.data.message);
      } else if (error?.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 sm:mb-6">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6">
              Please login to your account
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-sm sm:text-base"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              {/* <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            {/* <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Register here
                </a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginAuthMutation } from "../redux/api/usersApiSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials, logout } from "../redux/auth/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [login, { isLoading }] = useLoginAuthMutation();
//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo && userInfo.role) {
//       if (userInfo.role === "admin") {
//         navigate("/admin/dashboard", { replace: true });
//       } else if (userInfo.role === "teacher") {
//         navigate("/teacher/dashboard", { replace: true });
//       }
//     }
//   }, [userInfo, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     try {
//       // ✅ Call API to login
//       const res = await login({ email, password }).unwrap();

//       // ✅ Set credentials in Redux + LocalStorage
//       dispatch(setCredentials(res));
//       localStorage.setItem("userInfo", JSON.stringify(res.user));
//       localStorage.setItem("token", res.token);
//       // ✅ Navigate Based On Role Immediately
//       if (res.user.role === "admin") {
//         navigate("/admin/dashboard", { replace: true });
//       } else if (res.user.role === "teacher") {
//         navigate("/teacher/dashboard", { replace: true });
//       }
//     } catch (error) {
//       // ✅ Handle Token Expiry or Invalid Credentials
//       if (error?.data?.message) {
//         setErrorMessage(error.data.message);
//       } else if (error?.message) {
//         setErrorMessage(error.message);
//       } else {
//         setErrorMessage("Something went wrong. Please try again.");
//       }
//     }
//   };

//   // useEffect(() => {
//   //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   //   if (userInfo?.role === "admin") {
//   //     navigate("/admin/dashboard", { replace: true });
//   //   } else if (userInfo?.role === "teacher") {
//   //     navigate("/teacher/dashboard", { replace: true });
//   //   }
//   // }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-500 mb-4">
//           Please login to your account
//         </p>

//         {errorMessage && (
//           <div className="text-red-500 text-sm text-center mb-4">
//             ❌ {errorMessage}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-6">
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
