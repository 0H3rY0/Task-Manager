import { FaRegUser } from "react-icons/fa";
import Image from "../components/ui/Image";
import { useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import EditName from "../components/ui/EditName";
import UploadImageButton from "../components/ui/UploadImageButton";
import EditEmail from "../components/ui/EditEmail";
import EditPassword from "../components/ui/EditPassword";
import RemoveImageButton from "../components/ui/RemoveImageButton";
import { useUserStore } from "../store/useUserStore";
import EditEmailSettings from "../components/ui/EditEmailSettings";

const UserSetting = () => {
  const { user, setUserImage } = useUserStore();
  const { handleFileUpload } = useFileUpload();
  const [token] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  });

  const handleUpdateImageUrl = (e) => {
    handleFileUpload(e, async (newImageUrl) => {
      try {
        await axios.put("http://localhost:3000/user/update", {
          id: token.id,
          imageUrl: newImageUrl,
        });
        setUserImage(newImageUrl);
      } catch (error) {
        console.log("error during saving image into database: " + error);
      }
    });
  };

  if (!token) {
    return (
      <p className="text-red-500 absolute top-1/2">
        You need to log in to access this content.
      </p>
    );
  }

  return (
    <div className="w-10/12 flex flex-col justify-between py-16 gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        User
        <FaRegUser className="text-green-500" size={30} />
      </h2>
      <div className="flex md:flex-row flex-col gap-20">
        <div className="md:w-1/3 w-full">
          <Image
            image={user.imageUrl}
            updateFunction={handleUpdateImageUrl}
            color="border-green-200"
          />
          <div className="flex gap-5 justify-around mt-5">
            <UploadImageButton handleUpdateImageUrl={handleUpdateImageUrl} />
            <RemoveImageButton user={user} setImageUrl={setUserImage} />
          </div>
        </div>
        <div className="md:w-2/3 w-full">
          <EditName user={user} />
          <EditEmail user={user} />
          <EditPassword user={user} />
          <EditEmailSettings user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
