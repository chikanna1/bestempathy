import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ContactForm } from "../../components/ContactForm";

import therapist_profile_image_sample from "../../assets/images/therapist-profile-page/default-profile-icon.jpg";

import { API_URL, NEXT_URL } from "../../config/index";
import { Fragment, useState, useEffect } from "react";

import Profile from "../../components/TherapistProfilePage/profile";

import { faIdCard, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

import SchedulerForm from "../../components/TherapistProfilePage/Scheduler/SchedulerForm";

function ProfilePage({ therapist }) {
  const [open, setOpen] = useState(1);
  const [componentToDisplay, setComponentToDisplay] = useState("profile");

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    updatePageViews();
  }, []);

  const updatePageViews = () => {
    console.log(therapist);
    fetch(`${NEXT_URL}/api/endpoint-update-count`, {
      method: "POST",
      body: JSON.stringify({
        slug: therapist.slug,
        countToBeUpdated: "numberOfProfileViews",
      }),
    })
      .then((res) => res.json())
      .then((response) => console.log(response));
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      {/* Header */}
      <Header />
      <div className="flex flex-row justify-around mx-[25%] text-center py-[1%] mb-[30px] lg:mb-[15px]">
        <div
          className={`${
            componentToDisplay === "profile" ? "border-b-4" : ""
          } flex flex-row items-center mx-10 cursor-pointer`}
          onClick={() => setComponentToDisplay("profile")}
        >
          <FontAwesomeIcon className="my-1" icon={faIdCard} size="2x" />
          <p className="mx-2 w-[50px]">Profile</p>
        </div>
        <div
          className={`${
            componentToDisplay === "scheduler" ? "border-b-4" : ""
          } flex flex-row items-center mx-1 cursor-pointer`}
          onClick={() => setComponentToDisplay("scheduler")}
        >
          <FontAwesomeIcon className="my-1" icon={faCalendarCheck} size="2x" />
          <p className="mx-2 w-[100px]">Book Sessions</p>
        </div>
      </div>

      <div>
        {(() => {
          switch (componentToDisplay) {
            case "profile":
              return <Profile therapist={therapist} />;
            case "scheduler":
              return <SchedulerForm therapist={therapist} />;
            default:
              return <Profile therapist={therapist} />;
          }
        })()}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProfilePage;

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(
    `${API_URL}/api/profiles?filters[slug][$eq]=${slug}&populate=*`
  );
  const therapists = await res.json();

  return {
    props: {
      therapist: therapists.data[0].attributes,
    },
  };
}
