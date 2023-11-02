import { Link } from "react-router-dom";
import banner from "../../assets/images/banner.jpg";
import WritingAnimation from "../WritingAnimation/WritingAnimation";
import "./banner.css";

const Banner = () => {
  return (
    <section id="register">
      <div className="banner">
        <img width="100%" height="100%" src={banner} />
        <div className="banner-text">
          <h1>Ondo State Diaspora Hub</h1>
          <h5>
            The Official Website Of The Ministry Of Regional Integration And
            Diaspora Relations
          </h5>
          <span>
            Address: 66W5 + CXH, Alfred Rewane Rd, Alagbaka 340283, Akure, Ondo
            State.
          </span><br />
          <div className="flex">
            <span className="commissioner">Honorable Commissioner, Prince Boye Ologbese.</span>
            <span className="permanent-secretary">Permanent Secretary, Mrs. Lola Amuda</span>
          </div>
          <WritingAnimation
            text={[
              "For our indigens in Germany",
              1000,
              "For our indigens in USA",
              1000,
              "For our indigens in London",
              1000,
              "For our indigens in UK",
              1000,
            ]}
            fontSize="28px"
            textColor={"#D5AB09"}
          />
        </div>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </section>
  );
};

export default Banner;
