import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const res = await API.post(
      "/auth/login",
      formData
    );

    console.log(res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "email",
      res.data.email
    );

    localStorage.setItem(
      "name",
      res.data.name
    );

    toast.success(
      "Login Successful!"
    );

    navigate("/dashboard");

  } catch (err) {

    console.log(err);

    toast.error(
      "Invalid Credentials!"
    );
  }
};

  return (

    <>
    <Navbar />

    
    <div className="auth-page">
      
      <div className="auth-card">
        {/* LOGO */}
        <h1 className="auth-logo">
          ForeverLink 
        </h1>

        {/* TITLE */}
        <h2>
          Login
        </h2>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* BUTTON */}
          <button type="submit">

            Login

          </button>

        </form>

        {/* REGISTER LINK */}
        <p>

          Don't have account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </div>

    </div>
    </>
    
  );
};

export default Login;