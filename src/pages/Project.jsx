import { AiOutlineProject } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import profile from "../assets/images/profile.jpg";
import Tasks from "./Tasks";
import { useParams } from "react-router";
import { useEffect } from "react";
import ProjectService from "../service/api/projects";

const Project = () => {
  const { id } = useParams();

  useEffect(() => {
    console.log(ProjectService.getProject(1));
  }, []);

  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Project <AiOutlineProject className="text-orange-500" size={26} />
        </h2>

        <button className="btn-red flex items-center gap-2">
          <RiDeleteBack2Fill size={20} /> Delete Project
        </button>
      </div>
      <div className="flex w-full gap-10 ">
        <div className="w-2/5 flex flex-col items-start gap-3">
          <img
            src={profile}
            alt=""
            className="w-full h-[200px] border-4 border-orange-500 rounded-md"
          />
          <h3 className="text-2xl font-bold text-slate-600 tracking-wide leading-relaxed">
            Title: <span className="text-red-500">Project Title</span>
          </h3>
          <h4 className="text-lg font-bold text-slate-600 tracking-wide leading-relaxed">
            Pioreiety: <span className="text-orange-500">Low</span> <br />
            Deadline: <span className="text-orange-500">2025-12-12</span>
          </h4>
        </div>
        <div className="w-3/5 flex flex-col justify-start gap-2">
          <h3 className="text-lg font-bold text-slate-700 tracking-wide leading-relaxed ">
            Description:{" "}
          </h3>
          <p className="font-semibold text-md text-gray-600 tracking-wide leading-relaxed">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here, content
            making it look like readable English. Many desktop publishing
          </p>
        </div>
      </div>
      <Tasks />
    </div>
  );
};

export default Project;
