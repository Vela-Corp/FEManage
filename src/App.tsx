import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layout/LayoutAdmin";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import { AuthContexts } from "./auth/Context/AuthContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import Checkin from "./pages/Checkin";

function App() {
  const { user } = useContext(AuthContexts);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <LayoutAdmin /> : <Navigate to={"/signup"} />}
          >
            <Route index path="/dashboard" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/checkin" element={<Checkin />} />
          </Route>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to={"/dashboard"} />}
          />
          <Route
            path="/signin"
            element={!user ? <Signin /> : <Navigate to={"/dashboard"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
