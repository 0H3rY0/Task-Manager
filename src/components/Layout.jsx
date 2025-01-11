import Tasks from "../pages/Tasks";
import Test from "../pages/Test";
import { Routes, Route } from "react-router";
import PropTypes from "prop-types";
import ProjectList from "../pages/ProjectList";
import CreateProject from "../pages/CreateProject";
import { ToastContainer } from "react-toastify";
import Project from "../pages/Project";

const Layout = ({ navbarActive }) => {
  return (
    <div
      className={
        ` flex items-center justify-center ` +
        `${
          navbarActive
            ? "md:ml-[300px] mt-[300px]  md:mt-0 headerAnimation"
            : "w-full headerAnimation"
        }`
      }
    >
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/all" element={<ProjectList />} />
        <Route path="/project/create" element={<CreateProject />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

Layout.propTypes = {
  navbarActive: PropTypes.bool,
};

export default Layout;
