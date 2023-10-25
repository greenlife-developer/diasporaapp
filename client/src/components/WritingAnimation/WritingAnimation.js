import React from "react";
import { TypeAnimation } from "react-type-animation";

const WritingAnimation = ({ text, textColor }) => {
  return (
    <div>
      <TypeAnimation
        sequence={text}
        wrapper="span"
        speed={50}
        className="animation-span"
        style={{
          fontWeight: "bold",
          display: "inline-block",
          color: textColor,
        }}
        repeat={Infinity}
      />
    </div>
  );
};

export default WritingAnimation;
