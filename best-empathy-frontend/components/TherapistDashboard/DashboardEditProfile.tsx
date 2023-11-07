import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfileModal";
import { API_URL } from "../../config/index";
import { parseCookies } from "../../helpers";
import { cookies } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

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

const EditProfileModal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[90vw] h-[90vh] flex flex-col  overflow-y-auto overflow-x-hidden">
        <div className="bg-white rounded">
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

const DashboardEditProfile = ({ getProfileData, saveProfileData }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col mt-[1%] items-center">
      <hr className="w-[70%] h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
      <div className="cursor-pointer" onClick={() => setShowModal(true)}>
        <p className="text-[40px] text-center">Edit Your Profile</p>
      </div>
      <div>
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon
            className={`${backgroundClassMap["themeTextColor"]} hover:${backgroundClassMap["themeHoverTextColor"]} text-md text-slate-600 p-2 hover:text-slate-400 transition duration-500 rounded-md text-center `}
            icon={faAddressCard}
            size="10x"
          />
        </div>

        <EditProfileModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        >
          <EditProfile
            closeModal={() => setShowModal(false)}
            getProfileData={getProfileData}
            saveProfileData={saveProfileData}
          />
        </EditProfileModal>
      </div>
      <hr className="w-[70%] h-2 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
    </div>
  );
};

export default DashboardEditProfile;
