import { MdError } from "react-icons/md";

const ErrorPage = () => {
  return (
    <div className="w-4/5 flex justify-center py-44 flex-col gap-6">
      <div className="flex flex-col items-center justify-center text-center w-full">
        <MdError size={400} className="text-red-500 w-full" />
        <h1 className="font-bold text-2xl">Error 404</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
