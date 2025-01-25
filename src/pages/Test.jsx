import { useAuthStore } from "../store/useAuthStore";

const Test = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <p>Test</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Test;
