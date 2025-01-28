import { FaRegUser } from "react-icons/fa";
import Image from "../components/ui/Image";
import { useEffect, useState, useRef } from "react";
import { useFileUpload } from "../hooks/useFileUpload";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import ModalCheckAgreement from "../components/modals/ModalCheckAgreement";
import * as Dialog from "@radix-ui/react-dialog";

const UserSetting = () => {
  const userInitialState = {
    id: "",
    username: "",
    email: "",
  };
  const { setUserImage } = useAuthStore();
  const [imageUrl, setImageUrl] = useState("");
  const { handleFileUpload } = useFileUpload();
  const [token] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log(jwtDecode(token));
      return jwtDecode(token);
    } else {
      return null;
    }
  });
  const [user, setUser] = useState(userInitialState);
  const [nameUpdateMode, setNameUpdateMode] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          params: { id: token.id },
        });
        setImageUrl(response.data.user.imageUrl);
        setUser(response.data.user);
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

  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/user/delete/image",
        {
          data: {
            id: user.id,
          },
        }
      );
      setImageUrl(null);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error deleting image:",
        error.response?.data || error.message
      );
    }
  };

  const onInputChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNameUpdate = async () => {
    try {
      await axios.put("http://localhost:3000/user/update", {
        id: user.id,
        username: user.username,
      });
      setNameUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
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
      <div className="flex gap-20">
        <div className="w-1/3">
          <Image
            image={imageUrl}
            updateFunction={handleUpdateImageUrl}
            color="border-green-200"
          />
          <div className="flex gap-5 justify-around mt-5">
            {/* tutaj jest button */}
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={handleUpdateImageUrl}
            />
            <label
              htmlFor="upload"
              className="btn text-center bg-green-500 py-2 w-3/6 rounded-full font-semibold text-lg "
            >
              Upload
            </label>

            <ModalCheckAgreement
              titleText={"Are you sure you wnat to remove your image"}
              btnText="remove"
              ownSize={true}
              func={handleDeleteImage}
            >
              <button className="btn bg-red-500 w-full py-2 w-full rounded-full font-semibold text-lg">
                remove
              </button>
            </ModalCheckAgreement>
          </div>
        </div>
        <div className="w-2/3">
          <label
            htmlFor="username"
            className="font-semibold text-slate-800 text-lg"
          >
            Name
          </label>
          <p className="w-full flex justify-between items-center mt-5 mb-14">
            <input
              name="username"
              defaultValue={user.username}
              className="outline-none cursor-pointer"
              ref={nameRef}
              readOnly={!nameUpdateMode}
              onChange={onInputChange}
            />
            {!nameUpdateMode ? (
              <span
                className="text-green-500 cursor-pointer underline"
                onClick={() => {
                  setNameUpdateMode((prev) => !prev);
                  nameRef.current.focus();
                }}
              >
                Edit Name
              </span>
            ) : (
              <ModalCheckAgreement
                titleText={"Are you sure you want to save this name"}
                btnText="Update"
                func={handleNameUpdate}
              >
                <span className="text-green-500 cursor-pointer underline">
                  Save
                </span>
              </ModalCheckAgreement>
            )}
          </p>

          <label
            htmlFor="username"
            className="font-semibold text-slate-800 text-lg"
          >
            E-mail
          </label>
          <p className="w-full flex justify-between items-center mt-5 mb-14">
            <span>John@gmail.com</span>{" "}
            <span className="text-green-500 cursor-pointer underline">
              Change
            </span>
          </p>

          <label
            htmlFor="username"
            className="font-semibold text-slate-800 text-lg"
          >
            Password
          </label>
          <p className="w-full flex justify-between items-center mt-5 mb-14">
            <span>password</span>
            <span className="text-green-500 cursor-pointer underline">
              Change
            </span>
          </p>

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
