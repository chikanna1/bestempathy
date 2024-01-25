import React from "react";
import Image from "next/image";
import therapist_profile_image_sample from "../assets/images/therapist-profile-page/default-profile-icon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const backgroundClassMap = {
  themeBorderColor: "border-mint-tulip-500",
  themeTextColor: "text-mint-tulip-500",
  themeHoverTextColor: "mint-tulip-700",
  themeTextSecondaryColor: "black",
};

export const ListingProfileMobile = ({
  therapist,
  handlePhoneClick,
  handleEmailClick,
}) => {
  return (
    <div className="m-3 border-b-2 border-2 shadow-lg hover:shadow-2xl cursor-pointer">
      <div className="flex flex-col">
        {/* Accepting New Clients Or Not */}
        <div className="mx-2">
          {therapist.acceptingNewClients ? (
            <div className="flex items-center  py-2 justify-end">
              <FontAwesomeIcon
                className={`mr-3 ${backgroundClassMap["themeTextColor"]}`}
                icon={faUserPlus}
                size="1x"
              />
              <p className="text-[12px] font-semibold">Accepting New Clients</p>
            </div>
          ) : (
            <div className="flex items-center justify-end py-2">
              <FontAwesomeIcon
                className="mr-3 text-red-500"
                icon={faUserXmark}
                size="1x"
              />
              <p className="text-[12px] font-semibold">
                Not Accepting New Clients
              </p>
            </div>
          )}
        </div>
        {/* Therapist Image and Details */}
        <div className="flex flex-row px-[30px] items-center md:justify-between md:mx-[12.5%] ">
          <div className="w-[35%]  mr-5 mb-5">
            {therapist.profileImageUrl ? (
              <Image
                className={`w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
                src={therapist.profileImageUrl}
                width="175"
                height="175"
                alt="Badge"
              />
            ) : (
              <Image
                className={`w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
                src={therapist_profile_image_sample}
                width="175"
                height="175"
                alt="Badge"
              />
            )}
          </div>

          <div className="flex flex-col w-[65%]">
            {/* Therapist Name */}
            <div className="mb-2">
              <p className="text-[15px] font-semibold">
                {therapist.title.label == "None" ? "" : therapist.title.label}{" "}
                {therapist.firstName + " " + therapist.lastName}
              </p>
              <p className="text-[13px] font-thin">
                {therapist.country === "United States" ||
                therapist.country === "Canada"
                  ? `${therapist.city}, ${therapist.state}`
                  : `${therapist.city}, ${therapist.country}`}
              </p>
              <p className="text-[12px]">
                {therapist.classification.label || "General Therapist"}
              </p>
            </div>
          </div>
        </div>

        {/* Therapist Bio */}
        <div className="mx-[10%] mb-[5%]">
          <p className="text-[16px] font-light">
            {therapist.bio.length > 100
              ? `${therapist.bio.substring(0, 100)},...`
              : therapist.bio}
          </p>
          <p className="hidden md:block md:text-[16px] md:font-light">
            {therapist.bio.length > 150
              ? `${therapist.bio.substring(0, 150)},...`
              : therapist.bio}
          </p>
        </div>

        {/* Type of Therapy Offered */}
        <div className="flex flex-row justify-between mt-5 mx-5 mb-2">
          {/* Online Therapy Section */}
          <div className="">
            {therapist.onlineTherapy ? (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]}`}
                    icon={faVideo}
                    size="1x"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] ml-1">Offers Online Therapy</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <FontAwesomeIcon
                    className="text-red-600"
                    icon={faVideoSlash}
                    size="1x"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] ml-1">
                    Does Not Offer Online Therapy
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* In Person Therapy */}
          <div className="">
            {therapist.inPersonTherapy ? (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <FontAwesomeIcon
                    className={`${backgroundClassMap["themeTextColor"]}`}
                    icon={faBuildingCircleCheck}
                    size="1x"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] ml-1">Offers In-Person Therapy</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="text-center">
                  <FontAwesomeIcon
                    className="text-red-600"
                    icon={faBuildingCircleXmark}
                    size="1x"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] ml-1">
                    Does Not Offer In-Person Therapy
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Call/Email for Plus Members */}
        <div className="mt-5">
          {therapist.plusMember ? (
            <div className="flex">
              <div
                className="flex justify-center items-center bg-mint-tulip-600 text-white w-[45%] py-2 hover:bg-mint-tulip-400 mx-3"
                onClick={() =>
                  handlePhoneClick(therapist.phoneNumber, therapist.slug)
                }
              >
                <div className="text-center mx-3">
                  <FontAwesomeIcon
                    className={`text-white w-[25px]`}
                    icon={faPhoneVolume}
                    size="2x"
                  />
                </div>
                <div className="text-center mx-3">
                  <p className="text-[18px] ml-1">Call</p>
                </div>
              </div>
              <div
                className="flex justify-center items-center bg-mint-tulip-600 text-white w-[45%] py-2 hover:bg-mint-tulip-400 mx-3"
                onClick={() =>
                  handleEmailClick({
                    email: therapist.email,
                    slug: therapist.slug,
                    firstName: therapist.firstName,
                  })
                }
              >
                <div className="text-center mx-3">
                  <FontAwesomeIcon
                    className={`text-white w-[30px]`}
                    icon={faEnvelopeCircleCheck}
                    size="2x"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[18px] ml-1">Message</p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
