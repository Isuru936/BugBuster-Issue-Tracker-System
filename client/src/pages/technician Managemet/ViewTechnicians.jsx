import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

function ViewTechnicians() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await fetch("/api/v1/auth/users/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTechnicians(data);
        } else {
          console.log("Failed to fetch technicians");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTechnicians();
  }, [currentUser.token]);

  return (
    <div>
      <NavBar email={currentUser.email} />
      <div className="container mx-auto my-4">
        <h2 className="text-2xl font-bold m-2">Technicians</h2>
        <div className="grid grid-cols-1 p-10 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.map((technician) => (
            <div
              key={technician.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {technician.firstName} {technician.lastName}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Email: {technician.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTechnicians;
