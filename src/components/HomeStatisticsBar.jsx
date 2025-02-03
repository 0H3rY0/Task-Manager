import OwnSelectDayList from "./ui/OwnSelectDayList";
import WelcomeUsername from "./ui/WelcomeUsername";
import CompletedTasks from "./CompletedTasks";
import CreatedProjects from "./CreatedProjects";
import { useEffect, useState } from "react";
import ProjectService from "../service/api/projects";

const HomeStatisticsBar = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [dependProjects, setDependProjects] = useState([]);

  const [allTasks, setAllTasks] = useState([]);
  const [dependTasks, setDependTasks] = useState([]);

  useEffect(() => {
    const getAllProjects = async () => {
      const projectResponse = await ProjectService.getAll();
      const tasksResponse = await ProjectService.getAllTasks();
      setAllProjects(projectResponse);
      setAllTasks(tasksResponse);
    };

    getAllProjects();
  }, []);

  useEffect(() => {
    createdProjectsStats(7);
    completedTasksStats(7);
  }, [allProjects]);

  const createdProjectsStats = (lastDayCreatedAt = 7) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdatedAt = new Date(today);
    lastUpdatedAt.setDate(today.getDate() - lastDayCreatedAt);

    setDependProjects(
      allProjects.filter((project) => {
        const projectCreateDate = new Date(project.CreatedAt);
        projectCreateDate.setHours(0, 0, 0, 0);

        return projectCreateDate > lastUpdatedAt;
      })
    );
  };

  const completedTasksStats = (lastUpdate = 7) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdatedAt = new Date(today);
    lastUpdatedAt.setDate(today.getDate() - lastUpdate);

    setDependTasks(
      allTasks.filter((task) => {
        const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
        taskLastUpdateDate.setHours(0, 0, 0, 0);

        return taskLastUpdateDate > lastUpdatedAt && task.status.done;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <WelcomeUsername />
      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <OwnSelectDayList
          createdProjectsStats={createdProjectsStats}
          completedTasksStats={completedTasksStats}
        />
        <CompletedTasks dependTasks={dependTasks} />
        <CreatedProjects dependProjects={dependProjects} />
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
