import Layout from "./Layout";
import Header from "./Header";
import Navbar from "./Navbar";

const AuthenticatedApp = ({ navbarActive, setNavbarActive }) => {
  return (
    <>
      <Header setNavbarActive={setNavbarActive} navbarActive={navbarActive} />
      {navbarActive && <Navbar navbarActive={navbarActive} />}
      <Layout navbarActive={navbarActive} />
    </>
  );
};

export default AuthenticatedApp;
