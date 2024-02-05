import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { Switch } from "@material-tailwind/react";
import LocationInput from "../LocationInput";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const classificationOptions = [
  { value: "prelicensedProfessional", label: "Pre-Licensed Professional" },
  { value: "artTherapist", label: "Art Therapist" },
  { value: "generalTherapist", label: "General Therapist" },
  {
    value: "clinicalSocialWorkTherapist",
    label: "Clinical Social Work/Therapist",
  },
  { value: "counselor", label: "Counselor" },
  { value: "drugAndAlcoholCounselor", label: "Drug & Alcohol Counselor" },
  {
    value: "licensedProfessionalCounselor",
    label: "Licensed Professional Counselor",
  },
  { value: "licensedPsychoanalyst", label: "Licensed Psychoanalyst" },
  { value: "lpcIntern", label: "LPC Intern" },
  { value: "marriageAndFamilyTherapist", label: "Marriage & Family Therapist" },
  {
    value: "marriageAndFamilyTherapistIntern",
    label: "Marriage & Family Therapist Intern",
  },
  {
    value: "marriageAndFamilyTherapistAssociate",
    label: "Marriage & Family Therapist Associate",
  },
  { value: "occupationalTherapist", label: "Occupational Therapist" },
  { value: "pastoralCounselor", label: "Pastoral Counselor" },
  { value: "physicianAssistant", label: "Physician Assistant" },
  {
    value: "psychiatricNursePractitioner",
    label: "Psychiatric Nurse Practitioner",
  },
  { value: "psychiatrist", label: "Psychiatrist" },
  { value: "psychologist", label: "Psychologist" },
  { value: "registeredPsychotherapist", label: "Registered Psychotherapist" },
  { value: "other", label: "Other" },
];

const titleOptions = [
  { value: "none", label: "None" },
  { value: "mr", label: "Mr." },
  { value: "ms", label: "Ms." },
  {
    value: "mrs",
    label: "Mrs.",
  },
  { value: "madam", label: "Madam" },
  { value: "miss", label: "Miss" },
  {
    value: "sir",
    label: "Sir.",
  },
  { value: "dr", label: "Dr." },
  { value: "doctor", label: "Doctor" },
  { value: "chief", label: "Chief" },
  {
    value: "sultan",
    label: "Sultan",
  },
  {
    value: "oba",
    label: "Oba",
  },
  { value: "eze", label: "Eze" },
  { value: "don", label: "Don" },
];

