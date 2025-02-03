import { useState } from "react";

const useProjectsStats = (allProjects, allTasks) => {
  const [dependProjects, setDependProjects] = useState([]);
  const [dependTasks, setDependTasks] = useState([]);

  const createdProjectsStats = (lastDayCreatedAt = 7) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdatedAt = new Date(today);
    lastUpdatedAt.setDate(today.getDate() - lastDayCreatedAt);

    return allProjects.filter((project) => {
      const projectCreateDate = new Date(project.CreatedAt);
      projectCreateDate.setHours(0, 0, 0, 0);

      return projectCreateDate > lastUpdatedAt;
    });
  };

  const completedTasksStats = (lastUpdate = 7) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastUpdatedAt = new Date(today);
    lastUpdatedAt.setDate(today.getDate() - lastUpdate);

    return allTasks.filter((task) => {
      const taskLastUpdateDate = new Date(task.status.lastUpdatedAt);
      taskLastUpdateDate.setHours(0, 0, 0, 0);

      return taskLastUpdateDate > lastUpdatedAt && task.status.done;
    });
  };

  const handleStatsUpdate = (days) => {
    setDependProjects(createdProjectsStats(days));
    setDependTasks(completedTasksStats(days));
  };

  return { dependProjects, dependTasks, handleStatsUpdate };
};

export default useProjectsStats;
