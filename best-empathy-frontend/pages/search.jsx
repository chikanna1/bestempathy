import React, { useMemo, useState } from "react";

import Script from "next/script";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchByLocationForm from "../components/SearchByLocationForm";
import SearchAutocomplete from "../components/SearchAutocomplete";

const themeBorderColor = "mint-tulip-500";
const themeTextColor = "mint-tulip-500";
const themeHoverTextColor = "mint-tulip-700";
const themeSecondaryTextColor = "black";

import findATherapistImage1 from "../assets/images/find-a-therapist-page/happy-peaceful-woman.jpg";
import findATherapistImage2 from "../assets/images/find-a-therapist-page/therapy-session.jpg";
import findATherapistImage3 from "../assets/images/find-a-therapist-page/community.jpg";

import {
  faEarthAmerica,
  faPeopleGroup,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
  InfoWindowF,
} from "@react-google-maps/api";
import ReactLoading from "react-loading";

import { therapistSpecialties } from "../assets/dataPoints/therapist-data-types";

const FindATherapistPage = () => {
  const router = useRouter();
  const [locationData, setLocationData] = useState({});

  let defaultSpecialty = [];

  const [specialtyChoicesList, setSpecialtyChoicesList] =
    useState(defaultSpecialty);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.clearWaitingQueue();

    console.log(locationData);

    if (Object.keys(locationData).length === 0) {
      toast.error("Please Enter A Valid Location");
      toast.clearWaitingQueue();
      return;
    }
    goToSearchResultsPage();
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    return;
  };

  const goToSearchResultsPage = () => {
    router.push({
      pathname: "/listings",
      query: {
        country: locationData.country,
        state: locationData.state,
        city: locationData.city,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        filters: JSON.stringify({
          specialty: specialtyChoicesList,
          therapyApproaches: [],
          languages: [],
          classification: [],
          radius: 50,
          searchKeywords: "",
          onlineTherapy: [],
          acceptingNewClients: [],
          inPersonTherapy: [],
          availability: ["acceptingNewClients"],
          demographic: [],
          religion: [],
          gender: [],
        }),
        page: 1,
        per_page: 10,
      },
    });
  };

  const apiKey = "AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ";
  const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center mt-[10%]">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ReactLoading
          type={"bars"}
          color={"#03fc4e"}
          height={500}
          width={500}
        />
      </div>
    );
  }

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Find A Therapist Page Start */}
      <ToastContainer limit={1} />

      <div className="flex flex-col bg-gradient-to-tr from-mint-tulip-100 to-mint-tulip-700 py-[7%]">
        {/* Find a Therapist Header */}
        <div className="flex flex-col justify-center items-center h-[70vh] md:h-[50vh] lg:h-[30vh]">
          {/* Header Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-center text-[40px] capitalize">
              Find A Therapist
            </h1>
            <h3 className="text-center mb-10 text-[17px] capitalize">
              Finding the right therapist is the first step toward a better you.
            </h3>
          </div>

          {/* Search Input */}
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col items-center">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:w-[57vw]">
                {/* Location Search */}
                <div className="mx-5 my-5 w-[100%]">
                  <SearchAutocomplete
                    setLocationData={setLocationData}
                    mobile={true}
                  />
                </div>
                <div className="min-w-[350px] w-[100%] mx-5 my-5">
                  <Select
                    name="specialties"
                    placeholder="I Need ______ Type Of Therapy "
                    options={therapistSpecialties}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    isClearable={true}
                    defaultValue={specialtyChoicesList}
                    onChange={(specialtyValue) =>
                      setSpecialtyChoicesList([specialtyValue?.value])
                    }
                    styles={{
                      option: (styles, { data }) => ({
                        ...styles,
                        color:
                          data.value === "none" ? "transparent" : styles.color,
                        height: "50px",
                      }),
                      singleValue: (styles, { data }) => ({
                        ...styles,
                        color:
                          data.value === "none" ? "transparent" : styles.color,
                        height: "45px",
                        paddingTop: "10px",
                        paddingLeft: "10px",
                      }),
                      valueContainer: (styles) => ({
                        ...styles,
                        height: "50px",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="mt-10">
                <button
                  className="px-10 py-5 bg-mint-tulip-600 rounded-md hover:bg-mint-tulip-400"
                  type="submit"
                >
                  See Matching Therapists
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Good Mental Health Takes Practice */}
      <div className="flex flex-col">
        <div>
          <br />
          <h2 className="capitalize text-[25px] text-center">
            Good mental health takes practice{" "}
            <span className="text-black font-semibold">daily</span>
          </h2>
          <br />
          <div className="flex flex-col lg:flex-row justify-center px-[5%] md:px-[10%] lg:px-[50px] items-center">
            <div className="w-[400px] md:w-[600px] md:h-[600px] lg:w-[500px] lg:h-[500px] h-[350px]">
              <Image
                width="0"
                height="0"
                className={`w-full h-full`}
                src={findATherapistImage1}
                alt="Badge"
              />
            </div>
            <div className="lg:w-[60%] lg:pl-[50px] lg:px-[50px] text-center lg:text-left mt-[20px] lg:mt-0 w-[400px] md:w-[600px]">
              <p className="text-[18px]">
                The quest for a happy and healthy life is a life-long journey.
                Using the resources of an expert to help guide this journey is a
                very smart approach. Often times it requires the observations of
                another to help put things into perspective. This can be
                especially important in situations where mental health problems
                like addiction, depression or anxiety interfere with our ability
                to see our own situation clearly.
              </p>
              <br />

              <p className="text-[18px]">
                Whether you are suffering the effects of a major life change
                such as grief and loss, PTSD, relationship issues, sexual abuse,
                or clinical medical issues like bipolar disorder, substance
                abuse, schizophrenia – good counseling can serve as a positive
                life force.
              </p>
              <br />
              <p className="hidden lg:block">
                <span className="font-bold">INVEST IN YOUR FUTURE:</span>{" "}
                Contact a therapist today! Search by location and specialization
                for a list of qualified mental health professionals in your
                area. Can’t find a therapist match in your area? Search our
                directory of therapists offering online therapy. Geography
                should not be a deterrent to getting the professional help you
                deserve.
              </p>
            </div>
          </div>
        </div>
        <div>
          <br />
          <h2 className="capitalize text-[25px] text-center">
            The state of mental health today{" "}
          </h2>
          <br />
          <div className="flex flex-col lg:flex-row justify-center px-[5%] md:px-[10%] lg:px-[50px] items-center">
            <div className="w-[400px] md:w-[600px] md:h-[600px] lg:w-[500px] lg:h-[500px] h-[350px]">
              <Image
                width="0"
                height="0"
                className={`w-full h-full`}
                src={findATherapistImage2}
                alt="Badge"
              />
            </div>
            <div className="lg:w-[60%] lg:pl-[50px] lg:px-[50px] text-center lg:text-left mt-[20px] lg:mt-0 w-[400px] md:w-[600px]">
              <p className="text-[18px]">
                Therapy is often viewed as limited to individuals with obvious
                mental challenges. However, mental health professionals receive
                training to address a wide variety of conditions ranging from
                relationship issues, career counseling, to major life
                transitions. Having the help of a professional can help you
                better understand and prepare for the challenges you face.
              </p>
              <br />

              <p className="text-[18px]">
                Whether you are suffering the effects of a major life change
                such as grief and loss, PTSD, relationship issues, sexual abuse,
                or clinical medical issues like bipolar disorder, substance
                abuse, schizophrenia – good counseling can serve as a positive
                life force.
              </p>
              <br />
              <p className="hidden lg:block">
                <span className="font-bold">INVEST IN YOUR FUTURE:</span>{" "}
                Research shows that mental disorders are common, affecting tens
                of millions of people each year, and only about half of those
                affected receive treatment. Of particular importance is
                addressing mental health challenges early. For example, behavior
                challenges in children such as ADHD or sensory integration
                disorder can be greatly reduced if treated at a young age, and
                can often prevent compounding issues in their adult lives.
                Mental health issues are often layered. For instance,
                individuals that struggle with eating disorders or addiction
                often have an underlying mood disorder that must be addressed
                before treatment can be successful.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="py-10 bg-gray-200/50">
        <div className="flex flex-col lg:flex-row px-[10%] text-center">
          {/* Card 1 */}
          <div className="flex flex-col bg-white mx-[2.5%] my-[25px]">
            <FontAwesomeIcon
              className="py-[10%]"
              icon={faEarthAmerica}
              size="3x"
            />
            <h3 className="pb-[10%] text-2xl capitalize font-bold">
              Finding A Therapist
            </h3>
            <p className="px-[70px] pb-[10%]">
              Successful therapy begins with finding the right match between
              client and therapist. A good therapist will begin your treatment
              by establishing trust and investing in you.
            </p>

            <Link href="/">
              <p className="py-5 px-10 bg-blue-gray-200">How to Choose</p>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col bg-white mx-[2.5%] my-[25px]">
            <FontAwesomeIcon
              className="py-[10%]"
              icon={faPeopleGroup}
              size="3x"
            />
            <h3 className="pb-[10%] text-2xl capitalize font-bold">
              Support Community
            </h3>
            <p className="px-[70px] pb-[10%]">
              Our free online support community offers members a convenient and
              safe place to connect including forums, chat rooms, mood mapping,
              wellness activities and so much more…
            </p>

            <Link href="/">
              <p className="py-5 px-10 bg-blue-gray-200">Join the community</p>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col bg-white mx-[2.5%] my-[25px]">
            <FontAwesomeIcon className="py-[10%]" icon={faUserTie} size="3x" />
            <h3 className="pb-[10%] text-2xl capitalize font-bold">
              For Professionals
            </h3>
            <p className="px-[70px] pb-[10%]">
              It is our goal to make it easy for people to find a therapist in
              their area; as well as give mental health professionals the
              visibility they need to grow their private therapy practice.
            </p>

            <Link href="/">
              <p className="py-5 px-10 bg-blue-gray-200">List Your Practice</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section  */}
      <div className="flex flex-col items-center px-[20%]">
        <h3 className="py-10 text-[30px] text-center lg:text-left">
          It takes a village. Find the support you need
        </h3>
        <div className="w-[600px] h-[400px]">
          <Image
            width="0"
            height="0"
            className={`w-full h-full`}
            src={findATherapistImage3}
            alt="Badge"
          />
        </div>
        <p className="text-center py-10">
          Community of individuals sitting along a wall discussing wellness tips
          and mental health tips.The road to mental health begins with you, but
          it helps to know you’re not alone. In addition to professional help,
          maintaining a network of support is a key part of a happy life. At
          TherapyTribe, we actively promote good mental health and have created
          a number of free wellness tools. As part of our long-standing
          commitment to wellness, we created The Tribe – a free mental health
          support community where members can safely connect, share stories and
          advice. We offer online support groups for General Wellness,
          Depression, Anxiety, Addiction, Marriage and Family Issues, OCD, LGBT,
          Teens, and HIV/AIDS. In addition, individual Tribe members have access
          to the latest in social network technology carefully tailored to
          create an environment of encouragement. Our pioneering wellness tools
          include Mood Mapping, Wellness Activities, Kudos, Rewards, Member
          Blogging, Private Forums, Chat Rooms and more.
        </p>

        <div className="my-10">
          <Link href="/">
            <span className="py-5 px-10 bg-blue-gray-200 ">
              Find A Therapist Today
            </span>
          </Link>
        </div>
      </div>
      {/* Bottom Page Banner */}
      <div className="mt-10 py-2 bg-blue-gray-400">
        <p className="uppercase text-gray-200/50 text-center">
          Helping People Find Support Since 2006
        </p>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FindATherapistPage;
