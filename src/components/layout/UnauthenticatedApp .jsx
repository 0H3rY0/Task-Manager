import Layout from "./Layout";
import Login from "../../pages/Login";
import { useAuthStore } from "../../store/useAuthStore";
import Header from "./Header";
import Navbar from "./Navbar";

const UnauthenticatedApp = ({ navbarActive }) => {
  const { access } = useAuthStore();

  return (
    <>
      {access !== "full" ? (
        <>
          <Header />
          {navbarActive && <Navbar navbarActive={navbarActive} />}
          <Layout />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UnauthenticatedApp;
