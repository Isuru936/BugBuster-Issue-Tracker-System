import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { logout } from "../redux/user/userSlice";

function Client() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [issues, setIssues] = useState([]);
  const [issueData, setIssueData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleModal = (data) => {
    setIssueData(data);
    setIsModalOpen(!isModalOpen);
  };

  const fetchIssuesByEmail = async (email) => {
    try {
      const response = await fetch(`/api/v1/auth/issue/email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authrization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIssues(data);
      }
      if (response.status === 403) {
        alert(
          "You are not authorized to view this page. Try logging in again."
        );
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(`/api/v1/auth/issue/completed/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        alert("Forbidden: You are not authorized to perform this action");
        return;
      }
      if (response.status === 200) {
        alert("Issue Marked as Completed");
        fetchIssuesByEmail(currentUser.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    if (filter === "new") return issue.status === 1;
    if (filter === "completed") return issue.status === 2;
    return true;
  });

  useEffect(() => {
    fetchIssuesByEmail(currentUser.email);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-800">
      <NavBar email={currentUser.email} />
      <div className="h-full flex justify-center p-3">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`${
              filter === "all"
                ? "dark:bg-slate-200 dark:text-gray-900"
                : "dark:bg-gray-800"
            } px-4 py-2 text-sm font-medium bg-slate-200 text-gray-900 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() => {
              setFilter("new");
            }}
            className={`${
              filter === "new"
                ? "dark:bg-slate-200 dark:text-gray-900"
                : "darK:bg-gray-800"
            } px-4 py-2 text-sm font-medium bg-slate-200 text-gray-900 border border-gray-200 hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
          >
            New
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter("completed");
            }}
            className={`${
              filter === "completed"
                ? "dark:bg-slate-200 dark:text-gray-900"
                : "dark:bg-gray-800"
            } px-4 py-2 text-sm font-medium bg-slate-200 text-gray-900 border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-blue-700  dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
          >
            Completed
          </button>
          <button
            onClick={() => {
              dispatch(logout());
            }}
            className={`absolute right-0 mr-5 px-4 py-2 dark:bg-blue-700 text-sm font-medium bg-slate-200 text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700  dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700`}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="w-full h-full flex flex-wrap justify-center gap-5 p-5">
        {filteredIssues && filteredIssues.length > 0 ? (
          filteredIssues.map((issue, index) => (
            <div
              key={index}
              onClick={() => toggleModal(issue)}
              className="w-96 h-48 bg-white rounded-xl p-5 shadow-lg hover:bg-slate-100"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-2">
                  #{issue.id} {issue.subject}
                </h2>
                <div className="flex-shrink-0 w-fit text-center">
                  {issue.status === 0 && (
                    <div className="bg-red-600 text-white font-bold rounded px-2 py-1 mt-1">
                      New
                    </div>
                  )}
                  {issue.status === 1 && (
                    <div className="bg-yellow-600 text-white font-bold rounded px-2 py-1 mt-1">
                      Assigned
                    </div>
                  )}
                  {issue.status === 2 && (
                    <div className="bg-green-600 text-white font-bold rounded px-2 py-1 mt-1">
                      Completed
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-700 h-20">{issue.description}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center align-middle items-center text-white  w-full h-full">
            <Icon
              icon="tabler:mood-empty-filled"
              className="text-9xl w-64 h-32"
            />
            <p className="text-white font-bold text-xl text-center">
              You are not assigned any issues, try contacting the admin.
            </p>
          </div>
        )}
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
                  <span className="font-bold"> From:</span> {issueData.email}{" "}
                  <br />
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
                <button
                  disabled={issueData.status === 2}
                  onClick={() => {
                    markAsCompleted(issueData.id);
                  }}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {issueData.status === 2 ? "Completed" : " Mark as Complete"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;
