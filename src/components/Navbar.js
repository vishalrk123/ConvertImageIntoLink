import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const Navbar = ({
  setShowHistory,
}) => {

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  // USER DATA
  const token =
    localStorage.getItem("token");

  const name =
    localStorage.getItem("name");

  const email =
    localStorage.getItem("email");

  const firstLetter =
    name
      ? name.charAt(0).toUpperCase()
      : "U";

  // LOGOUT
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  // HISTORY
  const openHistory = () => {

    if (
      typeof setShowHistory ===
      "function"
    ) {

      setShowHistory(true);
    }

    setOpen(false);

    setTimeout(() => {

      const section =
        document.getElementById(
          "history-section"
        );

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
        });
      }

    }, 100);
  };

  return (

    <nav className="navbar">

      {/* LOGO */}
      <h1
        className="logo"
        onClick={() =>
          navigate("/")
        }
        style={{
          cursor: "pointer",
        }}
      >
        ForeverLink 🚀
      </h1>

      {/* PROFILE */}
      <div className="profile-wrapper">

        <div
          className="profile-btn"
          onClick={() =>
            setOpen(!open)
          }
        >

          <div className="profile-circle">
            {firstLetter}
          </div>

          <span>
            {token
              ? "Profile"
              : "Account"}
          </span>

        </div>

        {/* DROPDOWN */}
        {open && (

          <div className="profile-dropdown">

            {/* IF LOGGED IN */}
            {token ? (

              <>
                {/* TOP */}
                <div className="profile-top">

                  <div className="big-profile-circle">
                    {firstLetter}
                  </div>

                  <h3>
                    {name}
                  </h3>

                  <p>
                    {email}
                  </p>

                </div>

                {/* HISTORY */}
                <div
                  className="history-box"
                  onClick={openHistory}
                >

                  <h4>
                    Upload History 📸
                  </h4>

                  <p>
                    View uploaded images
                  </p>

                </div>

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="dropdown-logout"
                >
                  Logout
                </button>
              </>
            ) : (

              <>
                {/* NOT LOGGED IN */}

                <div className="profile-top">

                  <div className="big-profile-circle">
                    U
                  </div>

                  <h3>
                    Welcome
                  </h3>

                  <p>
                    Login or create account
                  </p>

                </div>

                {/* <button
                  className="dropdown-logout"
                  onClick={() =>
                    navigate("/login")
                  }
                >
                  Login
                </button>

                <button
                  className="dropdown-logout"
                  onClick={() =>
                    navigate("/register")
                  }
                >
                  Register
                </button> */}
              </>
            )}

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;