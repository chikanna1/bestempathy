import type { NextPage } from "next";
import React from "react";

import Script from "next/script";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchByLocationForm from "../components/SearchByLocationForm";
import { API_URL, NEXT_URL } from "../config/index";

const themeBorderColor = "mint-tulip-500";
const themeTextColor = "mint-tulip-500";
const themeHoverTextColor = "mint-tulip-700";
const themeSecondaryTextColor = "black";

const TherapistListings: NextPage = ({ therapists }) => {
  console.log(therapists);
  const router = useRouter();

  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      {/* Listings Page Body */}

      {therapists.map((therapist) => (
        <p>{therapist.firstName}</p>
      ))}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TherapistListings;

export async function getServerSideProps({ query }) {
  const res = await fetch(`${NEXT_URL}/api/search-for-therapists`, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      query,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return {
    props: { therapists: data.resultsData },
  };
}
