import ProjectService from "../../service/api/projects";

export const getProjectByTaskId = async (taskId) => {
  try {
    const projects = await ProjectService.getAll();

    const foundProject = projects.find((project) =>
      project.Tasks.some((task) => task.id === taskId)
    );

    if (foundProject) {
      //   console.log("znaleziono projekt: " + foundProject.id);
      return foundProject.id;
    } else {
      console.log("nie znaleziono projektu ");
    }
  } catch (error) {
    console.log("error with project id: " + error);
  }
};
