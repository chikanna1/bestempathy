import React, { useContext, useEffect, useRef, useState } from "react";
import FormProgressBar from "../../components/FormProgressBar";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SignUpForm from "../../components/NewUserSignUp/MultiStepSignUpForm";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import MultiStepSignUpForm from "../../components/NewUserSignUp/MultiStepSignUpForm";
import AuthContext from "../../context/AuthContext";
import { API_URL } from "../../config";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [index, setIndex] = useState(1);

  const [userDetailsFormValidated, setUserDetailsFormValidated] =
    useState(false);

  const { register } = useContext(AuthContext);

  const [values, setValues] = useState({
    title: { value: "none", label: "None" },
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    membershipType: "yearly",
    classification: {},
    professionalTitle: { value: "none", label: "None" },
  });

  const [formattedAddress, setFormattedAddress] = useState("");
  const [address, setAddress] = useState({});

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);
  const [termsOfPrivacyChecked, setTermsOfPrivacyChecked] = useState(false);

  const validateUserDetails = async () => {
    const validEmail = await validateEmail();
    const validPassword = validatePassword();
    const validFormFilled = validateUserDetailFields();
    const validAddress = validateAddress();
    const validClassification = validateClassification();

    if (
      !validEmail ||
      !validPassword ||
      !validFormFilled ||
      !validAddress ||
      !validClassification
    ) {
      setUserDetailsFormValidated(false);
      return false;
    } else {
      setUserDetailsFormValidated(true);
      return true;
    }
  };

  const handleChangeCheckbox = (e) => {
    const { name } = e.target;
    if (name == "service") {
      setTermsOfServiceChecked(!termsOfServiceChecked);
    }

    if (name == "privacy") {
      setTermsOfPrivacyChecked(!termsOfPrivacyChecked);
    }
  };

  const validateAddress = () => {
    if (Object.keys(formattedAddress).length === 0) {
      toast.error("Please enter a valid address/location");
      return false;
    }

    return true;
  };

  const validateBillingForm = () => {
    if (!termsOfServiceChecked) {
    } else if (!termsOfPrivacyChecked) {
    }
    if (!termsOfPrivacyChecked || !termsOfServiceChecked) {
      return false;
    }
    return true;
  };

  const validateClassification = () => {
    if (Object.keys(values.classification).length === 0) {
      toast.error(
        "Please enter a mental health role. i.e Pre-Licensed Professional or Counselor"
      );
      return false;
    }
    return true;
  };
  const validateEmail = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      console.log("Email not Valid");
      toast.error("Please enter a valid email address");
      return false;
    }

    const emailTakenReq = await fetch(
      `${API_URL}/api/profiles?filters[email][$eq]=${values.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const emailTakenRes = await emailTakenReq.json();
    console.log(emailTakenRes);

    if (emailTakenRes.meta.pagination.total >= 1) {
      toast.error("Email Already in Use. Please Choose a Different Email");
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    var lowerCase = /[a-z]/g;
    var upperCase = /[A-Z]/g;
    var numbers = /[0-9]/g;
    if (values.password.length <= 0) {
      toast.error("Please enter a password!");
      return false;
    } else if (values.password.length < 8) {
      toast.error("Password length should be more than 8 Characters.");
      return false;
    } else if (!values.password.match(lowerCase)) {
      toast.error("Password should contains lowercase letters!");
      return false;
    } else if (!values.password.match(upperCase)) {
      toast.error("Password should contain uppercase letters!");
      return false;
    } else if (!values.password.match(numbers)) {
      toast.error("Password should contains numbers also!");
      return false;
    } else if (values.password !== values.confirmPassword) {
      toast.error(
        "Password and Confirm Password are not matching! Please check and correct."
      );
      return false;
    }
    return true;
  };

  const validateUserDetailFields = () => {
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      return false;
    }
    return true;
  };

  const canceledPaypalPayment = () => {
    toast.error("Something Went Wrong...Please Try Again");
  };
  const successfulPayment = async () => {
    //Call Register Function
    console.log(values);
    const res = await register(
      values,
      address,
      formattedAddress,
      city,
      state,
      country,
      coordinates
    );
    if (res.registrationSuccessful) {
      await nextButton();
    } else {
      toast.error("Something Went Wrong...");
    }
  };

  const updateValue = (name, value) => {
    console.log(name);
    console.log(value);
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputChangeSelect = (selectedOption, action) => {
    console.log(action.name);
    console.log(selectedOption);
    setValues({ ...values, [action.name]: selectedOption });
    console.log(values);
  };

  const handleSubmit = () => {
    console.log("Form Submitted");
  };

  const prevButton = () => {
    scroll.scrollToTop();
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
      setUserDetailsFormValidated(false);
    }
  };
  const nextButton = async () => {
    if (userDetailsFormValidated) {
      scroll.scrollToTop();
      if (index < 3) {
        setIndex((prevIndex) => prevIndex + 1);
      }
      return;
    } else {
      const validated = await validateUserDetails();
      if (validated) {
        scroll.scrollToTop();
        if (index < 3) {
          setIndex((prevIndex) => prevIndex + 1);
        }
        return;
      }
    }
    return;
  };

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* SignUp Form */}
      <div className="">
        {/* Progress Bar */}
        <div className="px-[20%] py-[50px] ">
          <FormProgressBar step={index} />
        </div>
        {/* Form */}
        <ToastContainer />
        <MultiStepSignUpForm
          step={index}
          setUserDetailsFormValidated={setUserDetailsFormValidated}
          values={values}
          setValues={setValues}
          handleInputChange={handleInputChange}
          handleInputChangeSelect={handleInputChangeSelect}
          updateValue={updateValue}
          handleChangeCheckbox={handleChangeCheckbox}
          termsOfServiceChecked={termsOfServiceChecked}
          termsOfPrivacyChecked={termsOfPrivacyChecked}
          validateBillingForm={validateBillingForm}
          nextButton={nextButton}
          canceledPaypalPayment={canceledPaypalPayment}
          successfulPayment={successfulPayment}
          setAddressValue={setAddress}
          setFormattedAddressValue={setFormattedAddress}
          setCountry={setCountry}
          setCity={setCity}
          setState={setState}
          setCoordinates={setCoordinates}
        />
        {/* Prev/Next Buttons */}
        <div className="flex items-center justify-center px-[20%] mt-[10%] lg:mt-[2%]">
          {/* Prev Button */}
          <button
            className={` ${
              index == 1 || index == 3 ? "hidden" : ""
            } px-[100px] py-3 rounded-md bg-blue-gray-300 `}
            onClick={prevButton}
          >
            Back
          </button>
          <button
            onClick={nextButton}
            className={` ${
              index == 2 || index == 3 ? "hidden" : ""
            } px-[100px] py-3 rounded-md bg-blue-gray-300 `}
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignupForm;
