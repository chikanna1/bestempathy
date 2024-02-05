import React, { useEffect, useState, useContext, useRef } from "react";

import FormProgressBar from "../../components/FormProgressBar";

import Header from "../../components/Header";
import LoginHeader from "../../components/LoginHeader";

import Footer from "../../components/Footer";
import SignUpForm from "../../components/NewUserSignUp/MultiStepSignUpForm";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import MultiStepSignUpForm from "../../components/NewUserSignUp/MultiStepSignUpForm";

import AuthContext from "../../context/AuthContext";

import { Oval } from "react-loader-spinner";

import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import diversityImage from "../../assets/images/login/diversity-svg.svg";
import FooterLogin from "../../components/FooterLogin";

const Login = () => {
  const [loginCredentials, setLoginCredentils] = useState({
    email: "",
    password: "",
  });

  const emailField = useRef(null);
  const passwordField = useRef(null);

  useEffect(() => {
    let interval = setInterval(() => {
      if (emailField.current && passwordField.current) {
        setLoginCredentils({
          ...loginCredentials,
          ["email"]: emailField.current.value,
          ["password"]: passwordField.current.value,
        });
        //do the same for all autofilled fields
        clearInterval(interval);
      }
    }, 100);
  });

  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const { login, checkUserLoggedIn } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentils({ ...loginCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginCredentials.email.length === 0) {
      toast.error("Email Field Empty! Please Enter Your Email Address");
      toast.clearWaitingQueue();
      return;
    }
    if (loginCredentials.password.length === 0) {
      toast.error("Password Field Empty! Please Enter Your Password");
      toast.clearWaitingQueue();
      return;
    }

    const loginResponse = await login(loginCredentials);

    if (!loginResponse.loginSuccessful) {
      toast.error(loginResponse.message);
      toast.clearWaitingQueue();
      return;
    }

    if (loginResponse.loginSuccessful) {
      setLoginSuccessful(true);
      setTimeout(() => {
        setLoginSuccessful(false);
        redirectToDashBoard();
      }, 5000);
      return;    }
  };

  const redirectToDashBoard = async () => {
    const loginResponse = await checkUserLoggedIn();
    console.log(loginResponse);
  };

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <LoginHeader />

      {/* Login Form */}
      <div className="">
        {/* Form */}
        <ToastContainer limit={1} />
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-[62%] pt-[5%] pb-[10%] lg:px-[10%] px-[20%]">
            <h2 className="text-[30px] text-center lg:text-left">
              Welcome Back
            </h2>
            <p className="text-[16px] max-w-[600px] text-center lg:text-left">
              Best Empathy is the Leading Platform for Diverse Therapists
            </p>
            {loginSuccessful ? (
              <div className="flex flex-row items-center justify-center py-[10%]">
                <Oval
                  height={200}
                  width={200}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : (
              <div>
                <form action="" className="">
                  <div>
                    <p className="py-2 mt-10">Email Address</p>
                    <input
                      className="w-full mr-3 py-3 px-2 border-black border-[1px] text-black focus:outline-none focus:border-gray-600 focus:border-[2px] "
                      ref={emailField}
                      type="email"
                      name="email"
                      value={loginCredentials.email}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </div>
                  <div>
                    <p className="mt-5 py-2">Password</p>
                    <input
                      className="w-full mr-3 py-3 px-2 border-black border-[1px] text-black focus:outline-none focus:border-gray-600 focus:border-[2px] "
                      ref={passwordField}
                      type="password"
                      name="password"
                      value={loginCredentials.password}
                      onChange={handleInputChange}
                      required={true}
                    />
                  </div>
                  <div>
                    <div className="w-[100%] flex items-center justify-center lg:justify-start">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-[100%] py-[20px] lg:w-[50%] bg-blue-gray-500 mt-10"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                </form>
                <button className="mt-7 w-[100%] lg:w-auto font-semibold">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
          {/*  */}
          <div className="w-[38%] bg-gray-300 flex flex-col pt-[50px] pb-[50px] hidden lg:inline-block border-l-[1px] border-gray-700">
            <div className="ml-[40px] mb-[50px] mt-7">
              <p className=" w-[60%] text-center font-semibold">
                Helping One Another
              </p>
              <Image
                priority
                src={diversityImage}
                alt="Helping One Another"
                className="w-[60%]"
              />
              <p className="w-[60%] text-center">
                Clients sometimes seek out therapists with whom they share
                issues of identity or community. Connect with more clients by
                adding your lived experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <FooterLogin />
    </div>
  );
};

export default Login;
