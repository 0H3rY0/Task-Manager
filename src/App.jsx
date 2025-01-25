import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);
  const [test, setTest] = useState(true);

  return (
    <>
      {test ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Header
            setNavbarActive={setNavbarActive}
            navbarActive={navbarActive}
          />
          {navbarActive && <Navbar navbarActive={navbarActive} />}
          <Layout navbarActive={navbarActive} />
        </>
      )}
    </>
  );
}

export default App;
