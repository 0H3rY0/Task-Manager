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
      <p className="text-red-500">You need to log in to access this content.</p>
    );
  }

  return (
    <div className="w-10/12 flex flex-col justify-between py-16 gap-6">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Upcoming
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
          <EditEmail />
          <EditPassword user={user} />

          <label
            htmlFor="username"
            className="font-semibold text-slate-800 text-lg"
          >
            E-mail settings
          </label>
          <p className="w-full flex justify-between items-center mt-5 mb-8 ">
            <span>Monthly product updates</span>
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
            </label>
          </p>
          <p className="w-full flex justify-between items-center mt-5 mb-8">
            <span>Monthly product updates</span>
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
            </label>
          </p>
          <p className="w-full flex justify-between items-center mt-5 mb-8">
            <span>Monthly product updates</span>
            <label className="inline-flex items-center me-5 cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
            </label>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
