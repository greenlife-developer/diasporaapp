import React from "react";
import { TypeAnimation } from "react-type-animation";

const WritingAnimation = ({ text, textColor, fontSize }) => {
  return (
    <div>
      <TypeAnimation
        sequence={text}
        wrapper="span"
        speed={50}
        style={{
          fontWeight: "bold",
          display: "inline-block",
          fontSize: fontSize,
          color: textColor,
        }}
        repeat={Infinity}
      />
    </div>
  );
};

export default WritingAnimation;
