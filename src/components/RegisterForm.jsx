import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { setAuthenticated, setAccessLimited } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(data);
      setAuthenticated();
    } catch (error) {
      console.log("something goes wrong with axios: " + error);
    }
  };

  return (
    <>
      <h1 className="sm:text-8xl text-6xl text-slate-800 font-bold mb-10">
        Register
      </h1>
      <form
        action=""
        // onSubmit={handleSubmit}
        className="flex flex-col w-full items-center justify-center gap-2"
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6  rounded-sm text-lg border-2 border-grey-200 
          mb-2 focus:border-white focus:ring-2 focus:ring-red-300 outline-none"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-3/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
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
