import { useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

const technicians = [
  { name: "Technician 1" },
  { name: "Technician 2" },
  { name: "Technician 3" },
];

function AddIssue() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [issue, setIssue] = useState({
    id: "",
    status: 0,
    subject: "",
    description: "",
    imageURL: "",
    email: "",
    issueCreated: "",
    issueAssigned: "",
    technician: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIssue({
      id: "",
      status: 0,
      subject: "",
      description: "",
      imageURL: "",
      email: "",
      issueCreated: "",
      issueAssigned: "",
      technician: "",
    });
  };

  return (
    <div className="w-screen h-full bg-gray-800 pb-5">
      <NavBar email={currentUser.email} />
      <div className="w-screen h-full max-w-md mt-5 mb-5 mx-auto bg-gray-700 shadow-md rounded-lg p-10">
        <h2 className="text-3xl text-gray-900 border-b-2 border-gray-800 font-bold mb-5">
          Create a New Issue
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-50">
              Assignee Email
            </label>
            <input
              type="email"
              name="email"
              value={issue.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-50">Subject</label>
            <input
              type="text"
              name="subject"
              value={issue.subject}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-50">Description</label>
            <textarea
              name="description"
              value={issue.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-50">Technician</label>
            <select
              name="technician"
              value={issue.technician}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select Technician</option>
              {technicians.map((tech, index) => (
                <option key={index} value={tech.name}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1 p-2 border rounded"
            />
            <img
              src="https://via.placeholder.com/150"
              alt="Image Preview"
              className="mt-2 w-full h-40 object-cover rounded"
            />
          </div>
          <div>{/* image upload */}</div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIssue;
