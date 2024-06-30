import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import NavBar from "./components/NavBar";
import Tools from "./components/Tools";
import { useSelector } from "react-redux";
import IssuePopUp from "./components/IssuePopUp";

function Admin() {
  const [issues, setIssues] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issueData, setIssueData] = useState(null);

  const toggleModal = (data) => {
    setIssueData(data);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const dummyIssues = [
      {
        id: 1,
        status: 0,
        subject: "Issue 1",
        description: "Description for issue 1",
        imageURL: "/logo.jpeg",
        email: "assignee1@example.com",
        issueCreated: "2023-06-29T12:00:00",
        issueAssigned: null,
        technician: "",
      },
      {
        id: 2,
        status: 1,
        subject: "Issue 2",
        description: "Description for issue 2",
        imageURL: "https://example.com/image2.jpg",
        email: "assignee2@example.com",
        issueCreated: "2023-06-28T10:00:00",
        issueAssigned: "2023-06-28T10:00:00",
        technician: "Technician 1",
      },
      {
        id: 3,
        status: 2,
        subject: "Issue 3",
        description: "Description for issue 3",
        imageURL: "",
        email: "assignee3@example.com",
        issueCreated: "2023-06-27T09:30:00",
        issueAssigned: "2023-06-28T11:30:00",
        technician: "Technician 3",
      },
    ];

    setIssues(dummyIssues);
  }, []);

  return (
    <div className="w-screen bg-gray-800 h-screen">
      <NavBar email={currentUser.email} />
      <Tools />
      <div className="mx-auto p-5 lg:p-5 lg:py-6">
        <div className="flex flex-col space-y-2">
          {issues.map((data, index) => (
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
        <div className="w-screen h-screen absolute top-0 left-0 bg-[#11205288] flex flex-col justify-center align-middle items-center">
          <div className="w-64 h-64 flex justify-between p-5 bg-blue-500">
            
            Run time
            <Icon
              icon="mingcute:close-fill"
              className="text-xl"
              onClick={toggleModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
