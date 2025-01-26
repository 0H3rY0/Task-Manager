import { useAuthStore } from "../store/useAuthStore";

const Test = () => {
  const { logout, setAccessFull, isAuthenticated } = useAuthStore();

  return (
    <div>
      <p>Test</p>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={setAccessFull}>Login</button>
      )}
    </div>
  );
};

export default Test;
