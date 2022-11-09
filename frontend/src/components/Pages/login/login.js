import Body from "../HomePage/Body/Body";

const LoginPage = () => {
  return (
    <div className="login">
      <div>
        <Body />
      </div>
      <div className="login">
        <h2>Welcome to the Login page</h2>
        <button
          class="bg-sky-500 hover:bg-sky-700 ..."
          onClick={(event) => (window.location.href = "/patient")}
        >
          Login
        </button>
        <button
          class="btn btn-secondary"
          onClick={(event) => (window.location.href = "/doctor")}
        >
          Doctor
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
