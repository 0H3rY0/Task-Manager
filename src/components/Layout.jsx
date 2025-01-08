import Tasks from "../pages/Tasks";
import Test from "../pages/Test";
import { Routes, Route } from "react-router";
import PropTypes from "prop-types";

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
        <Route path="/" element={<Test />}></Route>
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
};

Layout.propTypes = {
  navbarActive: PropTypes.bool,
};

export default Layout;
