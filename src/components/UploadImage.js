import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const UploadImage = ({ setShowHistory }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("email");

      const formData = new FormData();
      formData.append("file", file);

      if (email) {
        formData.append("email", email);
      }

      const res = await API.post(
        "/images/upload",
        formData
      );

      setImageUrl(res.data.imageUrl);

      toast.success(
        "Image Uploaded Successfully 🚀"
      );

      if (setShowHistory) {
        setShowHistory(true);
      }

    } catch (error) {
      console.error("Upload failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Upload Failed!";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);

      toast.success("Link Copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-container">

        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p>Drag & Drop Image Here</p>

          <span>OR</span>

          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            hidden
            onChange={(e) =>
              handleFile(e.target.files[0])
            }
          />

          <label
            htmlFor="fileUpload"
            className="browse-btn"
          >
            Browse File
          </label>
        </div>

        {file && (
          <div className="selected-image-box">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="selected-preview"
            />

            <div className="selected-info">
              <h3>Selected Image</h3>
              <p>{file.name}</p>
            </div>
          </div>
        )}

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

        {imageUrl && (
          <div className="result">
            <p>Permanent Link:</p>

            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
            >
              {imageUrl}
            </a>

            <button
              onClick={copyToClipboard}
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
