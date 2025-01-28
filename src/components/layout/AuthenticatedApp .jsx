import Layout from "./Layout";
import Header from "./Header";
import Navbar from "./Navbar";

const AuthenticatedApp = ({ navbarActive }) => {
  return (
    <>
      <Header />
      {navbarActive && <Navbar navbarActive={navbarActive} />}
      <Layout />
    </>
  );
};

export default AuthenticatedApp;
