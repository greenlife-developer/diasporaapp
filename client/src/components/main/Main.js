import React from "react";
import img1 from "../../assets/DAP/img1.jpg";
import img2 from "../../assets/DAP/img2.jpg";
import img3 from "../../assets/DAP/img3.jpg";
import img4 from "../../assets/DAP/img4.jpg";
import img5 from "../../assets/DAP/img5.jpg";
import "./main.css";

const Main = () => {
  return (
    <section className="main">
      <main className="commission">
        <h1>Our Gallery</h1>

        <div className="container">
          {/* <h1>Lorem title</h1> */}
          <div className="grid-items">
            <div className="item">
              <img src={img1} />
            </div>
            <div className="item">
              <img src={img2} />
            </div>
            <div className="item">
              <img src={img3} />
            </div>
            <div className="item">
              <img src={img4} />
            </div>
          </div>
        </div>
      </main>

      <section className="parallax">
        <div><h1>Help us to care for you!</h1></div>
      </section>

      <section className="mission-statement">
        <div className="vision">
          <h3>Vision</h3>
          <p>lorem do you ipsium do lor random text</p>
        </div>
        <div className="mission">
          <h3>Mission</h3>
          <p>lorem do you ipsium do lor random text</p>
        </div>
      </section>
    </section>
  );
};

export default Main;
