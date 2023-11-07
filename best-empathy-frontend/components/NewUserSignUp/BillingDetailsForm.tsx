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
    }

    if (option == "monthly") {
      setSelectedOption("monthly");
      props.updateValue("membershipType", "monthly");
    }
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
          {/* Monthly */}
          <div
            onClick={() => onOptionChange("monthly")}
            id="monthly"
            className={
              selectedOption == "monthly"
                ? "border-4 border-blue-gray-200 w-[300px] h-[225px] flex flex-col items-center justify-center mx-5 my-2 cursor-pointer"
                : "w-[300px] h-[225px] border-2 border-blue-gray-500 flex flex-col items-center justify-center  mx-5 my-2 cursor-pointer"
            }
          >
            <p
              onClick={() => onOptionChange("monthly")}
              className="uppercase text-center text-[30px]"
            >
              Monthly
            </p>
            <p
              onClick={() => onOptionChange("monthly")}
              className="uppercase text-center text-[20px] py-1"
            >
              subscription
            </p>
            <p
              onClick={() => onOptionChange("monthly")}
              className="uppercase text-center text-[20px] font-bold"
            >
              <span>${monthlyPrice}</span>/month
            </p>
            <p
              onClick={() => onOptionChange("monthly")}
              className="capitalize text-center py-1"
            >
              1st month free, cancel anytime
            </p>
          </div>

          {/* Yearly */}

          <div
            id="yearly"
            onClick={() => onOptionChange("yearly")}
            className={
              selectedOption == "yearly"
                ? "border-4 border-blue-gray-200 w-[300px] h-[225px] flex flex-col items-center justify-center mx-5 my-2 cursor-pointer"
                : "w-[300px] h-[225px] border-2 border-blue-gray-500 flex flex-col items-center justify-center  mx-5 my-2 cursor-pointer"
            }
          >
            {selectedOption == "yearly" ? (
              <p className="font-semibold uppercase text-yellow-600">
                Recommended
              </p>
            ) : (
              ""
            )}

            <p
              onClick={() => onOptionChange("yearly")}
              className="uppercase text-center text-[30px]"
            >
              Annual
            </p>
            <p
              onClick={() => onOptionChange("yearly")}
              className="uppercase text-center text-[20px] py-1"
            >
              subscription
            </p>
            <p
              onClick={() => onOptionChange("yearly")}
              className="uppercase text-center text-[20px] font-bold"
            >
              <span>${yearlyPrice}</span>/year
            </p>
            <p
              onClick={() => onOptionChange("yearly")}
              className="capitalize text-center py-1"
            >
              30-day moneyback guarantee
            </p>
            {selectedOption == "yearly" ? (
              <p className="font-semibold uppercase text-yellow-600">
                ${(monthlyPrice * 12 - yearlyPrice).toFixed(0)} Savings
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="mb-5">
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
