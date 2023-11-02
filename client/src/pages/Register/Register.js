import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { PersonalDetails, BusinessDetails, Finish } from "./Form";
import "./register.css";

const Register = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);


  const next = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Your Personal Details",
      content: <PersonalDetails next={next} />,
    },
    {
      title: "Your Business Details",
      content: <BusinessDetails next={next} />,
    },
    {
      title: "Finish",
      content: <Finish />,
    },
  ];

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    // lineHeight: '260px',
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <div className="reg-form">
        <h1>Register </h1>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button style={{visibility: "hidden"}} type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              style={{visibility: "hidden"}}
              onClick={() => message.success("Processing complete!")}
            >
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
