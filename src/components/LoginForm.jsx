import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setAuthenticated, setAccessLimited } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log(response);
      // localStorage.setItem("authToken", response.data.token);
      setAuthenticated(response.data.token);
    } catch (error) {
      console.log(error.response.data.error);
      const newError = error.response.data.error;
      setError(newError);
    }
  };

  return (
    <>
      <h1 className="sm:text-8xl text-6xl text-slate-800 font-bold mb-10">
        Login
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col w-full items-center justify-center gap-2"
      >
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          type="text"
          placeholder="email"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-2/6  rounded-sm text-lg border-2 border-grey-200 
          mb-2 focus:border-white focus:ring-2 focus:ring-red-300 outline-none"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          type="text"
          placeholder="password"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-2/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
        {error !== "" && <p className="errorText mb-2">{error}</p>}

        <button
          type="submit"
          className="py-2 px-20 bg-yellow-500 rounded-full text-slate-800 btn hover:bg-yellow-400 active:bg-yellow-500 font-semibold"
        >
          Sign in
        </button>
        <button
          className="py-2 px-20 bg-orange-500 rounded-full text-slate-800 btn hover:bg-orange-400 active: bg-orange-500 font-semibold"
          onClick={setAccessLimited}
        >
          Go without
        </button>
      </form>
    </>
  );
};

export default LoginForm;
