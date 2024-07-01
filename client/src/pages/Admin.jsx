import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import NavBar from "./components/NavBar";
import Tools from "./components/Tools";
import { useSelector } from "react-redux";

const technicians = [
  { name: "Technician 1" },
  { name: "Technician 2" },
  { name: "Technician 3" },
];

function Admin() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [selectedTechnician, setSelectedTechnician] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchedIssues, setfetchedIssues] = useState([]);
  const [issueData, setIssueData] = useState(null);

  const toggleModal = (data) => {
    setIssueData(data);
    setIsModalOpen(!isModalOpen);
  };

  const selectTechnician = (e) => {
    console.log(e.target.value);
    setSelectedTechnician(e.target.value);
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch("/api/v1/auth/issue", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setfetchedIssues(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = async () => {
    if (selectedTechnician === "") {
      alert("Please select a technician to assign the issue");
      return;
    }
    try {
      const response = await fetch(
        `/api/v1/auth/issue/assign/${issueData.id}?technician=${selectedTechnician}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ technician: selectedTechnician }),
        }
      );
      alert("Issue Assigned Successfully");
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/v1/auth/issue/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Issue Deleted Successfully");
      toggleModal();
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currentUser.token);

    fetchIssues();
  }, []);

  return (
    <div className="w-screen bg-gray-800 h-full">
      <NavBar email={currentUser.email} />
      <Tools />
      <div className="mx-auto p-5 lg:p-5 lg:py-6">
        <div className="flex flex-col space-y-2">
          {fetchedIssues.map((data, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 text-gray-800 rounded-lg shadow-lg "
              onClick={() => {
                toggleModal(data);
              }}
            >
              <div className="flex flex-row border-b pb-2 mb-2 ">
                <div className="flex-shrink-0 w-fit text-center">
                  <div className="font-light">#{data.id}</div>
                  {data.status === 0 && (
                    <div className="bg-red-600 text-white font-bold rounded px-2 py-1 mt-1">
                      New
                    </div>
                  )}
                  {data.status === 1 && (
                    <div className="bg-yellow-600 text-white font-bold rounded px-2 py-1 mt-1">
                      Assigned
                    </div>
                  )}
                  {data.status === 2 && (
                    <div className="bg-green-600 text-white font-bold rounded px-2 py-1 mt-1">
                      Completed
                    </div>
                  )}
                </div>
                <div className="flex-grow pl-4">
                  <div className="text-xl font-semibold">{data.subject}</div>
                  <div className="text-sm font-light">{data.description}</div>
                </div>
                <div className="ml-auto">
                  {data.imageURL && (
                    <Icon
                      icon="carbon:document-attachment"
                      width="24"
                      height="24"
                      color="blue"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between text-sm font-light pt-2">
                <div className="pr-0 lg:pr-4 border-r border-gray-300">
                  <p>Assignee</p>
                  <p className="font-semibold">{data.email}</p>
                </div>
                <div className="px-0 lg:px-4 border-r border-gray-300">
                  <p>Created Date</p>
                  <p className="font-semibold">
                    {data.issueCreated.split("T")[0]}{" "}
                    {data.issueCreated.split("T")[1]}
                  </p>
                </div>
                <div className="px-0 lg:px-4 border-r border-gray-300">
                  <p>Assigned to</p>
                  <p className="font-semibold">
                    {data.issueAssigned !== null
                      ? data.technician
                      : "Not Assigned"}
                  </p>
                </div>
                <div className="pl-0 lg:pl-4">
                  <p>Assigned date</p>
                  <p className="font-semibold">
                    {data.issueAssigned !== null ? (
                      <>
                        {data.issueAssigned.split("T")[0]}{" "}
                        {data.issueAssigned.split("T")[1]}
                      </>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed overflow-scroll top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-900 bg-opacity-50">
          <div className="relative  p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  #{issueData.id} {issueData.subject}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
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
                  <span className="font-bold"> Assignee:</span>{" "}
                  {issueData.email} <br />
                  <span className="font-bold"> Assigned Handler:</span>{" "}
                  {issueData.technician ? issueData.technician : "Not Assigned"}{" "}
                  <br />
                  <select
                    name="technicians"
                    id="technicians"
                    className="pr-3 pl-3 bg-red-50 mt-3 rounded-lg w-fit h-10 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onChange={selectTechnician}
                  >
                    {technicians.map((tech, index) => (
                      <option
                        key={index}
                        value={tech.name}
                        className="p-3 bg-red-50 rounded-lg w-fit h-10 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        {tech.name}
                      </option>
                    ))}
                  </select>
                  <button className="ml-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      Assign technician
                    </span>
                  </button>
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {issueData.description}
                  {issueData.imageURL && (
                    <img
                      src={issueData.imageURL}
                      alt="attachment"
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  )}
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    handleAssign();
                  }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Assign Technician
                </button>
                <button
                  onClick={() => handleDelete(issueData.id)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-700 focus:outline-none rounded-lg hover:bg-red-800 focus:z-10 focus:ring-4 focus:ring-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete Issue
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
        </div>
      )}
    </div>
  );
}

export default Admin;
