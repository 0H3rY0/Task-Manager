import OwnSelectDayList from "./ui/OwnSelectDayList";
import WelcomeUsername from "./ui/WelcomeUsername";
import CompletedTasks from "./CompletedTasks";
import CreatedProjects from "./CreatedProjects";

const HomeStatisticsBar = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <WelcomeUsername />
      <div className="flex px-5 py-4 shadow-xl rounded-full bg-gray-200">
        <OwnSelectDayList />
        <CompletedTasks />
        <CreatedProjects />
      </div>
    </div>
  );
};

export default HomeStatisticsBar;
