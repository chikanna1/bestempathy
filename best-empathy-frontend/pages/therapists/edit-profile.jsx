import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ContactForm } from "../../components/ContactForm";

import therapist_profile_image_sample from "../../assets/images/therapist-profile-page/default-profile-icon.jpg";

import { insuranceOptionsByState } from "./insuranceData";

import { parseCookies } from "../../helpers";

import { API_URL } from "../../config/index";
import { Fragment, useState } from "react";
import Select from "react-select";

import { Switch } from "@material-tailwind/react";
import Modal from "../../components/Modal";
import CreatableSelect from "react-select/creatable";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  faFacebookSquare,
  faInstagramSquare,
  faPinterest,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import {
  faPhoneVolume,
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
} from "@fortawesome/free-solid-svg-icons";

const therapist_address = "Boston, MA";

const therapist_name = "Ebere Okechukwu";
const therapist_location = "Boston, MA";

// const accepted_payment_methods = [
//   { "ACH Bank Transfer": true },
//   { "American Express": false },
//   { Visa: true },
//   { Mastercard: true },
//   { Discover: true },
//   { HSA: false },
//   { Bitcoin: true },
// ];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "hindi", label: "Hindi" },
  { value: "portuguese", label: "Portuguese" },
  { value: "mandarin", label: "Mandarin Chinese" },
  { value: "arabic", label: "Arabic" },
  { value: "igbo", label: "Igbo" },
  { value: "yoruba", label: "Yoruba" },
  { value: "hausa", label: "Hausa" },
  { value: "korean", label: "Korean" },
];

const acceptedPaymentMethods = [
  { value: "achBankTransfer", label: "ACH Bank Transfer" },
  { value: "americanExpress", label: "American Express" },
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "MasterCard" },
  { value: "discover", label: "Discover" },
  { value: "hsa", label: "HSA" },
  { value: "paypal", label: "PayPal" },
  { value: "bitcoin", label: "Bitcoin" },
];

const accepted_payment_methods = {
  "ACH Bank Transfer": true,
  "American Express": false,
  Visa: true,
  Mastercard: true,
  Discover: true,
  HSA: false,
  Bitcoin: true,
};

const therapist_approaches = {
  "Acceptance and Commitment Therapy (ACT)": true,
  "Animal-Assisted Therapies": false,
  "Art Therapy": false,
  "Christian Counseling": false,
  "Cognitive Behavioral Therapy (CBT)": true,
  "Dance and Movement Therapy": false,
  "Dialectical Behavioral Therapy (DBT)": false,
  "Drama Therapy": false,
  "Dream Analysis": false,
  Ecotherapy: false,
  "Eye Movement Desensitization and Reprocessing (EMDR)": false,
  Mindfullness: true,
  Neurofeedback: false,
  Psychoanalysis: false,
  "Solutions Focused Therapy": true,
  "Yoga Therapy": false,
};

const therapistApproaches = [
  {
    value: "acceptanceAndCommitmentTherapy",
    label: "Acceptance and Commitment Therapy (ACT)",
  },
  { value: "animalAssistedTherapies", label: "Animal-Assisted Therapies" },
  { value: "christianCounseling", label: "Christian Counseling" },
  {
    value: "cognitiveBehavioralTherapy",
    label: "Cognitive Behavioral Therapy (CBT)",
  },
  { value: "danceAndMovementTherapy", label: "Dance and Movement Therapy" },
  {
    value: "dialecticalBehavioralTherapy",
    label: "Dialectical Behavioral Therapy (DBT)",
  },
  { value: "dramaTherapy", label: "Drama Therapy" },
  { value: "ecotherapy", label: "Ecotherapy" },
  {
    value: "eyeMovementDesensitizationAndReprocessing",
    label: "Eye Movement Desensitization and Reprocessing (EMDR)",
  },
  { value: "mindfullness", label: "Mindfullness" },
  { value: "neurofeedback", label: "Neurofeedback" },
  { value: "psychoanalysis", label: "Psychoanalysis" },
  { value: "solutionsFocusedTherapy", label: "Solutions Focused Therapy" },
  { value: "yogaTherapy", label: "Yoga Therapy" },
];

