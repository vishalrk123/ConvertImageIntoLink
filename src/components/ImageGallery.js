import React, { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

import { motion } from "framer-motion";

const ImageGallery = () => {

  const [images, setImages] = useState([]);

  useEffect(() => {

    loadImages();

  }, []);

  // ✅ LOAD USER IMAGES
  const loadImages = async () => {

    try {

      // GET LOGGED IN USER EMAIL
      const email =
        localStorage.getItem("email");

      // FETCH USER IMAGES
      const res = await API.get(
        `/images/${email}`
      );

      setImages(res.data);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load images"
      );
    }
  };

  // ✅ DELETE IMAGE
  const deleteImage = async (id) => {

    try {

      await API.delete(
        `/images/${id}`
      );

      setImages(
        images.filter(
          (img) => img.id !== id
        )
      );

      toast.success(
        "Image deleted!"
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Delete failed"
      );
    }
  };

  // ✅ COPY LINK
  const copyLink = (url) => {

    navigator.clipboard.writeText(
      url
    );

    toast.success(
      "Link copied!"
    );
  };

  return (

    <div className="gallery-container">

      {images.length === 0 ? (

        <h2 className="no-image">
          No Images Uploaded Yet 🚀
        </h2>

      ) : (

        images.map((img) => (

          <motion.div
            key={img.id}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            whileHover={{
              y: -8,
            }}
            className="gallery-card"
          >

            {/* IMAGE */}
            <img
              src={img.imageUrl}
              alt={img.imageName}
              className="gallery-image"
            />

            <div className="gallery-content">

              {/* IMAGE NAME */}
              <p className="image-name">
                {img.imageName}
              </p>

              {/* BUTTONS */}
              <div className="gallery-buttons">

                {/* COPY */}
                <button
                  onClick={() =>
                    copyLink(
                      img.imageUrl
                    )
                  }
                  className="copy-btn"
                >
                  🔗 Copy
                </button>

                {/* DOWNLOAD */}
                <a
                  href={img.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  ⬇ Download
                </a>

                {/* DELETE */}
                <button
                  onClick={() =>
                    deleteImage(
                      img.id
                    )
                  }
                  className="delete-btn"
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          </motion.div>
        ))
      )}

    </div>
  );
};

export default ImageGallery;