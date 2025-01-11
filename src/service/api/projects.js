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

  static async createProject(project) {
    try {
      const response = await axios.post(`${this.BASE_URL}/projects`, project);
      return response.data;
    } catch (err) {
      console.log("error with creating project: " + err);
    }
  }

  // http://localhost:3031/projects?id=1

  static async getProject(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/projects?id=${id}`);
      return response.data;
    } catch (err) {
      console.log("can not download project: " + err);
    }
  }
}

export default ProjectService;
