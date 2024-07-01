import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Tools from "../components/Tools";
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
    <div className="w-screen h-screen bg-white">
      <NavBar email={currentUser.email} />
      <div className="container mx-auto my-4">
        <h2 className="text-2xl font-bold m-2 text-pretty font-serif">
          Technicians
        </h2>
        <div className="grid grid-cols-1 p-5 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {technicians.map((technician, index) => (
            <motion.div
              key={technician.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-blue-950 dark:border-gray-500 dark:hover:bg-blue-800"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {technician.firstName} {technician.lastName}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Email: {technician.email}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <Tools />
    </div>
  );
}

export default ViewTechnicians;
