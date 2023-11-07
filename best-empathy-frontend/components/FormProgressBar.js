import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const FormProgressBar = (props) => {
  return (
    <div>
      <ProgressBar
        percent={((props.step - 1) * 100) / 2}
        // filledBackground="linear-gradient(to right, #fc0335, #03fc0f)"
        filledBackground="#a5a8a6"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={`text-white w-[40px] h-[40px] text-[40px] bg-gray-500
             flex justify-center items-center rounded-full ${
               accomplished ? "bg-green-600" : ""
             }`}
            >
              1
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={`text-white w-[40px] h-[40px] text-[40px] bg-gray-500
             flex justify-center items-center rounded-full ${
               accomplished ? "bg-green-600" : ""
             }`}
            >
              2
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div
              className={`text-white w-[40px] h-[40px] text-[40px] bg-gray-500
             flex justify-center items-center rounded-full ${
               accomplished ? "bg-green-600" : ""
             }`}
            >
              3
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};

export default FormProgressBar;
