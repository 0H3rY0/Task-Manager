import { useState } from "react";

const EditEmail = ({ user }) => {
  const [emailMessage, setEmailMessage] = useState(null);

  return (
    <>
      <label
        htmlFor="username"
        className="font-semibold text-slate-800 text-lg"
      >
        E-mail
      </label>
      <p
        className={
          "w-full flex justify-between items-center mt-5 mb-14 " +
          `${emailMessage && "mb-2"}`
        }
      >
        <span>{user.email}</span>
        <span
          className="text-green-500 cursor-pointer underline"
          onClick={() => setEmailMessage((prev) => !prev)}
        >
          Change
        </span>
      </p>
      {emailMessage && (
        <p className="errorText mb-12">
          If you want change e-mail conntact with support
        </p>
      )}
    </>
  );
};

export default EditEmail;
