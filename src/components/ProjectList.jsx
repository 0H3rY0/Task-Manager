import { SiTask } from "react-icons/si";
import { NavLink } from "react-router";

const ProjectList = ({
  projectsList,
  textReducer = () => {},
  isPurple = false,
}) => {
  return (
    <ul className="flex flex-col gap-6">
      {projectsList.map((item, index) => (
        <li
          key={index}
          className="py-4 md:px-4 px-2 rounded-md flex items-center min-h-30 shadow-md flex-col md:flex-row justify-center"
        >
          <div className="flex justify-center items-center w-1/5">
            {item.ImageUrl !== "" ? (
              <img className="w-[100px] h-[100px]" src={item.ImageUrl}></img>
            ) : (
              <SiTask size={70} className="text-orange-500" />
            )}
          </div>
          <div className="md:w-3/5 w-4/5 flex flex-col gap-3 items-center md:items-start text-center md:text-start">
            <div>
              <h3 className="font-bold text-2xl text-slate-700 ">
                {item.Title}
              </h3>
              <p className="font-semibold text-lg text-slate-500 ">
                {textReducer(item.Description)}
              </p>
            </div>
            <div>
              <NavLink to={`/project/${item.id}`}>
                <button className="btn-gray px-24">Watch more</button>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col md:justify-end md:items-end items-center justify-center w-1/5 md:gap-14 gap-2 mt-5 md:mt-0">
            <p className="flex gap-1 font-semibold text-slate-700">
              Importance:{" "}
              <span
                className={`${
                  isPurple ? "text-purple-500" : "text-orange-500"
                } `}
              >
                {item.Importance}
              </span>
            </p>
            <p className="flex gap-1 font-semibold text-slate-700">
              DeadLine:{" "}
              <span
                className={
                  `${isPurple ? "text-purple-500" : "text-orange-500"} ` +
                  `whitespace-nowrap `
                }
              >
                {item.Deadline}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
