import "./Body.css";

function Body() {
  return (
    <div>
      <div class="grid grid-flow-row-dense grid-cols-2 grid-rows-1 ...  ">
        {/* <div class="col-span-2">01</div>
        <div class="col-span-2">02</div> */}
        <div>
          <div className="title">
            <h2>
              Blockchain Based Patient Record <br /> Linkage System
            </h2>
          </div>
          <div className="after_title">
            A nation wide project for storing patients health records
            <br />
            Govtment Authorities
          </div>
          <div className="button">
            <button>Get Started</button>
          </div>
        </div>
        <div>
          <div>
            <h3>Hello world</h3>
          </div>
        </div>
      </div>
      <div className="boxes">
        <div className="left_one">
          <div className="left_title">
            Every node in the network has a copy of the digital ledger
          </div>
        </div>
        <div className="middle_one">
          <div>
            <div className="middle_title">Blockchain</div>
            <h1 className="middle_title_h1">
              A digital database or ledger that is distributed among of a
              peer-to-peer network
            </h1>
          </div>
        </div>
        <div className="right_one">
          <div className="right_title">
            A pillar in making the business and governmental procedures more
            secure
          </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
