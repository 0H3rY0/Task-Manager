import { useState } from "react";
import UnauthenticatedApp from "./components/layout/UnauthenticatedApp ";
import AuthenticatedApp from "./components/layout/AuthenticatedApp ";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);
  const { isAuthenticated, access } = useAuthStore();

  console.log(isAuthenticated, access);

  return (
    <>
      {isAuthenticated && access === "full" ? (
        <AuthenticatedApp
          navbarActive={navbarActive}
          setNavbarActive={setNavbarActive}
        />
      ) : (
        <UnauthenticatedApp
          navbarActive={navbarActive}
          setNavbarActive={setNavbarActive}
        />
      )}
    </>
  );
}

export default App;
