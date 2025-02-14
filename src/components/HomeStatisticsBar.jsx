import OwnSelectDayList from "./OwnSelectDayList";
import WelcomeUsername from "./ui/WelcomeUsername";
import CompletedTasks from "./CompletedTasks";
import CreatedProjects from "./CreatedProjects";
import { useEffect, useState } from "react";
import useProjectsStats from "../hooks/useProjectsStats";
import ProjectService from "../service/api/projects";

const HomeStatisticsBar = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const { dependProjects, dependTasks, handleStatsUpdate } = useProjectsStats(
    allProjects,
    allTasks
  );

  useEffect(() => {
    const fetchData = async () => {
      const projects = await ProjectService.getAll();
      const tasks = await ProjectService.getAllTasks();
      setAllProjects(projects);
      setAllTasks(tasks);
    };

    fetchData();
  }, []);

  useEffect(() => {
    handleStatsUpdate(7);
  }, [allProjects, allTasks]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <WelcomeUsername />
      <div
        className="flex md:flex-row flex-col md:px-5 px-2 md:py-4 py-1 shadow-xl md:rounded-full 
      rounded-md bg-gray-200 justify-center md:w-4/5 md:2 w-full gap-4"
      >
        <OwnSelectDayList handleStatsUpdate={handleStatsUpdate} />
        <CompletedTasks dependTasks={dependTasks} />
        <CreatedProjects dependProjects={dependProjects} />
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
