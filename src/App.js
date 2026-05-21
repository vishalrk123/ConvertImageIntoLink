import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// ✅ Protected Route
const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ✅ Login Page */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* ✅ Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ✅ Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>

      {/* ✅ Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
