import { FaRegUser } from "react-icons/fa";
import Image from "../components/ui/Image";
import { useEffect, useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const UserSetting = () => {
  const { setUserImage } = useAuthStore();
  const [imageUrl, setImageUrl] = useState("");
  const { handleFileUpload } = useFileUpload();
  const [token] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          params: { id: token.id },
        });
        setImageUrl(response.data.user.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const handleUpdateImageUrl = (e) => {
    handleFileUpload(e, async (newImageUrl) => {
      try {
        const data = await axios.put("http://localhost:3000/user/update", {
          id: token.id,
          imageUrl: newImageUrl,
        });
        console.log(data);
        setUserImage(newImageUrl);
        setImageUrl(newImageUrl);
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
    <div className="w-10/12 flex flex-col justify-between py-16 gap-6 bg-black">
      <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
        Upcoming
        <FaRegUser className="text-green-500" size={30} />
      </h2>
      <div className="flex">
        <div className="w-1/3 bg-yellow-500">
          <Image image={imageUrl} updateFunction={handleUpdateImageUrl} />
        </div>
        <div className="w-2/3 bg-blue-500">a</div>
      </div>
    </div>
  );
};

export default UserSetting;
