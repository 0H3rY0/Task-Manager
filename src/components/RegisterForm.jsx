import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = ({ setIsLogin }) => {
  const userInitialState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInitialState);
  const [error, setError] = useState("");

  const onInputChange = (e) => {
    setError("");
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { setAccessLimited } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;
    try {
      const data = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
      });
      console.log(data);
      setUser(userInitialState);
      toast("Register success!!");
      setIsLogin(true);
    } catch (error) {
      const newError = error.response.data.error;
      setError(newError);
    }
  };

  return (
    <>
      <h1 className="sm:text-8xl text-6xl text-slate-800 font-bold mb-10">
        Register
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center justify-center gap-2"
      >
        <input
          name="username"
          value={user.username}
          onChange={(e) => onInputChange(e)}
          type="text"
          placeholder="username"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
        <input
          name="email"
          value={user.email}
          onChange={(e) => onInputChange(e)}
          type="text"
          placeholder="email"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6  rounded-sm text-lg border-2 border-grey-200 
          mb-2 focus:border-white focus:ring-2 focus:ring-red-300 outline-none"
        />
        <input
          name="password"
          value={user.password}
          onChange={(e) => onInputChange(e)}
          type="text"
          placeholder="password"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
        {error !== "" && <p className="errorText mb-2">{error}</p>}
        <button
          type="submit"
          className="py-2 px-20 bg-yellow-500 rounded-full font-semibold text-slate-800"
        >
          Sign up
        </button>
        <button
          className="py-2 px-20 bg-orange-500 rounded-full font-semibold text-slate-800"
          onClick={setAccessLimited}
        >
          Go without
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
