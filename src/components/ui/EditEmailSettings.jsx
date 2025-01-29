// import { useState } from "react";

import { useUserStore } from "../../store/useUserStore";

const EditEmailSettings = ({ user }) => {
  //   const initialEmailSettingsState = {
  //     reciveEmailsUpdates: false,
  //     reciveEmailsProgress: false,
  //   };
  //   const [emailSettings, setEmailSettings] = useState(initialEmailSettingsState);

  //   console.log(emailSettings);

  //   const onInputChange = (e) => {
  //     setEmailSettings((prev) => ({
  //       ...prev,
  //       [e.target.name]: e.target.checked,
  //     }));
  //   };
  const { setUserEmailSettings } = useUserStore();
  console.log(user);

  const onInputChange = (e) => {
    if (e.target.checked === true) {
      setUserEmailSettings(e.target.name, 0);
      return;
    }
    setUserEmailSettings(e.target.name, 1);
  };

  return (
    <>
      <label
        htmlFor="username"
        className="font-semibold text-slate-800 text-lg"
      >
        E-mail settings
      </label>
      <p className="w-full flex justify-between items-center mt-5 mb-8 ">
        <span>Do you want to receive notifications about updates?</span>
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            name="receiveUpdatesEmails"
            type="checkbox"
            className="sr-only peer"
            checked={user.receiveUpdatesEmails}
            onChange={(e) =>
              setUserEmailSettings(e.target.name, e.target.checked)
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
        </label>
      </p>
      <p className="w-full flex justify-between items-center mt-5 mb-8">
        <span>Do you want to receive notifications about your progress?</span>
        <label className="inline-flex items-center me-5 cursor-pointer">
          <input
            type="checkbox"
            name="receiveProgressEmails"
            className="sr-only peer"
            checked={user.receiveProgressEmails === 0 ? false : true}
            onChange={(e) =>
              setUserEmailSettings(e.target.name, e.target.checked)
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
        </label>
      </p>
    </>
  );
};

export default EditEmailSettings;
