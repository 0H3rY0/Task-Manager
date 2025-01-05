import Tasks from "../pages/Tasks";

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
      <Tasks />
    </div>
  );
};

export default Layout;
