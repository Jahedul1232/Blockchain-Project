import Body from "../HomePage/Body/Body";
// import image from "../../../assets/history1";

const LoginPage = () => {
  return (
    <div className="login">
      <div>
        <Body />
      </div>
      {/* <div className="login">
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
      </div> */}
      <div className="loginButton" id="text">
        <h2>Welcome to Login</h2>
        <div className="container py-5 my-5 buttonBoxes">
          <div className="row">
            <div className="col-6 col-lg-3 col-xl-3">
              <div className="firstButtonBox">
                {/* <img src={image} alt=""></img> */}
                <button>Patient</button>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-lg-3 col-md-3">
              <div className="socondButtonBox">
                {/* <img src={image} alt=""></img> */}
                <button>Doctor</button>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-lg-3 col-md-3">
              <div className="thirdButtonBox">
                {/* <img src={image} alt=""></img> */}
                <button>HIS</button>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-lg-3 col-md-3">
              <div className="forthButtonBox">
                {/* <img src={image} alt=""></img> */}
                <button>Record View</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
