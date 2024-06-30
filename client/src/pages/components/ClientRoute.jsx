import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ClientRoute() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.roleEnum !== "USER") {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}

export default ClientRoute;
