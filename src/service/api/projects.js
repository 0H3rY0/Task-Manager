import axios from "axios";

class ProjectService {
  static BASE_URL = "http://localhost:3031";

  static async getAll() {
    try {
      const response = await axios.get(`${this.BASE_URL}/projects`);
      return response.data;
    } catch (err) {
      console.log("get projects error: " + err);
    }
  }

  // http://localhost:3031/projects?id=1

  static async getProject(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/projects?id=${id}`);
      const project = response.data[0];
      return project;
    } catch (err) {
      console.log("can not download project: " + err);
    }
  }

  static async getAppropriateTasks(id) {
    console.log("id:" + id);
    const project = await this.getProject(id);

    console.log("project project: " + project);

    return project.Tasks;
  }

  static async createProject(project) {
    try {
      const response = await axios.post(`${this.BASE_URL}/projects`, project);
      return response.data;
    } catch (err) {
      console.log("error with creating project: " + err);
    }
  }

  static async deleteProject(id) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/projects/${id}`);
      return response.data;
    } catch (err) {
      console.log(
        "Sorry! something went wrong with deleting your project: " + err
      );
    }
  }

  static async deleteAppropriateTask(taskId, projectId) {
    try {
      const project = await this.getProject(projectId);

      const updatedTasks = project.Tasks.filter((task) => {
        return task.id !== taskId;
      });

      const response = await axios.patch(
        `${this.BASE_URL}/projects/${projectId}`,
        {
          Tasks: updatedTasks,
        }
      );
      return response;
    } catch (err) {
      console.log("something goes wrong with deleting task: " + err);
    }
  }

  static async addTaskToProject(newTask, id) {
    try {
      const project = await this.getProject(id);

      console.log("project: " + project.Tasks);

      const updatedTasks = [...project.Tasks, newTask];

      const response = await axios.patch(`${this.BASE_URL}/projects/${id}`, {
        Tasks: updatedTasks,
      });
      return response.data;
    } catch (err) {
      console.log("something goes wrong during updating project: " + err);
    }
  }

  static async updateProjectTask(taskId, projectId, newTask) {
    const project = await this.getProject(projectId);

    const updatedTasks = project.Tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, content: newTask.content };
      }
      return task;
    });

    console.log(updatedTasks);

    const response = await axios.patch(
      `${this.BASE_URL}/projects/${projectId}`,
      {
        Tasks: updatedTasks,
      }
    );

    return response;
  }
}

export default ProjectService;
