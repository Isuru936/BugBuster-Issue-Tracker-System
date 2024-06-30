import { Routes, BrowserRouter, Route } from "react-router-dom";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import ClientRoute from "./pages/components/ClientRoute";
import AdminRoute from "./pages/components/AdminRoute";
import Tools from "./pages/components/Tools";
import IssuePopUp from "./pages/components/IssuePopUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/tools" element={<IssuePopUp />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<ClientRoute />}>
            <Route path="/client" element={<Client />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
