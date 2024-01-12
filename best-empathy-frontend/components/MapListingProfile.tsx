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

export const MapListingProfile = ({ therapist }) => {
  return (
    <div className="m-1 shadow-sm cursor-pointer">
      <div className="flex flex-row w-[100%] px-[5px] py-[5px] items-center">
        {/* Therapist Image */}
        <div className="w-[35%] mr-5 mb-5">
          {therapist.profileImageUrl ? (
            <Image
              className={`w-[50px] h-[50px] lg:w-[85px] lg:h-[85px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
              src={therapist.profileImageUrl}
              width="175"
              height="175"
              alt="Badge"
            />
          ) : (
            <Image
              className={`w-[50px] h-[50px] lg:w-[85px] lg:h-[85px] rounded-full border ${backgroundClassMap["themeBorderColor"]} p-1`}
              src={therapist_profile_image_sample}
              width="175"
              height="175"
              alt="Badge"
            />
          )}
        </div>

        {/* Therapist Name and Address*/}
        <div className="flex flex-col ">
          <div className="">
            <p className="text-[14px] font-semibold">
              {therapist.title.label == "None" ? "" : therapist.title.label}{" "}
              {therapist.firstName + " " + therapist.lastName}
            </p>
            <p className="text-[13px] font-thin">
              {therapist.country === "United States" ||
              therapist.country === "Canada"
                ? `${therapist.city}, ${therapist.state}`
                : `${therapist.city}, ${therapist.country}`}
            </p>
          </div>

          {/* Type of Therapy Offered */}
          <div className="flex flex-row justify-between mt-5">
            {/* Online Therapy Section */}
            <div className="mr-5">
              {therapist.onlineTherapy ? (
                <div className="flex flex-col">
                  <div className="">
                    <FontAwesomeIcon
                      className={`${backgroundClassMap["themeTextColor"]} mb-2`}
                      icon={faVideo}
                      size="1x"
                    />
                  </div>
                  <div className="">
                    <p className="text-[11px]">Offers Online Therapy</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="">
                    <FontAwesomeIcon
                      className="text-red-600 mb-2"
                      icon={faVideoSlash}
                      size="1x"
                    />
                  </div>
                  <div className="">
                    <p className="text-[11px]">Does Not Offer Online Therapy</p>
                  </div>
                </div>
              )}
            </div>

            {/* In Person Therapy */}
            <div className="">
              {therapist.inPersonTherapy ? (
                <div className="flex flex-col">
                  <div className="">
                    <FontAwesomeIcon
                      className={`${backgroundClassMap["themeTextColor"]} mb-2`}
                      icon={faBuildingCircleCheck}
                      size="1x"
                    />
                  </div>
                  <div className="">
                    <p className="text-[11px]">Offers In-Person Therapy</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="">
                    <FontAwesomeIcon
                      className="text-red-600 mb-2"
                      icon={faBuildingCircleXmark}
                      size="1x"
                    />
                  </div>
                  <div className="">
                    <p className="text-[11px]">
                      Does Not Offer In-Person Therapy
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
