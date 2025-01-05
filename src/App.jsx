import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { useState } from "react";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);

  return (
    <>
      <Header setNavbarActive={setNavbarActive} navbarActive={navbarActive} />
      {navbarActive && <Navbar navbarActive={navbarActive} />}
      <Layout navbarActive={navbarActive} />
    </>
  );
}

export default App;
