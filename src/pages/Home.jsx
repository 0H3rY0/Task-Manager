import { FaHome } from "react-icons/fa";
import HomeNewsSection from "../components/HomeNewsSection";
import HomeStatisticsBar from "../components/HomeStatisticsBar";
import { BsCheck2Circle } from "react-icons/bs";
import HomeTasks from "../components/HomeTasks";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apolloClient";

const Home = () => {
  return (
    <div className="w-4/5 flex justify-center py-16  flex-col gap-6">
      <div className="flex md:items-center md:justify-between md:flex-row flex-col items-start md:gap-0 gap-2">
        <h2 className="font-bold text-2xl text-slate-700 flex gap-2 items-center">
          Home <FaHome className="text-blue-500" size={26} />
        </h2>
      </div>
      <HomeStatisticsBar />
      <ApolloProvider client={client}>
        <HomeNewsSection />
      </ApolloProvider>
      <h2 className="font-semibold text-2xl mb-2 text-slate-800 flex items-center gap-2 mt-5">
        Tasks <BsCheck2Circle size={30} />
      </h2>
      <HomeTasks />
    </div>
  );
};

export default Home;
