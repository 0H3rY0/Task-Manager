import { SiTask } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";
// import axios from "axios";
// import { useAuthStore } from "../store/useAuthStore";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // const { setAuthenticated, setAccessLimited } = useAuthStore();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = await axios.post("http://localhost:3000/login", {
  //       email,
  //       password,
  //     });
  //     console.log(data);
  //     setAuthenticated();
  //   } catch (error) {
  //     console.log("something goes wrong with axios: " + error);
  //   }
  // };

  return (
    <div className="w-full h-[100vh]">
      <div className="flex h-[10vh] items-center justify-start ">
        <h1 className="text-2xl text-slate-800 font-bold flex gap-2 items-center ml-5">
          <SiTask size={50} /> Task Manager
        </h1>
      </div>
      <div className="w-full h-[90vh] bg-red flex flex-col justify-center items-center gap-2">
        {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
        {isLogin ? (
          <a href="">
            <p className="text-lg text-green-800 underline">Forgot Password?</p>
          </a>
        ) : (
          ""
        )}

        <span className="text-gray-500 text-lg mb-5">or</span>
        <button
          className="bg-blue-400 py-3 w-5/6 md:w-3/6 lg:w-2/6 rounded-full text-white mb-2 flex gap-2 items-center justify-center
        btn hover:bg-blue-300 active: bg-blue-400 font-semibold"
        >
          <FaGoogle size={30} /> Continue with Google
        </button>
        <button
          className="bg-blue-800 py-3 w-5/6 md:w-3/6 lg:w-2/6 rounded-full text-white flex gap-2 justify-center items-center
        btn hover:bg-blue-700 active: bg-blue-800 font-semibold"
        >
          <FaFacebookF size={30} /> Continue with Facebook
        </button>
        <p className="mt-3 text-lg text-slate-800">
          Not a member yet?{" "}
          <span
            className="text-green-800 underline cursor-pointer"
            onClick={() => setIsLogin((prev) => !prev)}
          >
            {isLogin ? "Create an account" : "Login with your account"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
