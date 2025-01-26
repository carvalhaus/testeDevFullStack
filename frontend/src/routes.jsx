import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function RoutesProvider() {
  function PrivateRoute({ children }) {
    return localStorage.getItem("token") ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route
          path="/dashboard"
          exact
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesProvider;
