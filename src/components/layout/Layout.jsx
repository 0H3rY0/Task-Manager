// import Tasks from "../pages/Tasks";
import Home from "../../pages/Home";
import { Routes, Route } from "react-router";
import PropTypes from "prop-types";
import CreateProject from "../../pages/CreateProject";
import Project from "../../pages/Project";
import ErrorPage from "../../pages/ErrorPage";
import Upcoming from "../../pages/Upcoming";
import AllProjects from "../../pages/AllProjects";
import UserSetting from "../../pages/UserSetting";
import { useNavbarActive } from "../../store/useNavbarActive";

const Layout = () => {
  const { isNavbarActive } = useNavbarActive();

  return (
    <div
      className={
        ` flex items-center justify-center  ` +
        `${
          isNavbarActive
            ? "md:ml-[300px] mt-[300px]  md:mt-0 headerAnimation"
            : "w-full headerAnimation"
        }`
      }
    >
      <Routes>
        <Route path="/user-settings" element={<UserSetting />} />
        <Route path="/" element={<Home />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/project/all" element={<AllProjects />} />
        <Route path="/project/create" element={<CreateProject />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

Layout.propTypes = {
  navbarActive: PropTypes.bool,
};

export default Layout;
