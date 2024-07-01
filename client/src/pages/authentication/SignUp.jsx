import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <a href="/">
        <h1 className="mb-4 absolute top-0 right-0 p-5 text-3xl font-extrabold text-gray-900 w-screen h-fit md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-sky-500">
            Bug Buster
          </span>
        </h1>
      </a>
      <hr className="" />
      <div className="w-full h-fit  border border-black max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-50 ">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-500 from-sky-400">
              Register
            </span>
          </h5>
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="namcom"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Bandara"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
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
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <button
            type="submit"
            className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-whiterounded-md group-hover:bg-opacity-0">
              Sign Up
            </span>
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Already registered?{" "}
            <span
              className="text-blue-700 hover:underline dark:text-blue-500"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
