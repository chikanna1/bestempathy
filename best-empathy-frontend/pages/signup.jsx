import React from "react";

import Script from "next/script";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchByLocationForm from "../components/SearchByLocationForm";
import { API_URL } from "../config/index";

import showcaseWoman from "../assets/images/signup/wideshowcase.png";
import showcaseWomanMobile from "../assets/images/signup/resizedImage.png";
import diversityPic from "../assets/images/signup/66233.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReviewSlider from "../components/ReviewSlider";

import {
  faGlobe,
  faLink,
  faPeopleArrows,
  faInfinity,
} from "@fortawesome/free-solid-svg-icons";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 3,
  nextArrow: <nextArrow />,
  prevArrow: <prevArrow />,
};

function prevArrow() {
  return (
    <div className="rounded-full border-black p-2 bg-black">
      <p>{"<"}</p>
    </div>
  );
}

function nextArrow() {
  return (
    <div className="rounded-full border-black p-2 bg-black">
      <p>{"<"}</p>
    </div>
  );
}

const SignUp = ({}) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      {/* Header */}
      <Header />
      {/* Signup Page Showcase */}
      <div className="w-full relative mt-3 ">
        <div className="w-full h-[100%] flex flex-col absolute top-0 left-0 bg-black opacity-40"></div>
        <div className="w-full h-[100%] flex flex-col absolute top-0 left-0  z-30 ">
          <div className="flex flex-col items-center h-full justify-center md:mr-[50%] pl-5 ">
            <p className="text-[20px] w-[70%] md:w-[300px] md:text-[25px] lg:text-[40px] pb-5 text-center capitalize lg:w-[600px] text-white font-semibold">
              Everything you need to get found by clients online
            </p>
            <p className="lg:mt-2 text-[15px] text-center px-1 py-1 lg:px-5 lg:py-5 bg-white rounded-full w-[150px] lg:w-[300px] lg:text-[20px] font-semibold">
              Join Best Empathy Today
            </p>
          </div>
        </div>
        <Image src={showcaseWomanMobile} className="md:hidden" alt="" />
        <Image
          src={showcaseWoman}
          className="hidden md:block h-[50vh] md:h-[100%]"
          alt=""
        />
      </div>

      {/* Easy To Start */}
      <div className="flex flex-col items-center text-center px-10">
        <div>
          <p className="text-[30px] py-10">Fast and Simple.</p>
        </div>
        <div>
          <Image src={diversityPic} className="w-[400px] h-[300px]" alt="" />
        </div>
        <div>
          <p className="text-[20px] ">
            Get your profile live today. You'll appear before the millions of
            people who find their therapist on Best Empathy
          </p>
        </div>
        <div>
          <p className="lg:mt-2 mt-5 text-[15px] text-center px-2 py-3 lg:px-5 lg:py-5 bg-blue-gray-400 rounded-full w-[150px] lg:w-[300px] lg:text-[20px] font-semibold">
            Join Today
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="overflow-x-hidden ">
        <div className="mt-[100px] ml-[-50%] h-[1500px] lg:h-[900px] w-[200%] rounded-t-[50%]  bg-blue-gray-500">
          <div className="flex flex-col items-center lg:mt-10 lg:justify-center h-[70vh] ">
            <div>
              <h4 className="text-[35px] mt-[15%] mb-[20%] w-[300px] lg:w-auto text-center font-semibold text-white">
                Best Empathy Member Benefits
              </h4>
            </div>

            <div className="flex flex-col lg:flex-row items-center w-[100vw] lg:h-[100%] px-[10%] lg:px-[5%] gap-10 mb-10">
              {/* Card 1 */}
              <div className="flex flex-col text-center justify-evenly items-center bg-white h-[120%]">
                <h3 className="text-[25px] font-bold py-10 px-5">
                  Exceptional SEO
                </h3>
                <FontAwesomeIcon className="" icon={faGlobe} size="3x" />
                <p className="px-5 text-[20px] py-10">
                  Enhanced web presence. Your practice will rank highly on
                  Google.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col text-center justify-evenly items-center bg-white  h-[120%]">
                <h3 className="text-[25px] font-bold py-10 px-5">
                  Ideal Client Matches
                </h3>
                <FontAwesomeIcon className="" icon={faPeopleArrows} size="3x" />
                <p className="px-5 text-[20px] py-10">
                  Comprehensive filters, so clients best suited to your
                  strengths can find you.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col text-center justify-evenly items-center bg-white  h-[120%]">
                <h3 className="text-[25px] font-bold py-10 px-5">
                  Unlimited Free Months
                </h3>
                <FontAwesomeIcon className="" icon={faInfinity} size="3x" />
                <p className="py-5 px-10 text-[20px]">
                  Get a free month with every colleague that joins from your
                  invitation.
                </p>
              </div>
            </div>
            <div className="mb-[-200px] pb-5">
              <p className="md:mt-[50px] text-[15px] text-center px-2 py-3 lg:px-5 lg:py-5 bg-white rounded-full w-[150px] lg:w-[300px] lg:text-[20px] font-semibold">
                Join Today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Members are Saying */}
      <div className="flex flex-col justify-center text-center py-10">
        <div>
          <p className="text-[50px]">What Our Members Are Saying</p>
        </div>
        {/* Slider */}
        <div className="px-10 lg:px-[200px] mt-[50px] ">
          <ReviewSlider />
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="flex flex-col px-[100px]  lg:px-[200px] mt-[100px]">
        <div>
          <h3 className="text-center text-[30px] font-semibold mb-[50px]">
            Frequently asked questions
          </h3>
        </div>
        {/* FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-xl font-semibold pb-3">How much does it cost?</p>
            <p className="text-lg">
              Members pay a fixed monthly fee of $29.95. You'll get full access
              to every benefit of Psychology Today membership. No contracts, so
              you can cancel your membership at any time. Sign up today!
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold pb-3">
              How will I know it's working?
            </p>
            <p className="text-lg">
              Clients will find and contact you through your profile. Login to
              your account to see how many people have viewed your profile, and
              who has contacted you.{" "}
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold pb-3">
              What if I already have a website?
            </p>
            <p className="text-lg">
              Your profile includes the option to link to your personal website.
              Although, many members find that they no longer need a website
              after joining and getting exposure through Psychology Today.{" "}
            </p>
          </div>
          <div>
            <p className="text-xl font-semibold pb-3">
              Can I host teletherapy sessions?
            </p>
            <p className="text-lg">
              Yes! Psychology Today members have exclusive access to Sessions,
              our Free and HIPAA compliant telehealth video platform!{" "}
            </p>
          </div>
        </div>

        <div className="mt-10 pb-5 flex justify-center">
          <p className="md:mt-[50px] text-[15px] text-center px-2 py-3 lg:px-5 lg:py-5 bg-blue-gray-500 rounded-full w-[150px] lg:w-[300px] lg:text-[20px] font-semibold">
            Join Today
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;
