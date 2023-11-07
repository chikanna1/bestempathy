import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import video_showcase from "../assets/images/homepage/woman-talking-video.mp4";

import Doctor from "../assets/images/homepage/Doctor.jpg";
import Aetna_Logo from "../assets/images/homepage/Aetna-Logo.png";
import Anthem_Logo from "../assets/images/homepage/Anthem-Logo.png";
import Cigna_Logo from "../assets/images/homepage/Cigna-Logo.png";
import Humana_Logo from "../assets/images/homepage/Humana-Logo.png";
import United_Healthcare_Logo from "../assets/images/homepage/United-Healthcare-Logo.png";

import how_it_works_pychologist from "../assets/images/homepage/how-it-works-psychologist.svg";
import how_it_works_checklist from "../assets/images/homepage/how-it-works-checklist.svg";
import how_it_works_video_chat from "../assets/images/homepage/how-it-works-video-chat.svg";

import Autocomplete from "react-google-autocomplete";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Odometer from "react-odometerjs";
const Odometer = dynamic(import("react-odometerjs"), { ssr: false });
import "odometer/themes/odometer-theme-train-station.css";

import banner1 from "../assets/images/homepage/banner-health-seeklogo.com.svg";
import banner2 from "../assets/images/homepage/WHO_logo.svg";
import banner3 from "../assets/images/homepage/samaritan-health-systems-seeklogo.com.svg";

import Carousel from "nuka-carousel";

import reviewer1 from "../assets/images/homepage/reviewer-1-lucy-collins.jpg";
import reviewer2 from "../assets/images/homepage/reviewer-2-precious-ahabueze.jpg";
import reviewer3 from "../assets/images/homepage/reviewer-3-jalil-abdul.jpg";
import reviewer4 from "../assets/images/homepage/reviewer-4-michelle-dam.jpg";

import {
  faSearch,
  faAmbulance,
  faAnchor,
  faArrowRight,
  faArrowDown,
  faQuoteLeft,
  faQuoteRight,
  faQuoteLeftAlt,
} from "@fortawesome/free-solid-svg-icons";

