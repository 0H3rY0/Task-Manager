const Login = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="flex h-[10vh] items-center justify-start bg-orange-100">
        Task Manager
      </div>
      <div className="w-full h-[90vh] bg-red flex flex-col justify-center items-center bg-yellow-100">
        <h1>Login</h1>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="password" />
        <button>Sign in</button>
        <p>Forgot Password?</p>
        <p>or</p>
        <button>Google</button>
        <button>facebook</button>
      </div>
    </div>
  );
};

export default Login;
