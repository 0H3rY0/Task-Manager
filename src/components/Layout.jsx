import Tasks from "../pages/Tasks";

const Layout = ({ navbarActive }) => {
  return (
    <div
      className={
        `bg-blue-300 ` +
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
