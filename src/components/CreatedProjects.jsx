// import { useEffect, useState } from "react";
import { MdOutlinePending } from "react-icons/md";
// import ProjectService from "../service/api/projects";

const CreatedProjects = ({ dependProjects }) => {
  //   const [allProjects, setAllProjects] = useState([]);
  //   const [dependProjects, setDependProjects] = useState([]);

  //   useEffect(() => {
  //     const getAllProjects = async () => {
  //       const response = await ProjectService.getAll();
  //       setAllProjects(response);
  //     };

  //     getAllProjects();
  //   }, []);

  //   useEffect(() => {
  //     createdProjectsStats(30);
  //   }, [allProjects]);

  //   const createdProjectsStats = (lastDayCreatedAt = 7) => {
  //     const today = new Date();
  //     today.setHours(0, 0, 0, 0);

  //     const lastUpdatedAt = new Date(today);
  //     lastUpdatedAt.setDate(today.getDate() - lastDayCreatedAt);

  //     setDependProjects(
  //       allProjects.filter((project) => {
  //         const projectCreateDate = new Date(project.CreatedAt);
  //         projectCreateDate.setHours(0, 0, 0, 0);

  //         return projectCreateDate > lastUpdatedAt;
  //       })
  //     );
  //   };

  return (
    <p className="font-semibold text-slate-800 px-6 py-1 flex items-center justify-center gap-2 ">
      <span className="font-bold text-2xl flex justify-center items-center gap-1">
        <MdOutlinePending size={30} /> {dependProjects.length}
      </span>
      Created projects
    </p>
  );
};

export default CreatedProjects;
