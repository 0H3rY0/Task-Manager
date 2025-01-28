import { useEffect, useState } from "react";
import UnauthenticatedApp from "./components/layout/UnauthenticatedApp ";
import AuthenticatedApp from "./components/layout/AuthenticatedApp ";
import { useAuthStore } from "./store/useAuthStore";
import { ToastContainer } from "react-toastify";
import { useNavbarActive } from "./store/useNavbarActive";

function App() {
  // const [navbarActive, setNavbarActive] = useState(false);
  const { isAuthenticated, access, initializeAuth } = useAuthStore();
  const { isNavbarActive, setIsNavbarActive } = useNavbarActive();

  console.log(isAuthenticated, access);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      {isAuthenticated && access === "full" ? (
        <AuthenticatedApp navbarActive={isNavbarActive} />
      ) : (
        <UnauthenticatedApp navbarActive={isNavbarActive} />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
