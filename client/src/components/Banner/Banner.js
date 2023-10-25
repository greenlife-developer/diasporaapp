import banner from "../../assets/images/banner.jpg";
import WritingAnimation from "../WritingAnimation/WritingAnimation";
import "./banner.css";

const Banner = () => {
  return (
    <section id="register">
      <div className="banner">
        <img width="100%" height="100%" src={banner} />
        <div className="banner-text">
          <h1>Ministry of Regional Integration and Diaspora Relations, Ondo State, Akure</h1>
          <WritingAnimation
            text={[
              "Our indigens in Germany",
              1000,
              "Our indigens in USA",
              1000,
              "Our indigens in London",
              1000,
              "Our indigens in UK",
              1000,
            ]}
            textColor={"#D5AB09"}
          />
        </div>
        <button>
          <a href="/#register">Register</a>
        </button>
      </div>
    </section>
  );
};

export default Banner;
