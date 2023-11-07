import React, { FormEvent, useState } from "react";
import { API_URL, NEXT_URL } from "../config/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backgroundClassMap = {
  themeBorderColor: "border-mint-tulip-500",
  themeTextColor: "text-mint-tulip-500",
  themeHoverTextColor: "mint-tulip-700",
  themeTextSecondaryColor: "black",
  buttonBackgroundColor: "bg-mint-tulip-500",
  buttonHoverBackgroundColor: "bg-mint-tulip-700",
};

export const ContactForm = ({ therapist_email_address, therapist_slug }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [formFilled, setFormFilled] = useState(false);

  const validateForm = () => {
    const validName = validateField(name);
    const validEmail = validateEmail();
    const validMessage = validateField(message);

    console.log("Valid Name " + validName);
    console.log("Valid Email " + validEmail);
    console.log("Valid Message " + validMessage);

    if (!validEmail || !validName || !validMessage) {
      setFormFilled(false);
    } else {
      setFormFilled(true);
    }
  };

  const validateField = (field) => {
    return field === undefined || field == null || field.length <= 0
      ? false
      : true;
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.log("Email not Valid");
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    validateForm();
    if (!formFilled) {
      toast.error("Please Fill in All Necessary Fields");
      return false;
    }

    console.log("Still in Function");
    const res = await fetch("/api/endpoint-contact-therapist", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phoneNumber,
        message,
        therapist_email_address,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (res.status == 200) {
      toast.success("Your Email Was Sent Successfully");
      console.log("Updating Email Clicks");
      await updateEmailClicks();
    } else {
      toast.error("Your Email Could Not Be Sent At This Time");
    }
  };

  const updateEmailClicks = async () => {
    fetch(`/api/endpoint-update-count`, {
      method: "POST",
      body: JSON.stringify({
        slug: therapist_slug,
        countToBeUpdated: "numberOfEmailClicks",
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };

  return (
    <div>
      <ToastContainer />

      <form className="p-8" onSubmit={onFormSubmit}>
        <div className="mb-7">
          <label className="block" htmlFor="Name">
            Your Name *
          </label>
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${backgroundClassMap["themeBorderColor"]}`}
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
          />
        </div>
        <div className="mb-7">
          <label className="block" htmlFor="Name">
            Email Address *
          </label>
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${backgroundClassMap["themeBorderColor"]}`}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Address"
          />
        </div>
        <div className="mb-7">
          <label className="block" htmlFor="Name">
            Phone Number
          </label>
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${backgroundClassMap["themeBorderColor"]}`}
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-7">
          <label className="block" htmlFor="Name">
            Message *
          </label>
          <textarea
            rows={10}
            cols={50}
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:${backgroundClassMap["themeBorderColor"]}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div></div>
        <button
          className={`${backgroundClassMap["buttonBackgroundColor"]} hover:${backgroundClassMap["buttonHoverBackgroundColor"]} rounded-md px-10 py-4`}
          type="submit"
        >
          Submit Form
        </button>
      </form>
    </div>
  );
};
