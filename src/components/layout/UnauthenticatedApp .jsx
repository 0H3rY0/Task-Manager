import Layout from "./Layout";
import Login from "../../pages/Login";
import { useAuthStore } from "../../store/useAuthStore";
import Header from "./Header";
import Navbar from "./Navbar";

const UnauthenticatedApp = ({ navbarActive, setNavbarActive }) => {
  const { access } = useAuthStore();

  return (
    <>
      {access !== "full" ? (
        <>
          <Header
            setNavbarActive={setNavbarActive}
            navbarActive={navbarActive}
          />
          {navbarActive && <Navbar navbarActive={navbarActive} />}
          <Layout navbarActive={navbarActive} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UnauthenticatedApp;
