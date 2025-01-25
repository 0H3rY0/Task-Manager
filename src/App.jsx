import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Layout from "./components/layout/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);
  const [test, setTest] = useState(true);

  return (
    <>
      {/* {test ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : ( */}
      <>
        <Header setNavbarActive={setNavbarActive} navbarActive={navbarActive} />
        {navbarActive && <Navbar navbarActive={navbarActive} />}
        <Layout navbarActive={navbarActive} />
      </>
      {/* )} */}
    </>
  );
}

export default App;
