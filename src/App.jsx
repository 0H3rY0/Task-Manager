import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Layout from "./components/layout/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import UnauthenticatedApp from "./components/layout/UnauthenticatedApp ";
import AuthenticatedApp from "./components/layout/AuthenticatedApp ";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);
  const { isAuthenticated, access } = useAuthStore();

  console.log(isAuthenticated, access);

  return (
    <>
      {/* {test ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : ( */}
      {/* <>
        <Header setNavbarActive={setNavbarActive} navbarActive={navbarActive} />
        {navbarActive && <Navbar navbarActive={navbarActive} />}
        <Layout navbarActive={navbarActive} />
      </> */}
      {/* )} */}
      {isAuthenticated && access === "full" ? (
        <AuthenticatedApp
          navbarActive={navbarActive}
          setNavbarActive={setNavbarActive}
        />
      ) : (
        <UnauthenticatedApp />
      )}
    </>
  );
}

export default App;
