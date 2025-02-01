import { BsCheck2Circle } from "react-icons/bs";

const HomeTaskList = ({ dependTimeTasks }) => {
  return (
    <div className="w-full mt-4">
      <ul>
        {dependTimeTasks.map((item) => (
          <li
            key={item.id}
            className="border-b-2 border-slate-200 px-2 py-1 mb-2 flex gap-2 items-center justify-between text-lg text-slate-700"
          >
            <p className="flex items-center justify-start gap-2">
              <BsCheck2Circle size={30} /> {item.content}
            </p>

            <div className="flex items-center gap-4">
              <button className="btn bg-white border-2 border-blue-500 rounded-md px-2 py-1 font-semibold text-md">
                show
              </button>
              <p className="font-semibold">{item.deadline}</p>
              <p className="font-semibold">{item.importance}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTaskList;
