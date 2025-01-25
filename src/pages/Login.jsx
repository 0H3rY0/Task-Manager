import { SiTask } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="flex h-[10vh] items-center justify-start ">
        <h1 className="text-2xl text-slate-800 font-bold flex gap-2 items-center ml-5">
          <SiTask size={50} /> Task Manager
        </h1>
      </div>
      <div className="w-full h-[90vh] bg-red flex flex-col justify-center items-center gap-2">
        <h1 className="text-8xl text-slate-800 font-bold mb-10">Login</h1>
        <input
          type="text"
          placeholder="email"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-2/6  rounded-sm text-lg border-2 border-grey-200 
          mb-2 focus:border-white focus:ring-2 focus:ring-red-300 outline-none"
        />
        <input
          type="text"
          placeholder="password"
          className="py-2 px-1 w-5/6 md:w-3/6 lg:w-2/6 rounded-sm text-lg border-2 border-grey-200
           mb-2 focus:ring-2 focus:ring-red-300 outline-none "
        />
        <button className="py-2 px-20 bg-yellow-500 rounded-full font-semibold text-slate-800">
          Sign in
        </button>
        <a href="">
          <p className="text-lg text-green-800 underline">Forgot Password?</p>
        </a>
        <span className="text-gray-500 text-lg mb-5">or</span>
        <button className="bg-blue-400 py-3 w-5/6 md:w-3/6 lg:w-2/6 rounded-full text-white mb-2 flex gap-2 items-center justify-center">
          <FaGoogle size={30} /> Continue with Google
        </button>
        <button className="bg-blue-800 py-3 w-5/6 md:w-3/6 lg:w-2/6 rounded-full text-white flex gap-2 justify-center items-center">
          <FaFacebookF size={30} /> Continue with Facebook
        </button>
        <p className="mt-3 text-lg text-slate-800">
          Not a member yet?{" "}
          <a href="" className="text-green-800 underline">
            Create an account
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
