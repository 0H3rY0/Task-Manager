import OwnSelectDayList from "./ui/OwnSelectDayList";
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
      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <OwnSelectDayList handleStatsUpdate={handleStatsUpdate} />
        <CompletedTasks dependTasks={dependTasks} />
        <CreatedProjects dependProjects={dependProjects} />
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
