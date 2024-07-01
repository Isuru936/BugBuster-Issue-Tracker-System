import { Routes, BrowserRouter, Route } from "react-router-dom";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import ClientRoute from "./pages/components/ClientRoute";
import AdminRoute from "./pages/components/AdminRoute";
import Tools from "./pages/components/Tools";
import AddIssue from "./pages/Issue Management/AddIssue";
import ViewTechnicians from "./pages/technician Managemet/ViewTechnicians";
import NotFoundPage from "./pages/components/NotFoundPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/tools" element={<Tools />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/add-issue" element={<AddIssue />} />
            <Route path="/view-techs" element={<ViewTechnicians />} />
          </Route>
          <Route element={<ClientRoute />}>
            <Route path="/client" element={<Client />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
