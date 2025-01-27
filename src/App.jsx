import { useEffect, useState } from "react";
import UnauthenticatedApp from "./components/layout/UnauthenticatedApp ";
import AuthenticatedApp from "./components/layout/AuthenticatedApp ";
import { useAuthStore } from "./store/useAuthStore";
import { ToastContainer } from "react-toastify";

function App() {
  const [navbarActive, setNavbarActive] = useState(false);
  const { isAuthenticated, access, initializeAuth } = useAuthStore();

  console.log(isAuthenticated, access);

  useEffect(() => {
    initializeAuth(); // Sprawdź token w localStorage przy starcie
  }, [initializeAuth]);

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
      <ToastContainer />
    </>
  );
}

export default App;