const defaultControlsConfig = {
  nextButtonClassName: "hidden",
  prevButtonClassName: "hidden",
  pagingDotsClassName: "px-1",
};

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {/* Video Showcase */}
      <div className="h-[90vh] w-[100vw">
        <div className="flex flex-col items-center items-center justify-center h-[100%]">
          <h1 className="text-4xl capitalize font-bold text-white text-center">
            Take the first step to a happier you
          </h1>
          <p className="text-xl capitalize text-white py-10">
            Find a therapist today
          </p>
          <div className="lg:px-[10%] justify-center flex flex-row lg:justify-start ">
            <Autocomplete
              className="py-0 rounded-l-md focus:outline-none text-center lg:px-10 lg:py-5"
              placeholder="Location"
              apiKey={"AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ"}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
            />
            <div>
              <button className="w-30 py-3 bg-yellow-400 px-5 rounded-r-md hover:bg-yellow-300 transition duration-500 lg:py-5">
                Match With Therapists
              </button>
            </div>
          </div>
        </div>
        {/* <div className="-z-100 absolute inset-0 object-cover h-[100%] w-[100vw] bg-black/5"> */}
        <video
          autoPlay
          loop
          muted
          className=" -z-50 absolute inset-0 object-cover h-[100%] w-[100vw] "
        >
          <source src="assets/woman-talking-video.mp4" type="video/mp4" />
        </video>
        {/* </div> */}
      </div>
      {/* Showcase */}
      {/* 

      <div className="flex flex-col flex-col-reverse lg:flex-row  bg-slate-400 lg:h-[85vh] ">
        <div className="py-10 px-10 text-center lg:px-20 flex flex-col lg:w-5/12 justify-center  mb-20">
          <h1 className="lg:text-left text-3xl">
            The right therapist makes all the difference.
          </h1>
          <p className="text-lg py-2 lg:text-left">
            Built on years of research, our matching tool finds you licensed
            therapists who are best matched to your needs.{" "}
          </p>
          <p className="text-lg mt-3 lg:text-left">
            If you are in crisis, call the National Suicide Prevention Lifeline
            at 1.800.273.8255.
          </p>
          <div className="justify-center flex flex-row lg:justify-start lg:mt-16">
            <Autocomplete
              className="py-3 rounded-l-md focus:outline-none text-center px-10"
              placeholder="Location"
              apiKey={"AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ"}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
            />
            <div>
              <button className="w-30 py-3 bg-yellow-400 px-5 rounded-r-md hover:bg-yellow-300 transition duration-500">
                Match With Therapists
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-7/12 lg:h-full">
          <Image className="lg:h-full" src={Doctor} alt="Therapist" />
        </div>
      </div>
    */}

      {/* Badges */}
      <div className="py-5 flex flex-col items-center">
        <h1 className="py-5 text-center text-lg">
          Therapists are in-network with many insurers, including:
        </h1>
        <div className="flex flex-col lg:flex-row py-2 lg:h-48 px-[10%] justify-center items-center">
          <Image
            src={Anthem_Logo}
            className="w-[300px] h-[60px] mt-10  mx-5 mt-3"
            alt="Anthem Blue Cross Blue Shield"
          />
          <Image
            src={Cigna_Logo}
            className="w-[200px] h-[120px]  mt-1 mx-5 mt-3"
            alt="Cigna Insurance"
          />
          <Image
            src={United_Healthcare_Logo}
            className="w-[250px] h-[125px]  mt-2 mx-5 mt-3"
            alt="United Healthcare"
          />
          <Image
            src={Humana_Logo}
            className="w-[200px] h-[45px] mt-5 mx-8"
            alt="Humana Insurance"
          />
          <Image
            src={Aetna_Logo}
            className="w-[150px] h-[100px] mt-5 mx-8"
            alt="Aetna Insurance"
          />
        </div>
      </div>
      {/* HomePage How it Works */}
      <div className="flex flex-col items-center bg-blue-gray-300/50 py-20">
        <h1 className="text-3xl font-bold">How It Works</h1>
        <div className="flex flex-col lg:flex-row items-center py-14">
          <div className="flex flex-col items-center content-center">
            <Image
              className="w-[100px] h-[150px]"
              src={how_it_works_checklist}
              alt="Therapist"
            />
            <h1 className="text-xl py-5 font-bold">Matching Algorithim</h1>
            <p className="w-[400px] text-center capitalize">
              Answer a few questions about what your therapy desires.
            </p>
          </div>
          <FontAwesomeIcon
            className="invisible lg:visible"
            icon={faArrowRight}
            size="2x"
          />
          <FontAwesomeIcon
            className="visible py-5 pl-3 lg:invisible"
            icon={faArrowDown}
            size="2x"
          />
          <div className="flex flex-col items-center content-center">
            <Image
              className="w-[100px] h-[150px]"
              src={how_it_works_pychologist}
              alt="Therapist"
            />
            <h1 className="text-xl py-5 font-bold">
              See Your Matching Therapists
            </h1>
            <p className="w-[400px] text-center capitalize">
              Browse through the Therapists recommended for you and choose your
              preference
            </p>
          </div>
          <FontAwesomeIcon
            className="invisible lg:visible"
            icon={faArrowRight}
            size="2x"
          />
          <FontAwesomeIcon
            className="visible py-5  lg:invisible"
            icon={faArrowDown}
            size="2x"
          />
          <div className="flex flex-col items-center content-center">
            <Image
              className="w-[100px] h-[150px]"
              src={how_it_works_video_chat}
              alt="Therapist"
            />
            <h1 className="text-xl py-5 font-bold">Start Therapy Sessions</h1>
            <p className="w-[400px] text-center  capitalize">
              After choosing who you like, contact and schedule your first
              session
            </p>
          </div>
        </div>
      </div>
      {/* HomePage Statistics */}
      <div className="py-10">
        <div className="flex flex-col items-center">
          <h1 className="py-5 text-3xl font-bold capitalize ">
            our diverse Therapy Network{" "}
          </h1>
          <h1 className="py-5 mb-10 text-xl font-bold">
            100% Online and Accessible from Anywhere
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="text-center py-5 lg:w-[25%]">
            <Odometer className="text-xl" value={12335} format="(,ddd),dd" />
            <h4 className="py-5 text-xl font-bold">
              {"Patients Served and Counting"}
            </h4>
          </div>
          <div className="text-center py-5 lg:w-[25%]">
            <Odometer className="text-xl" value={1832} format="(,ddd),dd" />
            <h4 className="py-5 text-xl font-bold">
              {"Licensed Therapists to Choose From"}
            </h4>
          </div>
          <div className="text-center py-5 lg:w-[25%] ">
            <Odometer className="text-xl" value={112} format="(dd" />
            <h4 className="pt-5 text-xl font-bold">
              {"Countries Represented by our Therapists"}
            </h4>
            <h4 className="text-lg font-bold">(and increasing!)</h4>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-[100vw] h-[70vh] lg:h-[60vh] bg-blue-gray-600/50 flex flex-row justify-center px-5">
        <FontAwesomeIcon
          className="w-10 mt-[7%] lg:mx-5 mx-[-20px] "
          icon={faQuoteLeftAlt}
          size="3x"
        />
        <Carousel
          className="mt-[20%] lg:mt-[5%]"
          withoutControls={false}
          defaultControlsConfig={defaultControlsConfig}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-xl lg:text-2xl text-center lg:w-[500px]">
              I can actually see progress in my mental health which is something
              I haven't been able to say in 15 years and it's thanks to her
            </h1>
            <div className="flex mt-5">
              <Image
                className="w-[100px] h-[100px] rounded-full border-2 border-black"
                src={reviewer1}
                alt="Therapist"
              />
              <div className="mx-5 mt-5">
                <p className="text-lg uppercase text-slate-900">
                  Member Therapist Review
                </p>
                <p className="text-lg">Lucy Collins (MA, LPC-S)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-center lg:w-[500px]">
              I can actually see progress in my mental health which is something
              I haven't been able to say in 15 years and it's thanks to her
            </h1>
            <div className="flex mt-5">
              <Image
                className="w-[100px] h-[100px] rounded-full border-2 border-black"
                src={reviewer1}
                alt="Therapist"
              />
              <div className="mx-5 mt-5">
                <p className="text-lg uppercase text-slate-900">
                  Member Therapist Review
                </p>
                <p className="text-lg">Lucy Collins (MA, LPC-S)</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl text-center lg:w-[500px]">
              I can actually see progress in my mental health which is something
              I haven't been able to say in 15 years and it's thanks to her
            </h1>
            <div className="flex mt-5">
              <Image
                className="w-[100px] h-[100px] rounded-full border-2 border-black"
                src={reviewer1}
                alt="Therapist"
              />
              <div className="mx-5 mt-5">
                <p className="text-lg uppercase text-slate-900">
                  Member Therapist Review
                </p>
                <p className="text-lg">Lucy Collins (MA, LPC-S)</p>
              </div>
            </div>
          </div>
        </Carousel>
        <FontAwesomeIcon
          className="lg:w-10 fa-flip-horizontal mt-[7%] lg:mx-5 mx-[-20px]"
          icon={faQuoteLeftAlt}
          size="3x"
        />
      </div>

      {/* Badges Section */}
      <div className="flex justify-between  px-[20%] ">
        <Image className="w-[100px] h-[150px]" src={banner1} alt="Badge" />
        <Image className="w-[100px] h-[150px]" src={banner2} alt="Badge" />
        <Image className="w-[100px] h-[150px]" src={banner3} alt="Badge" />
      </div>

      {/* Discover Your Matches */}
      <div className="flex flex-col items-center py-[50px] bg-blue-gray-200">
        <h1 className="font-bold capitalize text-lg">
          Start Your Path to Wellness Today
        </h1>
        <div className="justify-center flex flex-row lg:justify-start lg:mt-10 py-5">
          <Autocomplete
            className="py-3 rounded-l-md focus:outline-none text-center lg:px-10"
            placeholder="Location"
            apiKey={"AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ"}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          />
          <div>
            <button className="w-30 py-3 bg-yellow-400 px-5 rounded-r-md hover:bg-yellow-300 transition duration-500">
              Match With Therapists
            </button>
          </div>
        </div>
        <p className="py-5 mt-3 px-5 text-center">
          If you are in crisis, call the National Suicide Prevention Lifeline at
          1.800.273.8255.
        </p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
