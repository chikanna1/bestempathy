import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ContactForm } from "../../components/ContactForm";

import therapist_profile_image_sample from "../../assets/images/therapist-profile-page/default-profile-icon.jpg";

import { API_URL, NEXT_URL } from "../../config/index";
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  faFacebookSquare,
  faWhatsappSquare,
  faInstagramSquare,
  faPinterest,
  faLinkedin,
  faTwitter,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";

import {
  Link as ScrollLink,
  Element as ScrollElement,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import {
  faPhoneVolume,
  faEnvelope,
  faPhoneSlash,
  faBuildingCircleCheck,
  faBuildingCircleXmark,
  faUserPlus,
  faUserXmark,
  faStar,
  faCircleDot,
  faCircleCheck,
  faEnvelopeCircleCheck,
  faMobileAndroid,
  faVideo,
  faVideoSlash,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
} from "next-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
const defaultProps = {
  center: {
    lat: 42.360081,
    lng: -71.058884,
  },
  zoom: 15,
};

const themeBorderColor = "mint-tulip-500";
const themeTextColor = "mint-tulip-500";
const themeHoverTextColor = "mint-tulip-700";
const themeSecondaryTextColor = "black";

const backgroundClassMap = {
  themeBorderColor: "border-mint-tulip-500",
  themeTextColor: "text-mint-tulip-500",
  themeHoverTextColor: "mint-tulip-700",
  themeTextSecondaryColor: "black",
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

const Profile = ({ therapist }) => {
  const [open, setOpen] = useState(1);
  const router = useRouter();

  let therapist_location;

  if (therapist.country !== "United States" && therapist.country !== "Canada") {
    therapist_location = therapist.city + ", " + therapist.country;
  } else {
    therapist_location = therapist.city + ", " + therapist.state;
  }
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handlePhoneClick = async () => {
    router.push({
      pathname: `tel:${therapist.phoneNumber}`,
    });
    const res = await fetch(`${NEXT_URL}/api/endpoint-update-count`, {
      method: "POST",
      body: JSON.stringify({
        slug: therapist.slug,
        countToBeUpdated: "numberOfCallsToTherapist",
      }),
    });

    if (res.ok) {
      console.log("Successfully Updated Calls To Therapist");
    }
  };

  const handleProfileShareClick = async () => {
    const res = await fetch(`${NEXT_URL}/api/endpoint-update-count`, {
      method: "POST",
      body: JSON.stringify({
        slug: therapist.slug,
        countToBeUpdated: "numberOfProfileShares",
      }),
    });

    if (res.ok) {
      console.log("Successfully Updated Therapist Profile Shares");
    }
  };

  const handleCopyClick = async () => {
    toast.clearWaitingQueue();
    toast.success("Profile Link Copied", {
      toastId: "success1",
    });
    await handleProfileShareClick();
  };

  return (
    <div>
      <ToastContainer limit={1} />

      <div className="flex lg:flex-row flex-col justify-center w-[100vw] px-[5%] lg:px-[5%] bg-gray-500/20">
        <div className="flex flex-row justify-center lg:justify-start py-[2%] px-[2.5%]">
          {/* Therapist Brief Overview, About Me, Video, Education/Training and Specialties */}
          <div className="flex flex-col mr-5">
            <div
              className={`flex flex-col bg-white p-5 ${backgroundClassMap["themeBorderColor"]} border-[3px] rounded-3xl lg:max-w-[700px] md:min-w-[600px]`}
            >
              {/* Therapist ProfilePic Section/Languages */}
              <div className="flex flex-col items-center text-center lg:text-left lg:flex-row ">
                {therapist.profileImageUrl ? (
                  <Image
                    className={`w-[200px] h-[200px] lg:w-[225px] lg:h-[225px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
                    src={therapist.profileImageUrl}
                    width="150"
                    height="150"
                    alt="Badge"
                  />
                ) : (
                  <Image
                    className={`w-[200px] h-[200px] lg:w-[225px] lg:h-[225px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
                    src={therapist_profile_image_sample}
                    width="150"
                    height="150"
                    alt="Badge"
                  />
                )}
                <div className="flex flex-col justify-center px-10 w-full">
                  {/* Name */}

                  <div className="flex flex-row lg:justify-between mb-5">
                    <div className="mr-1 w-full">
                      <h2 className="mt-2 text-2xl lg:pb-2">
                        <span>
                          {therapist.title.label == "None"
                            ? ""
                            : therapist.title.label}{" "}
                          {therapist.firstName + " " + therapist.lastName}
                        </span>
                      </h2>
                    </div>

                    <div className="w-auto">
                      <div className="mr-1">
                        <h2 className="mt-2 text-2xl lg:pb-2">
                          {therapist.professionalTitle.label == "None" ? (
                            ""
                          ) : (
                            <div className="mr-[5%] lg:hidden">
                              <h2 className="mt-2 text-2xl lg:pb-2">{","}</h2>
                            </div>
                          )}
                          {therapist.professionalTitle.label == "None"
                            ? ""
                            : therapist.professionalTitle.label}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Therapist Classification */}
                  <h3 className="mb-2 ">
                    {therapist.classification.label || "General Therapist"}
                  </h3>

                  {/* Languages */}
                  <h3 className="my-2">
                    Languages:
                    <span>
                      {therapist.languages
                        ? therapist.languages.map(
                            (language) => " | " + language.label
                          )
                        : ""}
                    </span>
                  </h3>

                  {/* Location */}
                  <h3>{therapist_location}</h3>

                  {/* Accepting Or Not Accepting New Clients */}
                  <div className="flex items-center justify-center lg:justify-start py-2 lg:py-0 lg:py-2">
                    {therapist.acceptingNewClients ? (
                      <div className="flex items-center justify-center py-5 w-[200px]">
                        <FontAwesomeIcon
                          className={`mr-3 ${backgroundClassMap["themeTextColor"]}`}
                          icon={faUserPlus}
                          size="1x"
                        />
                        <h3 className="">Accepting New Clients</h3>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-5">
                        <FontAwesomeIcon
                          className="mr-3 text-red-500"
                          icon={faUserXmark}
                          size="1x"
                        />
                        <h3>Not Accepting New Clients</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Type of Therapy Offered */}
              <div className="flex flex-col items-center lg:flex-row lg:mt-5 lg:py-4">
                {/* Online Therapy Section */}
                <div className="lg:mr-10 max-w-[300px] py-2 lg:py-0">
                  {therapist.onlineTherapy ? (
                    <div className="flex justify-center">
                      <div className="w-[75px] text-center">
                        <FontAwesomeIcon
                          className={`${backgroundClassMap["themeTextColor"]}`}
                          icon={faVideo}
                          size="2x"
                        />
                      </div>
                      <div className="w-[250px] text-center">
                        <h3>Offers Online Therapy</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center ">
                      <div className="w-[75px] text-center">
                        <FontAwesomeIcon
                          className="text-red-600"
                          icon={faVideoSlash}
                          size="2x"
                        />
                      </div>
                      <div className="w-[250px] text-center">
                        <h3>Does Not Offer Online Therapy</h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* In Person Therapy */}
                <div className="lg:mr-10 max-w-[300px] py-2 lg:py-0">
                  {therapist.inPersonTherapy ? (
                    <div className="lg:mr-10 flex justify-center">
                      <div className="w-[75px] text-center">
                        <FontAwesomeIcon
                          className={`${backgroundClassMap["themeTextColor"]}`}
                          icon={faBuildingCircleCheck}
                          size="2x"
                        />
                      </div>
                      <div className="w-[250px] text-center">
                        <h3>Offers In-Person Therapy</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-[75px] text-center">
                        <FontAwesomeIcon
                          className="text-red-600"
                          icon={faBuildingCircleXmark}
                          size="2x"
                        />
                      </div>
                      <div className="w-[250px] text-center">
                        <h3>Does Not Offer In-Person Therapy</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* A little about me*/}
            <div
              className={`my-5 py-10 max-w-[700px] bg-white  border-${"white"} border-[3px] `}
            >
              <h3
                className={`px-10 text-2xl font-bold pb-5 ${backgroundClassMap["themeTextSecondaryColor"]}`}
              >
                A Little About Me
              </h3>
              <p className="px-10">{therapist.bio || ""}</p>
            </div>
            {/* Specialties */}
            <div className="bg-white p-5 max-w-[700px]">
              <h3 className="text-2xl font-bold pb-5">Specialties</h3>
              <div className="columns-2  ">
                {therapist.specialties?.map((speciality, index) => (
                  <div className="flex items-center " key={index}>
                    <FontAwesomeIcon
                      className="p-2"
                      icon={faCircleDot}
                      size="1x"
                    />
                    <p className="py-2">{speciality.label}</p>
                  </div>
                )) || ""}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[40%] flex flex-col py-[2%] px-[5%] lg:px-0 lg:mr-5 items-center lg:items-start mr-5">
          {/* Schedule Me */}
          <div
            className={`flex flex-col bg-white py-3 pb-7 px-5 border-${"white"} border-[3px] w-[100%] md:min-w-[600px] md:max-w-[500px] items-center`}
          >
            <div>
              <h3
                className={`text-center text-2xl ${backgroundClassMap["themeTextSecondaryColor"]}`}
              >
                Contact Info
              </h3>
              <div>
                <ScrollLink
                  to="myScrollToElement"
                  smooth={true}
                  offset={-100}
                  duration={1000}
                  delay={100}
                >
                  <div className="flex items-center pl-[30px] py-3 cursor-pointer my-5 justify-center lg:justify-start w-[100%]">
                    <FontAwesomeIcon
                      className={`mr-5 ${backgroundClassMap["themeTextColor"]}`}
                      icon={faEnvelopeCircleCheck}
                      size="2x"
                    />
                    <p className={`text-${themeSecondaryTextColor}`}>
                      Send Email
                    </p>
                  </div>
                </ScrollLink>
              </div>
              <div
                className="flex items-center px-[30px] py-3 cursor-pointer my-8"
                onClick={handlePhoneClick}
              >
                <FontAwesomeIcon
                  className={`ml-2 mr-7 text-${themeTextColor}`}
                  icon={faPhoneVolume}
                  size="2x"
                />
                <p className={`text-${themeSecondaryTextColor}`}>
                  {`Call Phone`}
                </p>
              </div>
            </div>
            <div>
              <p
                className={`text-center text-xl py-2 text-${themeSecondaryTextColor}`}
              >
                {`Share ${therapist.firstName}'s Profile`}
              </p>
              <hr />
              {/* Social Media Icons */}
              <div className="flex flex-row justify-center py-2">
                <FacebookShareButton
                  url={`https://www.bestempathy.com/therapists/${therapist.slug}`}
                  hashtag={"#bestempathy"}
                  onClick={handleProfileShareClick}
                >
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                    icon={faFacebookSquare}
                    size="2x"
                  />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={`https://www.bestempathy.com/therapists/${therapist.slug}`}
                  title={`${therapist.firstName} is on Best Empathy Offering Therapy!`}
                  onClick={handleProfileShareClick}
                  separator=":: "
                >
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                    icon={faWhatsappSquare}
                    size="2x"
                  />
                </WhatsappShareButton>

                <TwitterShareButton
                  url={`https://www.bestempathy.com/therapists/${therapist.slug}`}
                  title={`${therapist.firstName} is on Best Empathy Offering Therapy!`}
                  onClick={handleProfileShareClick}
                >
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                    icon={faTwitter}
                    size="2x"
                  />
                </TwitterShareButton>

                <LinkedinShareButton
                  className="text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
                  url={`https://www.bestempathy.com/therapists/${therapist.slug}`}
                >
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                    icon={faLinkedin}
                    size="2x"
                  />
                </LinkedinShareButton>
                <CopyToClipboard
                  text={`https://www.bestempathy.com/therapists/${therapist.slug}`}
                  onCopy={handleCopyClick}
                >
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center cursor-pointer`}
                    icon={faLink}
                    size="2x"
                  />
                </CopyToClipboard>
              </div>
            </div>
          </div>
          {/* Accepted Insurances */}
          {/* <Accordion open={open === 1} icon={<Icon id={1} open={open} />}> */}
          <Accordion
            open={true}
            icon={""}
            className="bg-white mt-5 p-5 border border rounded-sm  max-w-[400px]  md:max-w-[600px] items-center lg:items-start"
          >
            <AccordionHeader onClick={() => handleOpen(1)}>
              Accepted Insurances
            </AccordionHeader>
            <AccordionBody>
              <div className="bg-slate-100 flex flex-col mt-3 text-black font-bold ">
                <div className="columns-2">
                  {therapist.insuranceAccepted
                    ? Object.keys(therapist.insuranceAccepted).map(
                        (key, index) => {
                          if (therapist.insuranceAccepted[key].accepted) {
                            return (
                              <p className="">
                                {key}{" "}
                                <span>
                                  {therapist.insuranceAccepted[key]
                                    .specific_plans || ""}
                                </span>
                              </p>
                            );
                          }
                        }
                      )
                    : "Out of Pocket"}
                </div>

                <div className="flex flex-col py-2">
                  <h3>
                    Session Fee: <span>{therapist.sessionFee || "0"}$</span>
                  </h3>
                  <h3>
                    Pay By:{" "}
                    {therapist.acceptedPaymentMethods
                      ? Object.keys(therapist.acceptedPaymentMethods).map(
                          (key, index) => {
                            if (therapist.acceptedPaymentMethods[key]) {
                              return (
                                <span className="">{`| ${therapist.acceptedPaymentMethods[key].label} `}</span>
                              );
                            }
                          }
                        )
                      : ""}
                  </h3>
                </div>
              </div>
            </AccordionBody>
          </Accordion>

          {/* Degrees and Training */}
          <div
            className={`bg-white border ${backgroundClassMap["themeBorderColor"]} border-[3px] mt-5 px-3 md:min-w-[600px] md:max-w-[700px]`}
          >
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 2}
              icon={<Icon id={2} open={open} />}
              children={undefined}
              onResize={undefined}
              nonce={undefined}
              onResizeCapture={undefined}
            >
              <AccordionHeader
                onClick={() => handleOpen(2)}
                children={undefined}
                onResize={undefined}
                nonce={undefined}
                onResizeCapture={undefined}
              >
                Degrees and Training
              </AccordionHeader>
              <AccordionBody>{therapist.degreesAndTraining}</AccordionBody>
            </Accordion>

            {/* Credentials */}
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 3}
              icon={<Icon id={3} open={open} />}
              children={undefined}
              onResize={undefined}
              nonce={undefined}
              onResizeCapture={undefined}
            >
              <AccordionHeader
                onClick={() => handleOpen(3)}
                children={undefined}
                onResize={undefined}
                nonce={undefined}
                onResizeCapture={undefined}
              >
                Credentials
              </AccordionHeader>
              <AccordionBody>
                <div className=" columns-1 md:columns-2">
                  {therapist.therapyCredentials
                    ? therapist.therapyCredentials.map((credential) => (
                        <div className="mx-auto w-[400px] lg:p-2 lg:w-[250px] md:text-[14px] text-[16px] lg:text-[14px]">
                          &#x2022; {credential.label}
                        </div>
                      ))
                    : ""}
                </div>
              </AccordionBody>
            </Accordion>
            {/* Approaches To Therapy */}
            <Accordion
              className={`bg-white my-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 4}
              icon={<Icon id={4} open={open} />}
              children={undefined}
              onResize={undefined}
              nonce={undefined}
              onResizeCapture={undefined}
            >
              <AccordionHeader
                onClick={() => handleOpen(4)}
                children={undefined}
                onResize={undefined}
                nonce={undefined}
                onResizeCapture={undefined}
              >
                My Approaches to Therapy
              </AccordionHeader>
              <AccordionBody>
                <div className="columns-1 md:columns-2">
                  {therapist.therapyApproaches
                    ? Object.keys(therapist.therapyApproaches).map(
                        (key, index) => {
                          if (therapist.therapyApproaches[key]) {
                            return (
                              <div className="mx-auto w-[400px] lg:p-2 lg:w-[250px] md:text-[14px] text-[16px] lg:text-[14px]">
                                &#x2022;{" "}
                                {therapist.therapyApproaches[key].label}
                              </div>
                            );
                          }
                        }
                      )
                    : ""}
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        </div>
      </div>

      <div className=" py-[2%] flex flex-col items-center lg:items-start lg:flex-row justify-between lg:px-[150px]">
        <div className="flex flex-col items-center bg-white w-[30%] ">
          {/* Google map */}
          <div
            className="pt-10 lg:mt-10 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
            // style={{ height: "100%", width: "100%" }}
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ",
              }}
              // defaultCenter={defaultProps.center}
              defaultCenter={{
                lat: therapist.address?.geometry?.location.lat || 59.955413,
                lng: therapist.address?.geometry?.location.lng || 30.337844,
              }}
              defaultZoom={15}
            >
              {/* <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                  /> 
                */}
            </GoogleMapReact>
          </div>

          <div className="text-center mt-5 mb-10">
            <p className="text-[20px] font-semibold">Office Location</p>
            <p className="text-[20px]">{therapist_location}</p>
          </div>
        </div>
        <div className="w-[60%]">
          <ScrollElement name="myScrollToElement">
            <h3 className="text-center text-[25px]">
              Send an email to{" "}
              <span>
                {therapist.title.label == "None" ? "" : therapist.title.label}
              </span>{" "}
              {therapist.firstName + " " + therapist.lastName}
            </h3>
            <hr className="w-[100%]  bg-black/10 border-0 rounded dark:bg-gray-800 py-[3px] my-2" />
            <ContactForm
              therapist_email_address={therapist.email}
              therapist_slug={therapist.slug}
            />
          </ScrollElement>
        </div>
      </div>
    </div>
  );
};

export default Profile;
