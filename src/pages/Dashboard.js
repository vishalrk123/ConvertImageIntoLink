import React, { useState } from "react";

import Navbar from "../components/Navbar";

import UploadImage from "../components/UploadImage";

import ImageGallery from "../components/ImageGallery";

const Dashboard = () => {

  // HISTORY STATE
  const [showHistory, setShowHistory] =
    useState(false);

  return (

    <div className="dashboard">

      {/* NAVBAR */}
      <Navbar
        setShowHistory={
          setShowHistory
        }
      />

      <div className="dashboard-container">

        {/* ONLY SHOW UPLOAD WHEN HISTORY FALSE */}
        {!showHistory && (

          <>
            {/* WELCOME */}
            <div className="welcome-box">

              <h1 className="welcome-title">
                Upload Your Images 🚀
              </h1>

              {/* <p className="welcome-subtitle">
                Store and manage your uploads
              </p> */}

            </div>

            {/* UPLOAD SECTION */}
            <div className="upload-wrapper">

              <UploadImage
                setShowHistory={
                  setShowHistory
                }
              />

            </div>
          </>
        )}

        {/* HISTORY SECTION */}
        {/* HISTORY SECTION */}
{showHistory && (

  <div
    className="history-section"
    id="history-section"
  >

    {/* BACK BUTTON */}
    <button
      className="back-btn"
      onClick={() =>
        setShowHistory(false)
      }
    >
      ← Back To Home
    </button>

    <h2 className="history-title">
      Upload History 📸
    </h2>

    <p className="history-subtitle">
      Your uploaded images
    </p>

    <ImageGallery />

  </div>
)}
        

      </div>

    </div>
  );
};

export default Dashboard;