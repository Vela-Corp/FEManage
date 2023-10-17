import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import { AuthContexts } from "./auth/Context/AuthContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(AuthContexts);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
          </Route>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to={"/"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
