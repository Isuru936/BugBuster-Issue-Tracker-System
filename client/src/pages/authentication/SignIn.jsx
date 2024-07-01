import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tools from "../components/Tools.jsx";

function SignIn() {
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    console.log(loginData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());

      const res = await fetch("/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Error response:", res.status, errorData);
        setError("Invalid credentials..");
        dispatch(
          loginFailure(
            `Error ${res.status}: ${
              errorData ? errorData.message : "No message"
            }`
          )
        );
        return;
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(logout());
      dispatch(loginSuccess(data));
      navigate("/client");
      console.log(data);
    } catch (err) {
      console.error("Error: ", err);
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4 flex-row align-middle items-center gap-5 flex absolute top-0 right-0 p-5 text-3xl font-extrabold text-gray-900 w-screen h-fit md:text-5xl lg:text-6xl">
        <Icon icon="game-icons:alien-bug" className="text-blue-700 text-6xl" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-500">
          BugBuster
        </span>
      </h1>
      <div className="w-full h-fit  border border-black max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-50 ">
        <form className="space-y-6" onSubmit={handleLogin}>
          <h5 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-400">
              SignIn
            </span>
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleLoginChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleLoginChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <button
            type="submit"
            className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-whiterounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Not registered?{" "}
            <span
              className="text-blue-700 hover:underline dark:text-blue-500"
              onClick={() => {
                navigate("/register");
              }}
            >
              Create account
            </span>
          </div>
          <p>{error || ""}</p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
