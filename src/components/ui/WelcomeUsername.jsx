import { months } from "../../service/data/months";
import { days } from "../../service/data/days";
import { useUserStore } from "../../store/useUserStore";
import { useAuthStore } from "../../store/useAuthStore";

const WelcomeUsername = () => {
  const todayDate = new Date();
  const day = days[todayDate.getDay()];
  const month = months[todayDate.getMonth()];
  const date = day + ", " + month + " " + todayDate.getDate();

  const { user } = useUserStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <span className="text-slate-800 text-lg">{date}</span>
      <p className="text-slate-800 text-4xl font-semibold">
        {isAuthenticated ? "Hello, " + user.username : "Hello"}
      </p>
    </>
  );
};

export default WelcomeUsername;