const professionalTitleOptions = [
  { value: "none", label: "None" },
  { value: "M.D.", label: "M.D. (Medical Doctor)" },
  { value: "Ph.D.", label: "Ph.D. (Doctor of Philosophy)" },
  {
    value: "Psy.D",
    label: "Psy.D. (Doctor of Psychology)",
  },
  { value: "D.Min.", label: "D.Min. (Doctor of Ministry)" },
  {
    value: "M.S.W: Stands for Master of Social Work",
    label: "M.S.W (Master of Social Work)",
  },
  {
    value: "M.Ed.",
    label: "M.Ed (Master of Education)",
  },
  { value: "M.S.Ed.", label: "M.S.Ed (Master of Science in Education)" },
  { value: "M.A.", label: "M.A. (Master of Arts)" },
  {
    value: "M.S.",
    label: "M.S. (Master of Science)",
  },
  {
    value: "Ed.S.",
    label: "Ed.S. (Educational Specialist)",
  },
  { value: "M.Div.", label: "M.Div. (Masters in Divinity)" },
  { value: "L.P.C.", label: "L.P.C. (Licensed Professional Counselor)" },
  { value: "L.M.H.C.", label: "L.M.H.C. (Licensed Mental Health Counselor) " },
  {
    value: "L.C.P.C.",
    label: "L.C.P.C. (Licensed Clinical Professional Counselor)",
  },
  {
    value: "L.P.C.C.",
    label:
      "L.P.C.C. (Licensed Professional Clinical Counselor of Mental Health)",
  },
  {
    value: "L.C.M.H.C.",
    label: "L.C.M.H.C. (Licensed Clinical Mental Health Counselor)",
  },
  {
    value: "L.M.H.P.",
    label: "L.M.H.P. (Licensed Mental Health Practitioner)",
  },
  {
    value: "M.F.C.C.",
    label: "M.F.C.C. (Marriage, Family, and Child Counselor)",
  },
  { value: "CADC", label: "CADC (Certified Alcohol and Drug Counselor)" },
  { value: "CAC", label: "CAC (Certified Addiction Counselor)" },
  { value: "NCAC", label: "NCAC (National Certified Addiction Counselor)" },
];
const UserDetailsForm = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangeAddress = (formattedAddressValue, addressValue) => {
    props.updateValue("formattedAddress", formattedAddressValue);
    props.updateValue("address", addressValue);
  };

  const handleChangePhoneNumber = (value) => {
    props.updateValue("phoneNumber", value);
    console.log(props.values.phoneNumber);
  };

  return (
    <div className="px-[20%] pt-[2.5%]">
      <div className="px-2 pb-5">
        <h3 className="text-[35px] text-center lg:text-left">
          Let's Get Started!
        </h3>
        <p className="text-[12px] text-center lg:text-left">
          Please Complete All Fields
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between my-5">
        {/* Title */}
        <div className="mt-5 lg:w-[15%]">
          <p className="px-2 mb-3 md:text-left font-semibold">Title</p>
          <div className="px-2 mt-[-2px]">
            <Select
              value={props.values.title}
              onChange={props.handleInputChangeSelect}
              defaultValue={{ value: "none", label: "None" }}
              options={titleOptions}
              name="title"
              classNames={{
                control: () => "border-[3px] border-gray-300 rounded-md",
              }}
              styles={{
                option: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
                singleValue: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
              }}
            />
          </div>
        </div>
        <div className="mt-5 lg:w-[40%]">
          <p className="px-2 mb-4 font-semibold">First Name</p>
          <input
            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
            type="text"
            name="firstName"
            placeholder={`First Name`}
            value={props.values.firstName}
            onChange={props.handleInputChange}
            required={true}
          />
        </div>
        <div className="mt-5 lg:w-[40%]">
          <p className="px-2 mb-4 md:text-left font-semibold">Last Name</p>
          <input
            className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
            type="text"
            name="lastName"
            placeholder={`Last Name`}
            value={props.values.lastName}
            onChange={props.handleInputChange}
            required={true}
          />
        </div>
      </div>
      <div className="my-10">
        <p className="px-2 mb-2  md:text-left font-semibold">Email Address</p>
        <input
          autoComplete="new-password"
          className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
          type="text"
          name="email"
          placeholder={`Email Address`}
          value={props.values.email}
          onChange={props.handleInputChange}
          required={true}
        />
      </div>
      <div className="my-10">
        <p className="px-2 mb-2  md:text-left font-semibold">Password</p>
        <input
          autoComplete="new-password"
          className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
          type="password"
          name="password"
          placeholder={`Password`}
          value={props.values.password}
          onChange={props.handleInputChange}
          required={true}
        />
      </div>
      <div className="my-10">
        <p className="px-2 mb-2 md:text-left font-semibold">
          Confirm Password *
        </p>
        <input
          className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b-2"
          type="password"
          name="confirmPassword"
          placeholder={`Confirm Password *`}
          value={props.values.confirmPassword}
          onChange={props.handleInputChange}
          required={true}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between my-5">
        <div className="lg:w-[47%] mt-5 lg:mt-1">
          <p className="px-2 mb-2 md:text-left font-semibold">
            Mental Health Role Classification
          </p>
          <div className="px-1 mb-2">
            <Select
              value={props.values.classification}
              onChange={props.handleInputChangeSelect}
              options={classificationOptions}
              name="classification"
              classNamePrefix="select"
            />
          </div>
        </div>
        <div className="lg:w-[47%] mt-5 lg:mt-1">
          <p className="px-2 mb-2 md:text-left font-semibold">
            Primary Professional Title
          </p>
          <div className="px-1 mb-2">
            <Select
              value={props.values.professionalTitle}
              onChange={props.handleInputChangeSelect}
              options={professionalTitleOptions}
              defaultValue={{ value: "none", label: "None" }}
              name="professionalTitle"
              classNames={{
                control: () => "border-[3px] border-gray-300 rounded-md",
              }}
              styles={{
                option: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
                singleValue: (styles, { data }) => ({
                  ...styles,
                  color: data.value === "none" ? "transparent" : styles.color,
                }),
              }}
            />
          </div>
        </div>
      </div>
      <div className="my-10 px-2 ">
        <p className="mb-1 font-semibold">Phone Number</p>
        <p className="mb-1 text-[12px]">
          Enter the Phone Number For Which Clients can Contact You
        </p>
        <PhoneInput
          placeholder="Enter phone number"
          name="phoneNumber"
          value={props.values.phoneNumber}
          onChange={handleChangePhoneNumber}
          defaultCountry="US"
          numberInputProps={{
            className:
              "rounded-md ml-2 py-2 px-10 min-w-[350px] w-[100%] focus:outline-gray-600 focus:bg-white outline outline-2 outline-gray-400", // my Tailwind classes
          }}
        />
      </div>
      <div className="my-5 px-2 ">
        <p className="mb-1 font-semibold">Primary Location</p>
        <p className="mb-1 text-[12px]">
          Enter your Primary Office Address or City
        </p>
        <LocationInput
          setAddressValue={props.setAddressValue}
          setFormattedAddressValue={props.setFormattedAddressValue}
          setCity={props.setCity}
          setState={props.setState}
          setCountry={props.setCountry}
          setCoordinates={props.setCoordinates}
        />
      </div>
    </div>
  );
};

export default UserDetailsForm;
