import React, { useEffect, useState, useContext } from "react";
import therapist_profile_image_sample from "../../assets/images/therapist-profile-page/default-profile-icon.jpg";
import Image from "next/image";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import AuthContext from "../../context/AuthContext";

ChartJS.register(ChartDataLabels);

ChartJS.register(ArcElement, Tooltip, Legend);

import { faCheckCircle, faImage } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import EditProfileModal from "./EditProfileModal";
import EditProfile from "./EditProfileModal";
import Modal from "../Modal";
import ImageUpload from "../ImageUpload";

const DashboardHome = ({
  therapist,
  uploadProfileImage,
  getTherapistUserData,
  setTherapist,
  therapistProfileData,
}) => {
  const backgroundClassMap = {
    themeBorderColor: "border-mint-tulip-500",
    themeTextColor: "text-mint-tulip-500",
    themeHoverTextColor: "mint-tulip-700",
    themeTextSecondaryColor: "black",
  };

  const therapistProps = {
    therapistName: therapist.firstName + " " + therapist.lastName,
    therapistClassification: therapist.classification,
    verified: true,
    therapistSlug: therapist.profileSlug,
    therapistUserImage: therapist.userImageUrl,
    callsToTherapist: therapistProfileData.numberOfCallsToTherapist || 0,
    emailsToTherapist: therapistProfileData.numberOfEmailClicks || 0,
    profileVisits: therapistProfileData.numberOfProfileViews || 0,
    profileShares: therapistProfileData.numberOfProfileShares || 0,
    resultsViews:
      therapistProfileData.numberOfCallsToTherapist *
      2 *
      therapistProfileData.numberOfEmailClicks *
      therapistProfileData.numberOfProfileShares,
  };

  const chartData = {
    labels: ["Calls", "Emails", "Profile Visits", "Profile Shares"],
    datasets: [
      {
        // label: "Profile Stats -",
        data: [
          therapistProps.callsToTherapist,
          therapistProps.emailsToTherapist,
          therapistProps.profileVisits,
          therapistProps.profileShares,
        ],
        backgroundColor: [
          "rgb(99, 172, 255)",
          "rgb(13, 61, 93)",
          "rgb(3, 27, 206)",
          "rgb(41, 206, 231)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartConfig = {
    type: "pie",
    data: chartData,
  };

  const option = {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
      },
    },
  };

  const [showModal, setShowModal] = useState(false);

  const closeUploadImageModal = async (imageUploaded) => {
    if (imageUploaded) {
      const newTherapistDetails = await getTherapistUserData();
      setTherapist(newTherapistDetails);
    }

    setShowModal(false);
  };

  return (
    <div className="flex flex-col py-[2%] px-[5%]">
      {/* Top Dashboard Home Section and Get More Clients Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center">
        {/* Therapist Details Section */}
        <div className="flex flex-col md:flex-row border-2 py-[5%] md:py-[20px] px-[10px] items-center text-center justify-center w-[100%] min-w-[400px] lg:w-[50%] min-h-[220px] mt-[5%] lg:mt-0">
          <div className="flex flex-col">
            {therapistProps.therapistUserImage ? (
              <Image
                className={`w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]  border ${backgroundClassMap["themeBorderColor"]} p-1`}
                src={therapistProps.therapistUserImage}
                alt="Badge"
                width={150}
                height={150}
              />
            ) : (
              <Image
                className={`w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]  border ${backgroundClassMap["themeBorderColor"]} p-1`}
                src={therapist_profile_image_sample}
                alt="Badge"
                width={150}
                height={150}
              />
            )}

            <div
              className="flex flex-row justify-center items-center py-[2px] px-[2px] bg-gray-700 mt-2 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon
                className="w-[20px] text-white"
                icon={faImage}
                size="2x"
              />
              <p className="text-white text-[12px] ml-2">Set Account Image</p>
            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
              <ImageUpload
                uploadProfileImage={uploadProfileImage}
                onClose={closeUploadImageModal}
              />
            </Modal>
          </div>
          <div className="mx-3">
            <p className="text-[20px]">{therapistProps.therapistName}</p>
            <div className="flex flex-col md:flex-row items-center mt-2">
              <p className="capitalize text-[18px]">
                {therapistProps.therapistClassification.label}
              </p>
              {therapistProps.verified ? (
                <div className="flex items-center mx-5">
                  <div className="">
                    <FontAwesomeIcon
                      className="w-[20px]"
                      icon={faCheckCircle}
                      size="2x"
                    />
                  </div>
                  <p className="mx-2 text-[15px] font-bold">Verified</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-3">
              <Link
                rel="noopener noreferrer"
                target="_blank"
                className="bg-blue-gray-300 text-center px-[30px] py-[10px] rounded-sm"
                href={`/therapists/${therapistProps.therapistSlug}`}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
        {/* Get More Clients */}
        <div className="flex flex-col lg:flex-row bg-blue-gray-300 lg:ml-5 px-[20px] py-[20px] min-h-[220px] lg:w-[50%] w-[100%] items-center justify-between min-w-[400px] mt-[5%] lg:mt-0">
          <div className="w-[50%]">
            <p className="font-bold mb-[30px] text-center">Get More Clients</p>
            <p className="text-center">Refer a Professional.</p>
            <p className="text-center">
              You'll get more clients and also two months free!
            </p>
          </div>
          <div className="">
            <Link
              className="bg-blue-gray-100 text-center px-[30px] py-[10px] rounded-sm"
              href={`/referrals`}
            >
              Get Free Months
            </Link>
          </div>
        </div>
      </div>

      {/* Impact and Charts */}

      <div className="flex flex-col-reverse items-center lg:items-start  lg:flex-row  mt-[30px] lg:mt-0">
        {/* Contacts Breakdown Section */}
        <div className="flex flex-col mt-[20px] lg:mt-[55px] lg:w-[50%] lg:mr-[50px]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-[20px] font-bold">
              Your Profile Numerics
            </p>
            <p className="text-center text-[15px] font-bold">All Time</p>
          </div>

          <div className="flex flex-wrap justify-center items-center lg:flex-row mt-[30px]">
            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2 mx-2 my-2">
              <p className="uppercase">Total Contacts</p>
              <p className="text-[50px]">
                {(
                  therapistProps.callsToTherapist +
                  therapistProps.emailsToTherapist +
                  therapistProps.profileShares +
                  therapistProps.profileVisits
                ).toLocaleString()}
              </p>
            </div>

            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2  mx-2 my-2">
              <p className="uppercase">Calls</p>
              <p className="text-[50px]">
                {therapistProps.callsToTherapist.toLocaleString()}
              </p>
            </div>

            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2  mx-2 my-2">
              <p className="uppercase">Emails</p>
              <p className="text-[50px]">
                {therapistProps.emailsToTherapist.toLocaleString()}
              </p>
            </div>

            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2  mx-2 my-2">
              <p className="uppercase">Profile Visits</p>
              <p className="text-[50px]">
                {therapistProps.profileVisits.toLocaleString()}
              </p>
            </div>

            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2  mx-2 my-2">
              <p className="uppercase">Profile Shares</p>
              <p className="text-[50px]">
                {therapistProps.profileShares.toLocaleString()}
              </p>
            </div>

            <div className="min-w-[200px] max-w-[300px] flex flex-col items-center justify-between bg-blue-gray-100 min-h-[100px] py-2  mx-2 my-2">
              <p className="uppercase">Results Listing Views</p>
              <p className="text-[50px]">
                {therapistProps.resultsViews.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="max-w-[500px] lg:w-[50%] lg:mt-[50px]">
          <p className="text-center text-[20px] font-bold">
            Profile Data Visualization
          </p>
          <Pie data={chartData} options={option} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
