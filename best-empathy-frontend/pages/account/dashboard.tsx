import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Head from "next/head";
import Link from "next/link";
import therapist_profile_image_sample from "../../assets/images/therapist-profile-page/default-profile-icon.jpg";
import Image from "next/image";
import TherapistHeader from "../../components/TherapistHeader";
import DashboardHome from "../../components/TherapistDashboard/DashboardHome";
import DashboardHelp from "../../components/TherapistDashboard/DashboardHelp";
import DashboardEditProfile from "../../components/TherapistDashboard/DashboardEditProfile";
import DashboardAccountSettings from "../../components/TherapistDashboard/DashboardAccountSettings";
import AuthContext from "../../context/AuthContext";
import { parseCookies } from "../../helpers/index";
import { emitWarning } from "process";
import { API_URL } from "../../config/index";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { acceptedPaymentMethods } from "../../assets/dataPoints/therapist-data-types";

const DashboardPage = ({ therapistData, therapistProfileData, token }) => {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);

  const [therapist, setTherapist] = useState(therapistData);

  useEffect(() => {
    setTimeout(() => {
      setDone(true);
    }, 5000);
  }, []);

  const getProfileData = async () => {
    const profileId = therapist.profileId;

    const profileDataRes = await fetch(`${API_URL}/api/profiles/${profileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const profileData = await profileDataRes.json();
    return profileData.data.attributes;
  };

  const getTherapistUserData = async () => {
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const therapistDetails = await res.json();

    return therapistDetails;
  };

  const saveProfileData = async (newProfileData) => {
    const profileId = therapist.profileId;

    const profileDataRes = await fetch(`${API_URL}/api/profiles/${profileId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          languages: newProfileData.languages,
          acceptingNewClients: newProfileData.acceptingNewClients,
          onlineTherapy: newProfileData.onlineTherapy,
          inPersonTherapy: newProfileData.inPersonTherapy,
          bio: newProfileData.bio,
          specialties: newProfileData.specialties,
          facebook: newProfileData.facebook,
          instagram: newProfileData.instagram,
          pinterest: newProfileData.pinterest,
          linkedin: newProfileData.linkedin,
          twitter: newProfileData.twitter,
          insuranceAccepted: newProfileData.insuranceAccepted,
          sessionFee: newProfileData.sessionFee,
          degreesAndTraining: newProfileData.degreesAndTraining,
          therapyCredentials: newProfileData.therapyCredentials,
          therapyApproaches: newProfileData.therapyApproaches,
          acceptedPaymentMethods: newProfileData.acceptedPaymentMethods,
        },
      }),
    });

    if (profileDataRes.ok) {
      return true;
    } else {
      return false;
    }
  };

  const uploadProfileImage = async (formData: any) => {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();

    if (!res.ok) {
      return { uploaded: false, message: "Something Went Wrong..." };
    }

    const medium_image_url =
      "medium" in response[0].formats
        ? response[0].formats.medium.url
        : response[0].formats.thumbnail.url;
    const large_image_url =
      "large" in response[0].formats
        ? response[0].formats.large.url
        : response[0].formats.thumbnail.url;

    const changeUserImageRes = await fetch(`${API_URL}/api/user/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userImageUrl: medium_image_url,
      }),
    });

    if (!changeUserImageRes.ok) {
      return { uploaded: false, message: "Something Went Wrong..." };
    }

    const profileId = therapist.profileId;
    const changeProfileImageRes = await fetch(
      `${API_URL}/api/profiles/${profileId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            profileImageUrl: large_image_url,
          },
        }),
      }
    );

    if (!changeProfileImageRes.ok) {
      return { uploaded: false, message: "Something Went Wrong..." };
    }

    return { uploaded: true, message: "Change Profile Image Successful" };
  };

  const backgroundClassMap = {
    themeBorderColor: "border-mint-tulip-500",
    themeTextColor: "text-mint-tulip-500",
    themeHoverTextColor: "mint-tulip-700",
    themeTextSecondaryColor: "black",
  };

  const [componentToDisplay, setComponentToDisplay] = useState("home");

  const getComponentToDisplay = () => {
    if (componentToDisplay === "home") {
      return DashboardHome;
    }
  };
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      {!done ? (
        <div className="flex flex-col items-center justify-center mt-[10%]">
          <ReactLoading
            type={"bars"}
            color={"#03fc4e"}
            height={500}
            width={500}
          />
        </div>
      ) : (
        <div>
          <TherapistHeader
            componentToDisplay={componentToDisplay}
            setComponentToDisplay={setComponentToDisplay}
            therapist={therapist}
          />
          <div className="px-[12.5%] pt-[2%]">
            {(() => {
              switch (componentToDisplay) {
                case "home":
                  return (
                    <DashboardHome
                      therapist={therapist}
                      uploadProfileImage={uploadProfileImage}
                      getTherapistUserData={getTherapistUserData}
                      setTherapist={setTherapist}
                      therapistProfileData={therapistProfileData}
                    />
                  );
                case "edit-profile":
                  return (
                    <DashboardEditProfile
                      getProfileData={getProfileData}
                      saveProfileData={saveProfileData}
                    />
                  );
                case "account-settings":
                  return <DashboardAccountSettings />;
                case "help":
                  return <DashboardHelp />;
                default:
                  return (
                    <DashboardHome
                      therapist={therapist}
                      uploadProfileImage={uploadProfileImage}
                      getTherapistUserData={getTherapistUserData}
                      setTherapist={setTherapist}
                      therapistProfileData={therapistProfileData}
                    />
                  );
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const getTherapistProfileDetails = async () => {
    const res = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const therapistInit = await res.json();
    const slug = therapistInit.profileSlug;

    console.log("Therapist Initial Info");
    console.log(therapistInit);

    if (slug) {
      console.log("Slug Exists Already");
      console.log(slug);
      return therapistInit;
    } else {
      fetch(`${API_URL}/api/profiles/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            firstName: therapistInit.firstName,
            lastName: therapistInit.lastName,
            languages: [],
            acceptingNewClients: true,
            onlineTherapy: false,
            inPersonTherapy: false,
            bio: "",
            specialties: [],
            facebook: "https://www.facebook.com",
            instagram: "https://www.instagram.com",
            pinterest: "https://www.pinterest.com",
            linkedin: "https://wwww.linkedin.com",
            twitter: "https://wwww.twitter.com",
            insuranceAccepted: [],
            sessionFee: 0,
            degreesAndTraining: "",
            therapyCredentials: [],
            therapyApproaches: [],
            acceptedPaymentMethods: [],
            demographic: [],
            gender: [],
            religion: [],
            title: therapistInit.title,
            email: therapistInit.email,
            phoneNumber: therapistInit.phoneNumber,
            classification: therapistInit.classification,
            professionalTitle: therapistInit.professionalTitle,
            address: therapistInit.address,
            formattedAddress: therapistInit.formattedAddress,
            slugReference: `${therapistInit.firstName}-${therapistInit.lastName}-${therapistInit.id}`,
            city: therapistInit.city,
            state: therapistInit.state,
            country: therapistInit.country,
            coordinates: therapistInit.coordinates,
            latitude: therapistInit.coordinates.latitude,
            longitude: therapistInit.coordinates.longitude,
            numberOfProfileViews: 0,
            numberOfEmailClicks: 0,
            numberOfCallsToTherapist: 0,
            numberOfListingViews: 0,
            numberOfProfileShares: 0,
          },
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          const dataResponse = json;
          const slug = dataResponse.data.attributes.slug;
          const id = dataResponse.data.id;
          fetch(`${API_URL}/api/user/me`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profileSlug: slug,
              profileId: id,
            }),
          }).then((response) => {
            if (response.status !== 200) {
              return "Error";
            }
          });
        })
        .then(() => {
          fetch(`${API_URL}/api/users/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((therapistDetails) => {
              console.log("New Therapist Details");
              console.log(therapistDetails);
              return therapistDetails;
            });
        });
    }
  };

  const getTherapistProfileDataDetails = async (profileId) => {
    const profileDataRes = await fetch(`${API_URL}/api/profiles/${profileId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const profileData = await profileDataRes.json();
    return profileData.data.attributes;
  };

  const therapist = await getTherapistProfileDetails();

  const therapistProfileData = await getTherapistProfileDataDetails(
    therapist.profileId
  );

  console.log(therapistProfileData);
  return {
    props: {
      therapistData: therapist,
      therapistProfileData: therapistProfileData,
      token,
    },
  };
}
