import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

function Tools() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <div
        className={`flex flex-col mb-3 items-center ${
          isOpen ? "space-y-2" : "hidden"
        }`}
      >
        <button
          type="button"
          className="flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
        >
          <Icon icon="hugeicons:logout-04" className="w-6 h-6" />
          <span className="sr-only">Sign Out</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
        >
          <Icon icon="arcticons:eu-login-mobile" className="w-6 h-6" />
          <span className="sr-only">LogIn</span>
        </button>
        <button
          type="button"
          className="flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
        >
          <Icon icon="uil:user-md" className="w-6 h-6" />
          <span className="sr-only">Profile</span>
        </button>
        <a href="/add-issue">
          <button
            type="button"
            className="flex justify-center items-center w-14 h-14 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none"
          >
            <Icon icon="icon-park-solid:add-mode" className="w-6 h-6" />
            <span className="sr-only">Add Issue</span>
          </button>
        </a>
      </div>
      <button
        type="button"
        onClick={toggleMenu}
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
      >
        <svg
          className={`w-6 h-6 transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 1v16M1 9h16"
          />
        </svg>
        <span className="sr-only">Open actions menu</span>
      </button>
    </div>
  );
}

export default Tools;
