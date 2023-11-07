import React from "react";

const SuccessfulPayment = (props) => {
  return (
    <div>
      <div className="px-[20%] pt-[2.5%]">
        {/* Select Membership */}
        <h3 className="text-[25px] text-center italic font-semibold">
          “Alone we can do so little, together we can do so much.”
        </h3>
        <p className="text-[20px] text-center italic font-thin font-extralight">
          {" "}
          Helen Keller
        </p>
        <hr className="px-5 py-5" />

        <div className="flex flex-col items-center justify-center">
          <h3 className="text-[25px] text-center">
            Thank you for signing up {props.values.firstName}!
          </h3>
          <p className="text-center text-[20px] w-[85%] py-[40px]">
            We are looking forward to helping you obtain more clients and
            establish your presence online as a mental health professional.
          </p>

          <p className="text-center text-[18px] w-[85%] ">
            Please check your email at{" "}
            <span className="font-semibold">{props.values.email}</span> for the
            confirmation email from Best Empathy
          </p>
          <p className="text-center text-[18px] w-[85%] py-5">
            Once your email is confirmed, you can start editing your profile and
            publish your profile to the web.
          </p>
          <hr className="px-5 py-5" />
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