const therapistSpecialties = [
  { value: "addictionCounseling", label: "Addiction Counseling" },
  { value: "adhdTreatment", label: "ADHD Treatment" },
  { value: "alzheimersTherapy", label: "Alzheimer's Therapy" },
  { value: "angerManagementTherapy", label: "Anger Management Therapy" },
  { value: "anxietyCounseling", label: "Anxiety Counseling" },
  {
    value: "autismAndAspergersSyndrome",
    label: "Autism & Asperger’s Syndrome",
  },
  { value: "bipolarDisorder", label: "Bipolar Disorder" },
  {
    value: "borderlinePersonalityDisorderTherapy",
    label: "Borderline Personality Disorder Therapy",
  },
  { value: "careerCounseling", label: "Career Counseling" },
  { value: "childCounseling", label: "Child Counseling" },
  { value: "christianCounseling", label: "Christian Counseling" },
  { value: "chronicPainTherapy", label: "Chronic Pain Therapy" },
  { value: "codependencyTherapy", label: "Codependency Therapy" },
  { value: "depressionTherapy", label: "Depression Therapy" },
  {
    value: "dissociativeIdentityDisorderTherapy",
    label: "Dissociative Identity Disorder Therapy",
  },
  { value: "divorceCounseling", label: "Divorce Counseling" },
  { value: "domesticAbuseAndViolence", label: "Domestic Abuse & Violence" },
  { value: "eatingDisordersTreatment", label: "Eating Disorders Treatment" },
  { value: "emotionalAbuseTherapy", label: "Emotional Abuse Therapy" },
  { value: "forgivenessTherapy", label: "Forgiveness Therapy" },
  { value: "gamblingAddictionTherapy", label: "Gambling Addiction Therapy" },
  { value: "griefAndLossCounseling", label: "Grief & Loss Counseling" },
  { value: "hoardingTherapy", label: "Hoarding Therapy" },
  { value: "impulseControlDisorder", label: "Impulse Control Disorder" },
  { value: "infertilityCounseling", label: "Infertility Counseling" },
  { value: "infidelityCounseling", label: "Infidelity Counseling" },
  { value: "lgbqtplusTherapy", label: "LGBTQ+ Therapy" },
  { value: "lifeCoaching", label: "Life Coaching" },
  {
    value: "marriageCounselingAndCouplesTherapy",
    label: "Marriage Counseling & Couples Therapy",
  },
  {
    value: "medicationManagementTherapy",
    label: "Medication Management Therapy",
  },
  {
    value: "narcissisticPersonalityDisorder",
    label: "Narcissistic Personality Disorder",
  },
  { value: "obesityTherapy", label: "Obesity Therapy" },
  { value: "ocdCounseling", label: "OCD Counseling" },
  { value: "parentingCounseling", label: "Parenting Counseling" },
  {
    value: "personalityDisordersTreatment",
    label: "Personality Disorders Treatment",
  },
  { value: "postpartumDepression", label: "Postpartum Depression" },
  { value: "psychosisTherapy", label: "Psychosis Therapy" },
  { value: "ptsdAndTraumaTherapy", label: "PTSD & Trauma Therapy" },
  { value: "schizophreniaTherapy", label: "Schizophrenia Therapy" },
  { value: "selfesteemTherapy", label: "Self-Esteem Therapy" },
  { value: "sexTherapy", label: "Sex Therapy" },
  { value: "sexualAbuseTherapy", label: "Sexual Abuse Therapy" },
  { value: "sleepDisordersTreatment", label: "Sleep Disorders Treatment" },
  { value: "socialAnxietyTherapy", label: "Social Anxiety Therapy" },
  { value: "spiritualityTherapy", label: "Spirituality Therapy" },
  { value: "stressManagementTherapy", label: "Stress Management Therapy" },
  { value: "suicideTherapy", label: "Suicide Therapy" },
  { value: "thinkingDisordersTherapy", label: "Thinking Disorders Therapy" },
  { value: "Weight Loss Therapy", label: "Weight Loss Therapy" },
  { value: "Women’s Issues", label: "Women’s Issues" },
];

const therapistCredentials = [
  {
    value: "licensedSchoolCounselor",
    label: "Licensed School Counselor (LSC)",
  },
  { value: "preLicensedProfessional", label: "Pre-Licensed Professional" },
  { value: "preLicensedClinician", label: "Pre-Licensed Clinician" },
  { value: "psychologist", label: "Psychologist" },
  { value: "psychiatrist", label: "Psychiatrist" },
];

const therapist_degrees_and_training =
  "Master of Science from MerrickMack College, Bachelors of Science from University of Massachusetts";
