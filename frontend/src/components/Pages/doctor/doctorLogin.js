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
      <div className="canvas">
        <section class="h-screen">
          <div class="px-6 text-gray-800">
            <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap  g-6">
              <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 m-3 md:mb-0">
                <img
                  className="imgLog"
                  // src="https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-doctor-appointment-vector-image_2242695.jpg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="w-full"
                  alt="Sample image"
                />
              </div>
              <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                <form>
                  {/* <div class="flex flex-row items-center justify-center lg:justify-start"> */}

                  {/* <!-- Email input --> */}
                  <div class="mb-6">
                    <input
                      type="text"
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                      class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      // onChange={(e) => setLogPass(e.target.value)}
                      // value={logPass}
                      placeholder="Password"
                    />
                  </div>

                  <div class="flex justify-between items-center mb-6">
                    <div class="form-group form-check">
                      {/* <input
                        type="checkbox"
                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck2"
                      /> */}
                      {/* <label
                        class="form-check-label inline-block text-gray-800"
                        for="exampleCheck2"
                      >
                        Remember me
                      </label> */}
                    </div>
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
        </section>
      </div>
    </div>
  );
}

export default DoctorLoginPage;