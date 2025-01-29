import ModalCheckAgreement from "../modals/ModalCheckAgreement";
import axios from "axios";
import { useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";

const EditName = ({ user }) => {
  const [nameUpdateMode, setNameUpdateMode] = useState(false);
  const nameRef = useRef(null);
  const { setUserName } = useUserStore();

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

  return (
    <>
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
          onChange={(e) => setUserName(e.target.value)}
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
    </>
  );
};

export default EditName;
