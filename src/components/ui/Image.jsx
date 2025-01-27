import { SiTask } from "react-icons/si";

const Image = ({ image, updateFunction, color }) => {
  return (
    <div
      className={
        `relative min-h-[250px] w-full p-4 border-2 rounded-lg  
        flex items-center justify-center group bg-white z-0 border-orange-200` +
        `${color ? ` ${color}` : ""}`
      }
    >
      {image ? (
        <img
          src={image}
          alt="image"
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <SiTask size={150} className="text-orange-500" />
      )}

      <div
        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
    opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
      >
        <span className="text-white text-lg font-semibold cursor-pointer">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => updateFunction(e)}
          />
          <label htmlFor="fileInput">Change image</label>
        </span>
      </div>
    </div>
  );
};

export default Image;
