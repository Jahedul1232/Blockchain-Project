import { React } from "react";
import "./doctorLogin.css";
import { useNavigate } from "react-router-dom";

function DoctorLoginPage() {
  const navigate = useNavigate();

  function DoctorsLandingPage() {
    const navigateToPatient = () => {
      navigate("/doctorsLandingPage");
    };
    navigateToPatient();
  }
  return (
    <div>
      <h2>Welcome to Doctor's Login Page</h2>
      <div className="mt-3">
        <section class="">
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div className="col-12 col-sm-8 col-md-8 col-lg-5 col-xl-5 ">
                <img
                  class="imgLog2"
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  src="https://cdni.iconscout.com/illustration/premium/thumb/health-team-5159061-4313068.png"
                  // class="w-full"
                  alt="Sample image"
                />
              </div>

              <div class="card rounded-4 mt-5 col-12 col-sm-8 col-md-8 col-lg-5 col-xl-6 shadow-lg">
                <div className="card-body">
                  <div className="mb-5 mt-3">
                    <h3>Doctor Login</h3>
                  </div>
                  <form>
                    {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}

                    {/* <!-- Email input --> */}
                    <div class="mb-6">
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput2"
                        // onChange={(e) => setLogEmail(e.target.value)}
                        // value={logEmail}
                        // onClick={navigateToPatient}
                        placeholder="Email address"
                      />
                    </div>

                    {/* <!-- Password input --> */}
                    <div class="mb-6">
                      <input
                        type="password"
                        class="form-control"
                        id="exampleFormControlInput2"
                        // onChange={(e) => setLogPass(e.target.value)}
                        // value={logPass}
                        placeholder="Password"
                      />
                    </div>
                    <div class="flex justify-between items-center mb-6">
                      <a href="#!" class="text-gray-800">
                        Forgot password?
                      </a>
                    </div>

                    <div class="text-center lg:text-left">
                      <button
                        type="button"
                        class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={DoctorsLandingPage}
                      >
                        Login
                      </button>
                      <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <a
                          href="#!"
                          class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                          onClick={""}
                        >
                          Register
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DoctorLoginPage;
