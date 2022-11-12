import "./Body.css";
import image from "../../../../assets/mobile_data.jpg"
import left_image from "../../../../assets/node.png"
// import middle_image from "../../../../assets/Blockchain_image.jpg"
import right_image from "../../../../assets/history1.png"
import middle_image from "../../../../assets/blockchain.png"


function Body() {
  return (
    <div>
      <div class="flex flex-row">
        <div class="basis-2/3">
          <div className="title">
            <h2>
              Blockchain Based Patient Record <br /> Linkage System
            </h2>
          </div>
          <div className="after_title">
            A nation wide project for storing patients health records
            <br />A product developed by eSRD Lab
          </div>
          <div className="button">
            <button>Get Started</button>
          </div>
        </div>
        <div class="basis-1/3">
          <div className="image_grid">
            <img src={image} alt=""></img>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container-fluid boxes py-5 my-5" id="text">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
              <div className="left_one">
                <div className="left_box_design">
                  <div className="box_image">
                    <img src={left_image} class="fluid-img" alt=""></img>
                  </div>
                  <div className="left_title">
                    Every node in the network has a copy of the digital ledger
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="middle_one">
                <div className="middle_box_design">
                  <div className="box_image">
                    <img src={middle_image} class="fluid-img" alt=""></img>
                  </div>
                  {/* <div className="middle_title">Blockchain</div> */}
                  <h1 className="middle_title">
                    A digital database or ledger that is distributed among of a
                    peer-to-peer network
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <div className="right_one">
                <div className="box_image">
                  <img src={right_image} class="fluid-img" alt=""></img>
                </div>
                <div className="right_title">
                  Maintains a complete history of past transactions within the
                  network
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
