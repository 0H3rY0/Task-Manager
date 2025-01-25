import { useState } from "react";
import Layout from "./Layout";
import Login from "../../pages/Login";

const UnauthenticatedApp = () => {
  const [moveToApp, setMoveToApp] = useState(false);

  return <>{moveToApp ? <Layout /> : <Login />}</>;
};

export default UnauthenticatedApp;
