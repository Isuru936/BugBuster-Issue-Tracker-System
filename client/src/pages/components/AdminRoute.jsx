import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.roleEnum !== "ADMIN") {
    return <Navigate to="/client" />;
  }

  return <Outlet />;
}

export default AdminRoute;
