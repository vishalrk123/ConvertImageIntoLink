import React, { useState } from "react";

import axios from "axios";
import API from "../services/api";

import { toast } from "react-toastify";

const UploadImage = ({
  setShowHistory
}) => {

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState("");

  const [dragActive, setDragActive] =
    useState(false);

  // HANDLE FILE
  const handleFile = (
    selectedFile
  ) => {

    setFile(selectedFile);
  };

  // DRAG OVER
  const handleDragOver = (e) => {

    e.preventDefault();

    setDragActive(true);
  };

  // DRAG LEAVE
  const handleDragLeave = () => {

    setDragActive(false);
  };

  // DROP FILE
  const handleDrop = (e) => {

    e.preventDefault();

    setDragActive(false);

    const droppedFile =
      e.dataTransfer.files[0];

    handleFile(droppedFile);
  };

  // UPLOAD IMAGE
  const handleUpload = async () => {

    if (!file) {

      toast.error(
        "Please select image"
      );

      return;
    }

    try {

      setLoading(true);

      // USER EMAIL
      const email =
        localStorage.getItem(
          "email"
        );

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "email",
        email
      );

      // API CALL
      const res = await API.post("/images/upload", formData);

      // IMAGE URL
      setImageUrl(
        res.data.imageUrl
      );

      toast.success(
        "Image Uploaded Successfully 🚀"
      );

      // // SHOW HISTORY SECTION
      // if (setShowHistory) {

      //   setShowHistory(true);
      // }

    } catch (error) {

      console.error(
        "Upload failed:",
        error
      );

      toast.error(
        "Upload Failed!"
      );

    } finally {

      setLoading(false);
    }
  };

  // COPY LINK
  const copyToClipboard = () => {

    navigator.clipboard.writeText(
      imageUrl
    );

    toast.success(
      "Link Copied!"
    );
  };

  return (

    <div className="upload-wrapper">

      <div className="upload-container">

        {/* <h2>
          Upload Your Image 🚀
        </h2> */}

        {/* DROP ZONE */}
        <div
          className={`drop-zone ${
            dragActive
              ? "active"
              : ""
          }`}
          onDragOver={
            handleDragOver
          }
          onDragLeave={
            handleDragLeave
          }
          onDrop={handleDrop}
        >

          <p>
            Drag & Drop Image Here
          </p>

          <span>
            OR
          </span>

          {/* FILE INPUT */}
          <input
            type="file"
            id="fileUpload"
            hidden
            onChange={(e) =>
              handleFile(
                e.target.files[0]
              )
            }
          />

          <label
            htmlFor="fileUpload"
            className="browse-btn"
          >
            Browse File
          </label>

        </div>

        {/* SELECTED IMAGE */}
        {file && (

          <div className="selected-image-box">

            <img
              src={URL.createObjectURL(
                file
              )}
              alt="preview"
              className="selected-preview"
            />

            <div className="selected-info">

              <h3>
                Selected Image
              </h3>

              <p>
                {file.name}
              </p>

            </div>

          </div>
        )}

        {/* UPLOAD BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="upload-btn"
        >

          {loading ? (
            <div className="spinner"></div>
          ) : (
            "Upload Image"
          )}

        </button>

        {/* RESULT */}
        {imageUrl && (

          <div className="result">

            <p>
              Permanent Link:
            </p>

            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
            >
              {imageUrl}
            </a>

            <button
              onClick={
                copyToClipboard
              }
              className="copy-btn"
            >
              🔗 Copy Link
            </button>

            <img
              src={imageUrl}
              alt="uploaded"
              className="preview-image"
            />

          </div>
        )}

      </div>

    </div>
  );
};

export default UploadImage;
