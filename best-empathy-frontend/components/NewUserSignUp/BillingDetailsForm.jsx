import React, { useRef, useState, useEffect } from "react";
import Select from "react-select";
import Head from "next/head";
import { Radio } from "@nextui-org/react";

import { Switch } from "@material-tailwind/react";
import PaypalSubscribeButtons from "../PaypalSubscribeButtons";
import PaypalButtons from "../PaypalButtons";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

const BillingDetailsForm = (props) => {
  const [membershipType, setMembershipType] = useState();
  // const monthlyPlanId = "P-3K117390L1965164EMR7G6LI";
  const monthlyPlanId = "P-4R158590Y8904953HMSBA6OA";

  const yearlyPlanId = "P-4R158590Y8904953HMSBA6OA";

  const [clientId, setClientId] = useState(
    "AYN77t5pJatyyL9JZqhugyTnLUAmaJVxvtK00pEiO3HcKyg9hX_GbSCI5KpQ6w4wNoBR7Ito4Ekb7lQh"
  );

  const [planId, setPlanId] = useState(monthlyPlanId);

  const [selectedOption, setSelectedOption] = useState("yearly");

  const [promoCode, setPromoCode] = useState("");

  const [yearlyPrice, setYearlyPrice] = useState(299);
  const [monthlyPrice, setMonthlyPrice] = useState(29.95);

  const [discountApplied, setDiscountApplied] = useState(false);

  const handleInputChangePromoCode = (e) => {
    const { name, value } = e.target;
    setPromoCode(value);
  };

  const onOptionChange = (option) => {
    if (option == "yearly") {
      setSelectedOption("yearly");
      props.updateValue("membershipType", "yearly");
      props.updateValue("plusMember", true);
    }

    if (option == "free") {
      setSelectedOption("free");
      props.updateValue("membershipType", "none");
      props.updateValue("plusMember", false);
    }

    if (option == "monthly") {
      setSelectedOption("monthly");
      props.updateValue("membershipType", "monthly");
      props.updateValue("plusMember", true);
    }

    console.log(props.values);
  };

  const applyDiscount = () => {
    if (discountApplied) {
      alert("Promo Code Already Used...");
      return;
    }
    if (promoCode == "2023") {
      setYearlyPrice((yearlyPrice * 0.75).toFixed(2));
      setMonthlyPrice((monthlyPrice * 0.75).toFixed(2));
      setDiscountApplied(true);
    } else {
      alert("Invalid Promo Code");
    }
  };

  return (
    <div className="px-[20%] pt-[2.5%]">
      {/* Select Membership */}
      <h3 className="text-[25px]">Select a Membership</h3>
      <hr className="px-5 py-5" />
      <div className="flex flex-col justify-center items-center">
        {/* Membership Cards */}

        <div className="flex flex-col md:flex-row">
          {/* Monthly Membership */}
          <div
            onClick={() => onOptionChange("monthly")}
            id="monthly"
            className={
              selectedOption == "monthly"
                ? "border-[5px] border-gray-800 black w-[330px] h-auto flex flex-col  mx-5 my-2 cursor-pointer py-[10px]"
                : "w-[330px] h-auto border-[2px] border-gray-500 flex flex-col  mx-5 my-2 cursor-pointer py-[15px]"
            }
          >
            {/* <p className=" uppercase text-center text-[30px] font-bold">Plus</p> */}
            <p
              className={
                `text-center text-[25px] pt-2 mt-[-15px] mb-[10px]` +
                (selectedOption == "monthly"
                  ? ` underline font-bold`
                  : ` font-semibold  text-gray-600`)
              }
            >
              Monthly Subscription
            </p>
            <p className="mb-[25px]"></p>
            {/* Benefits */}
            <div>
              {/* Listing Placement */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "monthly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "monthly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Priority Listing Placement!
                  </p>
                  <p className="text-[12px] font-light">
                    Subscribers show up first and before all non-subscribers on
                    every search for a Therapist
                  </p>
                </div>
              </div>

              {/* Contact Method Analysis */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "monthly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Statistics Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "monthly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Contact Method Analysis
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Improve your reach by getting access to your contact
                    statistics!
                  </p>
                </div>
              </div>

              {/* Direct Client Communication */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "monthly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Statistics Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "monthly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Client Direct Communication!
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Potential clients can contact you directly through the
                    platform!
                  </p>
                </div>
              </div>

              {/* 20% Savings */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "monthly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Savings Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "monthly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">Cancel Anytime</p>
                  <p className="text-[12px] font-light w-[200px]">
                    Not sure about a year? That's okay. We all love shorter
                    commitments
                  </p>
                </div>
              </div>
              <p className="mb-[25px]"></p>

              <div
                className={
                  selectedOption === "monthly"
                    ? ` text-black`
                    : ` text-gray-500`
                }
              >
                <p
                  onClick={() => onOptionChange("yearly")}
                  className="uppercase text-center text-[20px] font-bold"
                >
                  ${monthlyPrice}
                </p>
                <p className="text-center text-[12px] mt-[-5px] font-semibold">
                  per month
                </p>
              </div>
            </div>
          </div>

          {/* Yearly Membership */}
          <div
            onClick={() => onOptionChange("yearly")}
            id="yearly"
            className={
              selectedOption == "yearly"
                ? "border-[5px] border-gray-800 black w-[330px] h-auto flex flex-col  mx-5 my-2 cursor-pointer py-[10px]"
                : "w-[330px] h-auto border-[2px] border-gray-500 flex flex-col  mx-5 my-2 cursor-pointer py-[15px]"
            }
          >
            {/* <p className=" uppercase text-center text-[30px] font-bold">Plus</p> */}
            <p
              className={
                `text-center text-[25px] pt-2 mt-[-15px] mb-[10px]` +
                (selectedOption == "yearly"
                  ? ` underline font-bold`
                  : ` font-semibold  text-gray-600`)
              }
            >
              Annual Subscription
            </p>
            <p
              className={
                `font-semibold uppercase text-center` +
                (selectedOption === "yearly"
                  ? ` text-yellow-600`
                  : ` text-white`)
              }
            >
              Recommended
            </p>

            {/* Benefits */}
            <div>
              {/* Listing Placement */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "yearly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "yearly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Priority Listing Placement!
                  </p>
                  <p className="text-[12px] font-light">
                    Subscribers show up first and before all non-subscribers on
                    every search for a Therapist
                  </p>
                </div>
              </div>

              {/* Contact Method Analysis */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "yearly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Statistics Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "yearly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Contact Method Analysis
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Improve your reach by getting access to your contact
                    statistics!
                  </p>
                </div>
              </div>

              {/* Direct Client Communication */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "yearly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Statistics Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "yearly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Client Direct Communication!
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Potential clients can contact you directly through the
                    platform!
                  </p>
                </div>
              </div>

              {/* 20% Savings */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "yearly"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Savings Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "yearly"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    20% Yearly Savings!
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Pay once per year and save 20% compared to monthly Cancel
                    Anytime!
                  </p>
                </div>
              </div>
              <p
                className={
                  `font-semibold uppercase text-center` +
                  (selectedOption === "yearly"
                    ? ` text-yellow-600`
                    : ` text-white`)
                }
              >
                Recommended
              </p>
              <div
                className={
                  selectedOption === "yearly"
                    ? ` text-black mx-2 mt-2`
                    : ` text-gray-500 mx-2 mt-2`
                }
              >
                <p
                  onClick={() => onOptionChange("yearly")}
                  className="uppercase text-center text-[20px] font-bold"
                >
                  ${yearlyPrice}
                </p>
                <p className="text-center text-[12px] mt-[-5px] font-semibold">
                  per year
                </p>
              </div>
            </div>
          </div>

          {/* Free Account Membership */}
          <div
            onClick={() => onOptionChange("free")}
            id="free"
            className={
              selectedOption == "free"
                ? "border-[5px] border-gray-800 black w-[330px] h-auto flex flex-col  mx-5 my-2 cursor-pointer py-[10px]"
                : "w-[330px] h-auto border-[2px] border-gray-500 flex flex-col  mx-5 my-2 cursor-pointer py-[15px]"
            }
          >
            {/* <p className=" uppercase text-center text-[30px] font-bold">Plus</p> */}
            <p
              className={
                `text-center text-[25px] pt-2 mt-[-15px] mb-[10px]` +
                (selectedOption == "free"
                  ? ` underline font-bold`
                  : ` font-semibold  text-gray-600`)
              }
            >
              Non-Subscriber Account
            </p>
            <p className="mb-[25px]"></p>

            {/* Benefits */}
            <div>
              {/* Listing Placement */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "free"
                      ? ` text-red-600`
                      : `text-gray-500`
                  }
                  icon={faCircleXmark}
                  size="2x"
                />
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "free"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Priority Listing Placement
                  </p>
                  <p className="text-[12px] font-light">
                    You will be listed on every search in your area, but after
                    all subscribers
                  </p>
                </div>
              </div>

              {/* Contact Method Analysis */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "free"
                      ? ` text-red-600`
                      : `text-gray-500`
                  }
                  icon={faCircleXmark}
                  size="2x"
                />
                {/* Client Direct Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "free"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Client Direct Communication
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Potential clients cannot directly email or call you; at
                    least they can see you!
                  </p>
                </div>
              </div>

              {/* Direct Client Communication */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "free"
                      ? ` text-red-600`
                      : `text-gray-500`
                  }
                  icon={faCircleXmark}
                  size="2x"
                />
                {/* Contact Method Analysis Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "free"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Contact Method Analysis
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    We can't analyze what we can't see right?
                  </p>
                </div>
              </div>

              {/* Subscribe Anytime */}
              <div className="flex flex-row items-center justify-between px-[15px]">
                <FontAwesomeIcon
                  className={
                    selectedOption === "free"
                      ? ` text-mint-tulip-600`
                      : `text-gray-500`
                  }
                  icon={faCheckSquare}
                  size="2x"
                />
                {/* Savings Placement */}
                <div
                  className={
                    `text-center flex flex-col justify-center items-center py-[10px] w-[250px]` +
                    (selectedOption === "free"
                      ? ` text-black`
                      : ` text-gray-600`)
                  }
                >
                  <p className="text-[16px] font-semibold">
                    Subscribe Anytime!
                  </p>
                  <p className="text-[12px] font-light w-[200px]">
                    Become a subscriber anytime and receive all the benefits!
                  </p>
                </div>
              </div>
              <p className="mb-[25px]"></p>

              <div
                className={
                  selectedOption === "free"
                    ? ` text-black mx-2 mt-2`
                    : ` text-gray-500 mx-2 mt-2`
                }
              >
                <p
                  onClick={() => onOptionChange("free")}
                  className="uppercase text-center text-[20px] font-bold"
                >
                  ${0}
                </p>
                <p className="text-center text-[12px] mt-[-5px] font-semibold">
                  per month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 mt-[20px]">
        <h3 className="text-[25px]">Promo Code and Referrals</h3>
        <hr className="px-5 pt-3 pb-2" />
        <div className="flex flex-col">
          <div>
            <p className="py-1 text-[18px] font-bold">Promo Code</p>
            <input
              className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-3 px-2 leading-tight focus:outline-none border-2 border-blue-gray-200"
              type="text"
              name="promoCode"
              placeholder={`Promo Code`}
              required={true}
              maxLength={25}
              value={promoCode}
              onChange={handleInputChangePromoCode}
            />
            <button
              onClick={applyDiscount}
              className="mt-3 px-10 py-3 rounded-md bg-blue-gray-500 shadow-inner"
            >
              Apply
            </button>
          </div>

          <div>
            <p className="mt-5 mb-1 text-[18px] font-semibold">Referrals</p>
            <input
              className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-3 px-2 leading-tight focus:outline-none border-2 border-blue-gray-200"
              type="text"
              name="displayName"
              placeholder={`If you were referred by one of our members, please include their name here`}
              required={true}
              maxLength={25}
            />
          </div>
        </div>
      </div>

      {/* Terms of Service */}
      <div className="mt-10 mb-5">
        <h3 className="text-[25px]">Terms Of Service</h3>
        <hr className="px-5 py-5" />
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            checked={props.termsOfServiceChecked}
            name="service"
            onChange={props.handleChangeCheckbox}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
          <Link
            className=""
            href="/terms-of-service"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-[18px] hover:underline ml-2 ">
              Agree to our Terms of Service
            </span>
          </Link>
        </div>

        <div className="flex flex-row items-center py-5">
          <input
            type="checkbox"
            checked={props.termsOfPrivacyChecked}
            name="privacy"
            onChange={props.handleChangeCheckbox}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
          <Link
            className=""
            href="/terms-of-service"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="text-[18px] hover:underline ml-2 ">
              Agree to our Privacy Policy
            </span>
          </Link>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-[25px]">Billing</h3>
        <hr className="px-5 py-3" />
        <p className="text-[20px]">Proceed to Payment through Paypal</p>
        <div className="py-5">
          {props.validateBillingForm() ? (
            <PaypalButtons
              planId={planId}
              clientId={clientId}
              nextStep={props.nextStep}
              canceledPaypalPayment={props.canceledPaypalPayment}
              successfulPayment={props.successfulPayment}
            />
          ) : (
            <div>
              <p className="text-red-500">
                Please Agree to Terms of Service and Privacy Policy
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingDetailsForm;
