import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

export const useFileUpload = () => {
  const [UploadImageError, setUploadImageError] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [animationClass, setAnimationClass] = useState("");

  const handleFileUpload = async (e, callback, isErrorVisible = true) => {
    const file = e.target.files[0];

    const imageSchema = Yup.object({
      ImageUrl: Yup.mixed().test(
        "fileType",
        "Only image files are allowed!",
        (value) => {
          if (!value) return false;
          const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/gif",
          ];
          return allowedTypes.includes(value.type);
        }
      ),
    });

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await imageSchema.validate({ ImageUrl: file }, { abortEarly: false });
        setUploadImageError(null);

        const response = await axios.post(
          "http://localhost:3000/upload",
          formData
        );

        const data = response.data;
        setUploadedFileUrl(data.url);
        if (callback) callback(data.url);
      } catch (error) {
        console.log("image failded to load: " + error);
        setUploadImageError(error.inner[0].message || "image failed to load");
        if (!isErrorVisible) {
          setAnimationClass("fade-in");
          setTimeout(() => {
            setAnimationClass("fade-out");
            setTimeout(() => {
              setUploadImageError(null);
            }, 500);
          }, 5000);
        }
      }
    }
  };

  return {
    handleFileUpload,
    UploadImageError,
    uploadedFileUrl,
    setUploadImageError,
    animationClass,
  };
};
