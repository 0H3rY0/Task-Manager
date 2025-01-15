import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

export const useFileUpload = () => {
  const [UploadImageError, setUploadImageError] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const imageSchema = Yup.object({
      ImageUrl: Yup.mixed().test(
        "fileType",
        "Only image files are allowed! If you don't change your file, the image won't be added.",
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
      } catch (error) {
        console.log("image failded to load: " + error);
        setUploadImageError(error.inner[0].message || "image failed to load");
      }
    }
  };

  return {
    handleFileUpload,
    UploadImageError,
    uploadedFileUrl,
  };
};
