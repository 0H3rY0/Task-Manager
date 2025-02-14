import { BsCheck2Circle } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getProjectByTaskId } from "../utils/functions/getProjectByTaskId";

const HomeTaskList = ({ dependTimeTasks }) => {
  const navigate = useNavigate();

  const handleGoToProject = async (taskId) => {
    const projectID = await getProjectByTaskId(taskId);
    navigate(`project/${projectID}`);
  };

  return (
    <div className="w-full mt-4">
      <ul>
        {dependTimeTasks.map((item) => (
          <li
            key={item.id}
            className="border-b-2 border-slate-200 px-2 py-1 mb-2 grid grid-cols-1 lg:grid-cols-8  gap-2 items-center justify-between text-lg text-slate-700"
          >
            <p className="flex items-center justify-start gap-2 lg:col-span-5 md:col-span-6 ">
              <BsCheck2Circle size={30} /> {item.content}
            </p>

            <p className="font-semibold items-end lg:text-center text-start text-nowrap">
              {item.deadline}
            </p>

            <p className="font-semibold items-end lg:text-center text-start">
              {item.importance}
            </p>

            <button
              className="btn items-end bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md"
              onClick={() => handleGoToProject(item.id)}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTaskList;
