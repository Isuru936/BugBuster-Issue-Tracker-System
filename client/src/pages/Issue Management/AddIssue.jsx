import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function AddIssue() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.currentUser.token);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issue, setIssue] = useState({
    subject: "",
    description: "",
    imageURL: "",
    email: "",
    technician: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevIssue) => ({
      ...prevIssue,
      [name]: value,
    }));
    console.log(issue);
  };

  const fetchTechnicians = async () => {
    try {
      const res = await fetch("/api/v1/auth/users/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTechnicians(data);
        console.log(data.firstName);
      } else {
        console.log("Failed to fetch technicians");
      }
    } catch (error) {
      console.log(error);
    }
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
      <div className="w-full h-full max-w-md lg:max-w-6xl mt-5 mb-5 mx-auto bg-gray-700 shadow-md rounded-lg p-10">
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
                    <option key={index} value={tech.email}>
                      {tech.email}
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
                {issue.imageURL && (
                  <img
                    src={
                      issue.imageURL
                        ? issue.imageURL
                        : "https://via.placeholder.com/150"
                    }
                    alt=" Preview"
                    className="mt-2 w-full h-64 object-contain  rounded"
                  />
                )}
              </div>
              <div>{/* image upload */}</div>
              <div className="flex gap-5 justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />{" "}
                      </svg>
                      <span>Loading</span>
                    </>
                  ) : (
                    "Create Issue"
                  )}
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
