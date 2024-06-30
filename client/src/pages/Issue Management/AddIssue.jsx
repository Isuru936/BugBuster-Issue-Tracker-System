import { useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const technicians = [
  { name: "Technician 1" },
  { name: "Technician 2" },
  { name: "Technician 3" },
];

function AddIssue() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.currentUser.token);
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState({
    subject: "",
    description: "",
    imageURL: "",
    email: "",
    technician: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
    console.log(issue);
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      setLoading(true);
      try {
        const snapshot = await fileRef.put(selectedFile);
        const url = await snapshot.ref.getDownloadURL();
        setIssue({ ...issue, imageURL: url });
        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const response = await fetch("/api/v1/auth/issue", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      });
      if (response.ok) {
        alert("Issue Created Successfully");
        navigate("/admin");
      } else {
        alert("Failed to Create Issue");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-full bg-gray-800 pb-5">
      <NavBar email={currentUser.email} />
      <div className="w-full h-full max-w-md lg:max-w-none mt-5 mb-5 mx-auto bg-gray-700 shadow-md rounded-lg p-10">
        <h2 className="text-3xl text-gray-200 border-b-2 border-gray-800 font-bold mb-5">
          Create a New Issue
        </h2>
        <form onSubmit={handleSubmit}>
          <div className=" block gap-0 lg:flex lg:gap-10">
            <div className="flex-1">
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
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="w-full mt-1 p-2 border rounded"
                />
                <img
                  src={
                    issue.imageURL
                      ? issue.imageURL
                      : "https://via.placeholder.com/150"
                  }
                  alt=" Preview"
                  className="mt-2 w-full h-64 object-contain  rounded"
                />
              </div>
              <div>{/* image upload */}</div>
              <div className="flex gap-5 justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Issue
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddIssue;
