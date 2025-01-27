import { FaRegUser } from "react-icons/fa";
import Image from "../components/ui/Image";
import { useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";

const UserSetting = () => {
  const [imageUrl, setImageUrl] = useState("");
  const { handleFileUpload } = useFileUpload();

  const handleUpdateImageUrl = (e) => {
    handleFileUpload(e, (newImageUrl) => {
      setImageUrl(newImageUrl);
    });
  };

  return (
    <div className="w-10/12 flex flex-col justify-between py-16 gap-6 bg-black">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Upcoming
        <FaRegUser className="text-green-500" size={30} />
      </h2>
      <div className="flex">
        <div className="w-1/3 bg-yellow-500 ">
          <Image image={imageUrl} updateFunction={handleUpdateImageUrl} />
        </div>
        <div className="w-2/3 bg-blue-500">a</div>
      </div>
    </div>
  );
};

export default UserSetting;
