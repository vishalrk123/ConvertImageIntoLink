import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { toast } from "react-toastify";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration Successful!"
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      toast.error("Registration Failed!");
    }
  };

  return (
    

    <>
    <Navbar />
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-logo">
          ForeverLink 
        </h1>

        <h2>
          Register
        </h2>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>

          Already have account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
    </>
  );
};

export default Register;