const therapist_bio =
  "I have been practicing for over 17 years and have successfully helped thousands of clients. I help my clients get to the root cause of their issues and work from all angles to help them to make long lasting improvements in their life. I come from an abusive traumatic childhood which led me to many years of therapy and eventually inspired me to become one myself. Then in my adulthood, I suffered through another traumatic event that sent me to the dark night of the soul. Through that healing journey I realized everything is connected and in order for me to heal, I had to evaluate what I was eating, how I was moving my body, who I was interacting with, and add in a mindfulness practice. From this experience, I created the Holistic Approach which I apply with clients today and have much success in changing their lives";

const therapistState = "MA";

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

function ProfilePage({ therapist, token, profile }) {
  const [open, setOpen] = useState(1);
  const [showModalFacebook, setShowModalFacebook] = useState(false);
  const [showModalTwitter, setShowModalTwitter] = useState(false);
  const [showModalInstagram, setShowModalInstagram] = useState(false);
  const [showModalLinkedin, setShowModalLinkedin] = useState(false);
  const [showModalPinterest, setShowModalPinterest] = useState(false);

  const [values, setValues] = useState({
    displayName: profile.firstName + " " + profile.lastName,
    title: "",
    classification: "",
    languages: [],
    acceptingNewClients: profile.acceptingNewClients || false,
    onlineTherapy: profile.onlineTherapy || false,
    inPersonTherapy: profile.inPersonTherapy || false,
    bio: "",
    specialties: [],
    facebook: "",
    instagram: "",
    pinterest: "",
    linkedin: "",
    twitter: "",
    insuranceAccepted: {},
    sessionFee: null,
    degreesAndTraining: "",
    therapyCredentials: [],
    therapyApproaches: [],
  });

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setValues({ ...values, [name]: value });
  };

  const handleInputChangeNumber = (e) => {
    const { name, value } = e.target;
    const result = value.replace(/\D/g, "");

    setValues({ ...values, [name]: result });
  };

  const handleChangeSwitch = (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleInputChangeList = (event, action) => {
    console.log(event);
    console.log(action);
    // setValues({ ...values, [event.target.name]: selectedOptions });
    // console.log(values);
  };

  const handleSubmit = () => {
    console.log("Form Submitted");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      <form onSubmit={handleSubmit}>
        <div className="flex lg:flex-row flex-col justify-center w-[100vw] px-[5%] lg:px-[5%] bg-gray-500/20">
          <div className="flex flex-row justify-center lg:justify-start py-[2%] px-[2.5%]">
            {/* Therapist Brief Overview, About Me, Video, Education/Training and Specialties */}
            <div className="flex flex-col md:mr-5">
              <div
                className={`flex flex-col bg-white p-5 ${backgroundClassMap["themeBorderColor"]} border-[3px] rounded-3xl max-w-[400px] md:max-w-[700px]`}
              >
                <div className="flex items-center justify-center lg:justify-end py-2 lg:py-0">
                  <div className="flex flex-row items-center mb-3 lg:mb-5">
                    <div className="mr-2 mt-2">
                      <Switch
                        id="acceptingNewClients"
                        color="teal"
                        checked={values.acceptingNewClients}
                        name="acceptingNewClients"
                        onChange={handleChangeSwitch}
                      />
                    </div>
                    <div>
                      {values.acceptingNewClients ? (
                        <div className="flex items-center justify-center w-[250px]">
                          <FontAwesomeIcon
                            className={`mr-3 ${backgroundClassMap["themeTextColor"]}`}
                            icon={faUserPlus}
                            size="1x"
                          />
                          <h3 className="w-[200px]">Accepting New Clients</h3>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-[250px]">
                          <FontAwesomeIcon
                            className="mr-3 text-red-500"
                            icon={faUserXmark}
                            size="1x"
                          />
                          <h3 className="w-[200px]">
                            Not Accepting New Clients
                          </h3>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Therapist ProfilePic Section/Languages */}
                <div className="flex flex-col items-center text-center lg:text-left lg:flex-row ">
                  <Image
                    className={`w-[200px] h-[200px] lg:w-[225px] lg:h-[225px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
                    src={therapist_profile_image_sample}
                    alt="Badge"
                  />

                  <div className="flex flex-col justify-center px-10 mt-10 lg:mt-0">
                    {/* Name and Title */}
                    <div className="flex flex-row justify-between mb-[-5px] px-5">
                      <div className="mr-1 w-[80%]">
                        <input
                          className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
                          type="text"
                          name="displayName"
                          placeholder={`Display Name`}
                          value={values.displayName}
                          onChange={handleInputChange}
                          required={true}
                          maxLength={25}
                        />
                      </div>

                      <div className="w-[20%]">
                        <input
                          className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
                          type="text"
                          name="title"
                          placeholder={`Title`}
                          value={values.title}
                          onChange={handleInputChange}
                          required={true}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    {/* Therapist Classification */}
                    <div className="my-5 px-5">
                      <input
                        className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
                        type="text"
                        name="classification"
                        placeholder={`Classification`}
                        value={values.classification}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    {/* Languages */}
                    <div className="flex flex-row mt-4">
                      <div>
                        <h3 className="my-2">Languages:</h3>
                      </div>
                      <div className="px-5 w-[300px]">
                        <Select
                          isMulti
                          name="languages"
                          options={languageOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleInputChangeList}
                          isOptionDisabled={() => values.languages.length >= 3}
                        />
                      </div>
                    </div>
                    {/* Location */}

                    <h3 className="mt-5 font-bold text-gray-700">
                      {therapist_location}
                    </h3>
                    {/* Accepting Or Not Accepting New Clients */}
                  </div>
                </div>

                {/* Type of Therapy Offered */}
                <div className="flex flex-col items-center lg:flex-row lg:mt-5">
                  {/* Online Therapy Section */}
                  <div className="flex flex-col items-center">
                    <div className="lg:mr-10 max-w-[300px] py-2 lg:py-0">
                      {values.onlineTherapy ? (
                        <div className="flex justify-center">
                          <div className="w-[75px] text-center">
                            <FontAwesomeIcon
                              className={`${backgroundClassMap["themeTextColor"]}`}
                              icon={faPhoneVolume}
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
                              icon={faPhoneSlash}
                              size="2x"
                            />
                          </div>
                          <div className="w-[250px] text-center">
                            <h3>Does Not Offer Online Therapy</h3>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mr-2 mt-1">
                      <Switch
                        id="onlineTherapy"
                        color="teal"
                        checked={values.onlineTherapy}
                        name="onlineTherapy"
                        onChange={handleChangeSwitch}
                      />
                    </div>
                  </div>

                  {/* In Person Therapy */}
                  <div className="flex flex-col items-center">
                    <div className="lg:mr-10 max-w-[300px] py-2 lg:py-0">
                      {values.inPersonTherapy ? (
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
                            <h3>Not Offering In-Person Therapy</h3>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mr-2 mt-1">
                      <Switch
                        id="inPersonTherapy"
                        color="teal"
                        checked={values.inPersonTherapy}
                        name="inPersonTherapy"
                        onChange={handleChangeSwitch}
                      />
                    </div>
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
                <div className="px-10">
                  <textarea
                    className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                    type="text"
                    name="title"
                    placeholder={`Bio`}
                    value={values.title}
                    onChange={handleInputChange}
                    required={true}
                    rows={10}
                    maxLength={1000}
                  />
                </div>
              </div>
              {/* Specialties */}
              <div className="bg-white p-5 max-w-[700px]">
                <h3 className="text-2xl font-bold pb-5">Specialties</h3>
                <div className="px-5 w-[100%] pb-5">
                  <Select
                    isMulti
                    name="therapistSpecialities"
                    options={therapistSpecialties}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleInputChangeList}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[40%] flex flex-col py-[2%] px-[5%] lg:px-0 mr-5 lg:mt-5">
            {/* Contact Me */}
            <div
              className={`flex flex-col bg-white py-3 pb-7 px-5 border-${"white"} border-[3px] max-w-[700px]  `}
            >
              <div>
                <h3
                  className={`text-center text-2xl ${backgroundClassMap["themeTextSecondaryColor"]}`}
                >
                  Contact Info
                </h3>
                <div className="flex items-center px-[30px] py-3">
                  <FontAwesomeIcon
                    className={`mr-5 ${backgroundClassMap["themeTextColor"]}`}
                    icon={faEnvelopeCircleCheck}
                    size="2x"
                  />
                  <p className={`text-${themeSecondaryTextColor}`}>
                    Send Email
                  </p>
                </div>
                <div className="flex items-center px-[30px] py-3">
                  <FontAwesomeIcon
                    className={`ml-2 mr-7 text-${themeTextColor}`}
                    icon={faMobileAndroid}
                    size="2x"
                  />
                  <p className={`text-${themeSecondaryTextColor}`}>
                    Phone Number
                  </p>
                </div>
              </div>
              <div>
                <p
                  className={`text-center text-xl py-2 text-${themeSecondaryTextColor}`}
                >
                  Social Media
                </p>
                <hr />
                {/* Social Media Icons */}
                <div className="flex flex-row justify-center py-2">
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModalFacebook(true)}
                    >
                      <FontAwesomeIcon
                        className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                        icon={faFacebookSquare}
                        size="2x"
                      />
                    </button>
                    <Modal
                      isVisible={showModalFacebook}
                      onClose={() => setShowModalFacebook(false)}
                    >
                      <div className="py-[50px] px-5 flex flex-col items-center justify-center">
                        <h3 className="py-5 text-lg">
                          Please Enter the Link to Your Facebook Page/Profile if
                          you would like to share it
                        </h3>
                        <div className="w-[80%]">
                          <input
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                            type="text"
                            name="facebook"
                            placeholder={`Facebook Page/Profile URL`}
                            value={values.facebook}
                            onChange={handleInputChange}
                            required={true}
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModalInstagram(true)}
                    >
                      <FontAwesomeIcon
                        className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                        icon={faInstagramSquare}
                        size="2x"
                      />
                    </button>
                    <Modal
                      isVisible={showModalInstagram}
                      onClose={() => setShowModalInstagram(false)}
                    >
                      <div className="py-[50px] px-5 flex flex-col items-center justify-center">
                        <h3 className="py-5 text-lg">
                          Please Enter the Link to Your Instagram Page/Profile
                          if you would like to share it
                        </h3>
                        <div className="w-[80%]">
                          <input
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                            type="text"
                            name="instagram"
                            placeholder={`Instagram Page/Profile URL`}
                            value={values.instagram}
                            onChange={handleInputChange}
                            required={true}
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModalTwitter(true)}
                    >
                      <FontAwesomeIcon
                        className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                        icon={faTwitter}
                        size="2x"
                      />
                    </button>
                    <Modal
                      isVisible={showModalTwitter}
                      onClose={() => setShowModalTwitter(false)}
                    >
                      <div className="py-[50px] px-5 flex flex-col items-center justify-center">
                        <h3 className="py-5 text-lg">
                          Please Enter the Link to Your Twitter Page/Profile if
                          you would like to share it
                        </h3>
                        <div className="w-[80%]">
                          <input
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                            type="text"
                            name="twitter"
                            placeholder={`Twitter Page/Profile URL`}
                            value={values.twitter}
                            onChange={handleInputChange}
                            required={true}
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModalPinterest(true)}
                    >
                      <FontAwesomeIcon
                        className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                        icon={faPinterest}
                        size="2x"
                      />
                    </button>
                    <Modal
                      isVisible={showModalPinterest}
                      onClose={() => setShowModalPinterest(false)}
                    >
                      <div className="py-[50px] px-5 flex flex-col items-center justify-center">
                        <h3 className="py-5 text-lg">
                          Please Enter the Link to Your Pinterest Page/Profile
                          if you would like to share it
                        </h3>
                        <div className="w-[80%]">
                          <input
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                            type="text"
                            name="pinterest"
                            placeholder={`Pinterest Page/Profile URL`}
                            value={values.pinterest}
                            onChange={handleInputChange}
                            required={true}
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowModalLinkedin(true)}
                    >
                      <FontAwesomeIcon
                        className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center`}
                        icon={faLinkedin}
                        size="2x"
                      />
                    </button>
                    <Modal
                      isVisible={showModalLinkedin}
                      onClose={() => setShowModalLinkedin(false)}
                    >
                      <div className="py-[50px] px-5 flex flex-col items-center justify-center">
                        <h3 className="py-5 text-lg">
                          Please Enter the Link to Your Linkedin Page/Profile if
                          you would like to share it
                        </h3>
                        <div className="w-[80%]">
                          <input
                            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                            type="text"
                            name="instagram"
                            placeholder={`Linkedin Page/Profile URL`}
                            value={values.linkedin}
                            onChange={handleInputChange}
                            required={true}
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            {/* Accepted Insurances */}
            {/* <Accordion open={open === 1} icon={<Icon id={1} open={open} />}> */}
            <Accordion
              open={true}
              icon={""}
              className="bg-white mt-5 p-5 border border rounded-sm"
            >
              <AccordionHeader onClick={() => handleOpen(1)} className="">
                <h3 className="md">Payment and Insurance Section</h3>
              </AccordionHeader>
              <AccordionBody>
                <div className="bg-slate-100 flex flex-col mt-3 text-black font-bold  ">
                  <div className="flex flex-row items-center">
                    <h3>Accepted Insurances</h3>
                    <div className="px-5 w-[70%] ">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        name="therapistSpecialities"
                        options={insuranceOptionsByState[therapistState]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleInputChangeList}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col pt-[100px] pb-[20px]">
                    <div className="flex flex-row items-center">
                      <h3 className="w-[100px]">Session Fee: </h3>
                      <input
                        className="appearance-none bg-transparent text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2 w-[100px]"
                        type="text"
                        name="sessionFee"
                        placeholder={`$`}
                        value={values.sessionFee}
                        onChange={handleInputChangeNumber}
                        required={true}
                        maxLength={4}
                      />
                      $
                    </div>
                    <div className="flex flex-row py-10 items-center h-[200px]">
                      <h3 className="pr-5">Payment Methods: </h3>
                      <div className="w-[300px]">
                        <Select
                          isMulti
                          name="acceptedPaymentMethods"
                          maxMenuHeight={100}
                          options={acceptedPaymentMethods}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleInputChangeList}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </Accordion>

            {/* Degrees and Training */}
            <div
              className={`bg-white border ${backgroundClassMap["themeBorderColor"]} border-[3px] mt-5 px-3`}
            >
              <Accordion
                className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
                open={open === 2}
                icon={<Icon id={2} open={open} />}
              >
                <AccordionHeader onClick={() => handleOpen(2)}>
                  Degrees and Training
                </AccordionHeader>
                <AccordionBody>
                  <div className="px-10">
                    <textarea
                      className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-2"
                      type="text"
                      name="title"
                      placeholder={`Degrees and Training Brief`}
                      value={values.title}
                      onChange={handleInputChange}
                      required={true}
                      rows={10}
                      maxLength={1000}
                    />
                  </div>
                </AccordionBody>
              </Accordion>

              {/* Credentials */}
              <Accordion
                className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
                open={open === 3}
                icon={<Icon id={3} open={open} />}
              >
                <AccordionHeader onClick={() => handleOpen(3)}>
                  Credentials
                </AccordionHeader>
                <AccordionBody>
                  <div className="px-10 h-[250px]">
                    <CreatableSelect
                      isMulti
                      options={therapistCredentials}
                      placeholder={"Choose/Create Credential Choices"}
                    />
                  </div>
                </AccordionBody>
              </Accordion>
              {/* Approaches To Therapy */}
              <Accordion
                className={`bg-white my-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
                open={open === 4}
                icon={<Icon id={4} open={open} />}
              >
                <AccordionHeader onClick={() => handleOpen(4)}>
                  My Approaches to Therapy
                </AccordionHeader>
                <AccordionBody>
                  <div className="px-10 h-[250px]">
                    <Select
                      isMulti
                      name="therapistApproaches"
                      maxMenuHeight={200}
                      options={therapistApproaches}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleInputChangeList}
                    />
                  </div>
                </AccordionBody>
              </Accordion>
            </div>
          </div>
          {/* End Form */}
        </div>
      </form>
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
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              {/* <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                /> */}
            </GoogleMapReact>
          </div>
          <div className="text-center lg:text-left mb-10">
            <p className="text-[20px]">Office Location:</p>
            <p className="text-[20px]">{therapist_address}</p>
          </div>
        </div>
        <div className="w-[60%]">
          <h3 className="text-center text-[25px]">Email to {therapist_name}</h3>
          <hr className="w-[100%]  bg-black/10 border-0 rounded dark:bg-gray-800 py-[3px] my-2" />
          <ContactForm
            therapist_email_address={"chika.ekene@gmail.com"}
            borderColor={themeBorderColor}
          />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProfilePage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const therapist = await res.json();
  const profileId = therapist.profileId;

  const profileRes = await fetch(`${API_URL}/api/profiles/${profileId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const profile = await profileRes.json();

  return {
    props: {
      therapist,
      token,
      profile,
    },
  };
}
