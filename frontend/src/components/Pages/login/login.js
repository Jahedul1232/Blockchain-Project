const LoginPage = () => {
  return (
    <div className="app">
      <h2>Welcome to the Login page</h2>
      <button onClick={(event) => (window.location.href = "/patient")}>
        Login
      </button>
      <button onClick={(event) => (window.location.href = "/doctor")}>
        Doctor
      </button>
    </div>
  );
};

export default LoginPage;
