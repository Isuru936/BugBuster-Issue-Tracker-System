import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const technicians = [
  { name: "Technician 1" },
  { name: "Technician 2" },
  { name: "Technician 3" },
];

function IssuePopUp({ toggleModal, data }) {
  const [assignTechPopUp, setAssignTechPopUp] = useState(false);
  const navigate = useNavigate();

  const onAssignClick = () => {
    setAssignTechPopUp(true);
  };

  const onCloseAssignTechPopUp = () => {
    setAssignTechPopUp(false);
  };

  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                #{data.id} {data.subject}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={(e) => {
                  navigate("/admin");
                }}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <span className="font-bold"> Assignee:</span> {data.email}{" "}
                <br />
                <span className="font-bold"> Assigned Handler:</span>{" "}
                {data.technician}
                <select name="technicians" id="technicians">
                  {technicians.map((tech, index) => (
                    <option key={index} value={tech.name}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {data.description}
                {data.imageURL && (
                  <img
                    src={data.imageURL}
                    alt="attachment"
                    className="w-full h-60 object-cover rounded-lg"
                  />
                )}
              </p>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={onAssignClick}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Assign Technician
              </button>
              <button
                onClick={toggleModal}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {assignTechPopUp && (
          <div
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50"
            onClick={onCloseAssignTechPopUp}
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Select a technician:{" "}
                  <select name="technicians" id="technicians">
                    {technicians.map((tech, index) => (
                      <option key={index} value={tech.name}>
                        {tech.name}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IssuePopUp;
