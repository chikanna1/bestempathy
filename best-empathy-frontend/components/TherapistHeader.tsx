import Link from "next/link";

import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import therapist_profile_image_sample from "../assets/images/therapist-profile-page/default-profile-icon.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHome,
  faUserCircle,
  faGear,
  faQuestionCircle,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

const backgroundClassMap = {
  themeBorderColor: "border-mint-tulip-500",
  themeTextColor: "text-mint-tulip-500",
  themeHoverTextColor: "mint-tulip-700",
  themeTextSecondaryColor: "black",
};

const TherapistHeader = ({
  componentToDisplay,
  setComponentToDisplay,
  therapist,
}) => {
  const [isOpen, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const DockComponent = dynamic(() =>
    import("react-dock").then((mod) => mod.Dock)
  );

  const therapistProps = {
    profileImage: therapist.userImageUrl || therapist_profile_image_sample,
    therapistName: therapist.firstName + " " + therapist.lastName,
  };

  const setComponentToDisplayMobile = (componentToBeDisplayed) => {
    console.log("In function");
    setOpen(false);
    setComponentToDisplay(componentToBeDisplayed);
  };
  return (
    <div className="flex flex-col">
      {/* Top Part Header */}
      <div className="flex py-3 items-center justify-between px-10 sticky top-0 z-50">
        <div>
          <h1 className="text-lg p-5 italic">Best Empathy</h1>
        </div>
        <div className="hidden md:flex space-x-5 items-center">
          <Image
            className={`w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] border ${backgroundClassMap["themeBorderColor"]} p-1`}
            src={therapistProps.profileImage}
            alt="Badge"
            width={100}
            height={100}
          />
          <p className="text-[15px]">{therapistProps.therapistName}</p>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
          <div className="mixed-chart">
            {typeof window !== "undefined" && (
              <DockComponent position="top" isVisible={isOpen} size={0.75}>
                <div onClick={() => setOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 mx-auto mb-10 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-center items-center my-2">
                  <div
                    className={`${
                      componentToDisplay === "home" ? "border-b-4" : ""
                    } flex flex-row items-center  mx-1 cursor-pointer`}
                    onClick={() => setComponentToDisplayMobile("home")}
                  >
                    <div className="w-[50px]">
                      <FontAwesomeIcon
                        className="my-1"
                        icon={faHome}
                        size="2x"
                      />
                    </div>
                    <p className="mx-2 w-[130px]">Home</p>
                  </div>
                  <div
                    className={`${
                      componentToDisplay === "edit-profile" ? "border-b-4" : ""
                    } flex flex-row items-center mx-1 cursor-pointer my-2`}
                    onClick={() => setComponentToDisplayMobile("edit-profile")}
                  >
                    <div className="w-[50px]">
                      <FontAwesomeIcon
                        className="my-1"
                        icon={faUserCircle}
                        size="2x"
                      />
                    </div>
                    <p className="mx-2 w-[130px]">Edit Profile</p>
                  </div>
                  <div
                    className={`${
                      componentToDisplay === "account-settings"
                        ? "border-b-4"
                        : ""
                    } flex flex-row items-center mx-1 cursor-pointer my-2`}
                    onClick={() =>
                      setComponentToDisplayMobile("account-settings")
                    }
                  >
                    <div className="w-[50px]">
                      <FontAwesomeIcon
                        className="my-1"
                        icon={faGear}
                        size="2x"
                      />
                    </div>
                    <p className="mx-2 w-[130px]">Account Settings</p>
                  </div>
                  <div
                    className={`${
                      componentToDisplay === "help" ? "border-b-4" : ""
                    } flex flex-row items-center mx-1 cursor-pointer my-2`}
                    onClick={() => setComponentToDisplayMobile("help")}
                  >
                    <div className="w-[50px]">
                      <FontAwesomeIcon
                        className="my-1"
                        icon={faQuestionCircle}
                        size="2x"
                      />
                    </div>
                    <p className="mx-2 w-[130px]">Help</p>
                  </div>
                  <div
                    className={` flex flex-row items-center mx-1 cursor-pointer`}
                    onClick={logout}
                  >
                    <div className="w-[50px]">
                      <FontAwesomeIcon
                        className="my-1"
                        icon={faDoorOpen}
                        size="2x"
                      />
                    </div>
                    <p className="mx-2 w-[130px]">Logout</p>
                  </div>
                </div>
              </DockComponent>
            )}
          </div>
        </div>
      </div>
      {/* Bottom Part Header */}
      <div className="flex flex-row invisible md:visible justify-around mx-[25%] text-center ">
        <div
          className={`${
            componentToDisplay === "home" ? "border-b-4" : ""
          } flex flex-row items-center mx-1 cursor-pointer`}
          onClick={() => setComponentToDisplay("home")}
        >
          <FontAwesomeIcon className="my-1" icon={faHome} size="2x" />
          <p className="mx-2 w-[50px]">Home</p>
        </div>
        <div
          className={`${
            componentToDisplay === "edit-profile" ? "border-b-4" : ""
          } flex flex-row items-center mx-1 cursor-pointer`}
          onClick={() => setComponentToDisplay("edit-profile")}
        >
          <FontAwesomeIcon className="my-1" icon={faUserCircle} size="2x" />
          <p className="mx-2 w-[100px]">Edit Profile</p>
        </div>
        <div
          className={`${
            componentToDisplay === "account-settings" ? "border-b-4" : ""
          } flex flex-row items-center mx-1 cursor-pointer`}
          onClick={() => setComponentToDisplay("account-settings")}
        >
          <FontAwesomeIcon className="my-1" icon={faGear} size="2x" />
          <p className="mx-2 w-[130px]">Account Settings</p>
        </div>
        <div
          className={`${
            componentToDisplay === "help" ? "border-b-4" : ""
          } flex flex-row items-center mx-1 cursor-pointer`}
          onClick={() => setComponentToDisplay("help")}
        >
          <FontAwesomeIcon className="my-1" icon={faQuestionCircle} size="2x" />
          <p className="mx-2">Help</p>
        </div>
        <div
          className={` flex flex-row items-center mx-1 cursor-pointer`}
          onClick={logout}
        >
          <FontAwesomeIcon className="my-1" icon={faDoorOpen} size="2x" />
          <p className="mx-2">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default TherapistHeader;
