import { FC } from "react";
import { Divide, Rotate } from "hamburger-react";
import { fitBounds } from "google-map-react";
import LocationInput from "../components/LocationInput";
import { faUserPlus, faUserXmark } from "@fortawesome/free-solid-svg-icons";

import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Script from "next/script";

import Head from "next/head";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { useRouter, useSearchParams } from "next/navigation";
import ReactLoading from "react-loading";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchByLocationForm from "../components/SearchByLocationForm";
import { API_URL, NEXT_URL } from "../config/index";
import Select from "react-select";
import Slider from "rc-slider";
import Range from "rc-slider";
import { Switch } from "@material-tailwind/react";
import "rc-slider/assets/index.css";
import Autocompletor from "../components/Autocomplete";
import { ListingProfile } from "../components/ListingProfile";
import { getBoundsOfDistance } from "geolib";
import { MapListingProfile } from "../components/MapListingProfile";

import {
  therapistSpecialties,
  therapistApproaches,
  therapistCredentials,
  languageOptions,
  therapistDemographics,
  therapistGender,
  therapistAvailability,
  religiousPreferences,
} from "../assets/dataPoints/therapist-data-types";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  Card,
  Typography,
  Radio,
  button,
} from "@material-tailwind/react";

import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
  InfoWindowF,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import GoogleMapsAutocomplete from "../components/GoogleMapsAutocomplete";

const themeBorderColor = "mint-tulip-500";
const themeTextColor = "mint-tulip-500";
const themeHoverTextColor = "mint-tulip-700";
const themeSecondaryTextColor = "black";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ({
  query,
  handleSearchSubmit,
  setSearchInput,
  searchInput,
  routeToNewAddressQuery,
  demographicSelectInputRef,
  demographicsObj,
  demographicsFilter,
  updateRadioInput,
  setDemographicsFilter,
  setGenderChoicesList,
  genderSelectInputRef,
  genderObj,
  genderChoicesList,
  setRadius,
  radius,
  routeToNewQueryPage,
  resetFilters,
  open,
  handleOpen,
  availabilityObj,
  updateQueryList,
  setAvailabilityFilter,
  availabilityFilter,
  specialtiesObj,
  setSpecialtyChoicesList,
  specialtyChoicesList,
  setLanguagesFilter,
  languagesFilter,
  setQualificationsFilter,
  qualificationsFilter,
  qualificationsObj,
  setReligionFilter,
  religionFilter,
  religionObj,
  setTherapyApproachesFilter,
  therapyApproachesFilter,
  isLoadingQuery,
  therapists,
  hasPrevPage,
  previousPage,
  hasNextPage,
  nextPage,
  mapOptions,
  zoomLevelDict,
  mapCenter,
  onLoad,
  circleOptions,
  handleActiveMarker,
  activeMarker,
  setActiveMarker,
}) {
  return (
    <div className="flex flex-row justify-between px-[20px] mt-5">
      <div className="flex flex-col mt-3 w-[75%]">
        {/* <form action="" onSubmit={(e) => handleFormSubmit(e)}> */}
        <div
          className={`grid gap-10 grid-cols-2 bg-white p-4 border-blue-gray-50 border rounded-md `}
        >
          {/* Keywords Input */}
          <form onSubmit={handleSearchSubmit}>
            <div>
              <input
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={"Search By Keywords"}
                name="searchInput"
                value={searchInput}
                className="w-[100%] rounded-md py-3 px-10 focus:outline-gray-600 focus:bg-white outline outline-2 outline-gray-400 h-[100%]"
              />
            </div>
          </form>

          {/* Location Search Input */}
          <div className="w-[100%] text-[14px] h-[50px]">
            <GoogleMapsAutocomplete
              placeholderValue={
                query.country === "United States" || query.country === "Canada"
                  ? `${query.city}, ${query.state}`
                  : `${query.city}, ${query.country}`
              }
              routeToNewAddressQuery={routeToNewAddressQuery}
            />
          </div>

          {/* Therapist Demographics Select */}
          <div className="min-w-[300px] h-[50px] flex flex-row justify-between">
            <div className="w-[60%] mr-2">
              <Select
                name="demographics"
                ref={demographicSelectInputRef}
                options={demographicsObj}
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable={true}
                placeholder="Demographic/Race Specialty"
                defaultValue={demographicsFilter}
                onChange={(demographicChoice) =>
                  updateRadioInput(
                    setDemographicsFilter,
                    demographicsFilter,
                    [demographicChoice?.value],
                    "demographic"
                  )
                }
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
            <div className="w-[40%] ml-2">
              <Select
                name="genderSelect"
                ref={genderSelectInputRef}
                options={genderObj}
                className="basic-multi-select"
                classNamePrefix="select"
                isClearable={true}
                placeholder="Gender Preference"
                defaultValue={genderChoicesList}
                onChange={(genderValue) =>
                  updateRadioInput(
                    setGenderChoicesList,
                    genderChoicesList,
                    [genderValue?.value],
                    "gender"
                  )
                }
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

          {/* Radius Slider */}

          <div className="flex flex-col">
            <div>
              <Slider
                defaultValue={5}
                value={radius}
                min={0}
                max={100}
                allowCross={false}
                onChange={(e) => {
                  setRadius(e);
                  routeToNewQueryPage("radius", e, true);
                }}
                step={5}
                trackStyle={{ backgroundColor: "black", height: 10 }}
                railStyle={{ backgroundColor: "lightblue", height: 10 }}
                handleStyle={{
                  borderColor: "black",
                  height: 20,
                  width: 20,
                  // marginLeft: -10,
                  marginTop: -5,
                  backgroundColor: "black",
                }}
              />
              <p className="text-[16px] mt-2 ml-5 font-semibold">
                Radius: {radius}
                {query.country == "United States" ? (
                  <span> miles</span>
                ) : (
                  <span> km</span>
                )}
              </p>
            </div>
            <div className="flex flex-col items-end mt-[-10px]">
              {/* Reset Button */}
              <button
                className="px-2 py-1 bg-mint-tulip-400 rounded-md text-white hover:bg-mint-tulip-600"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        {/* </form> */}
        <div className="flex flex-row justify-between">
          {/* Filters */}
          <div className={`bg-white mt-5 px-3 max-w-[300px]`}>
            {/* Availability */}
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 1}
              icon={<Icon id={1} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="text-[18px] text-center"
              >
                Availability
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[120px] overflow-y-scroll">
                  {availabilityObj.map((availability, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateQueryList(
                            setAvailabilityFilter,
                            availabilityFilter,
                            availability.id,
                            "availability"
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          name={availability.label}
                          checked={availability.selected}
                          className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 focus:outline-none"
                        />
                        <p className="ml-3">{availability.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>

            {/* Therapy Approaches */}
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 2}
              icon={<Icon id={2} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="text-[18px] text-center"
              >
                Type of Therapy
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[250px] overflow-y-scroll">
                  {specialtiesObj.map((specialty, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateRadioInput(
                            setSpecialtyChoicesList,
                            specialtyChoicesList,
                            [specialty.value],
                            "specialty"
                          )
                        }
                      >
                        <input
                          type="radio"
                          value={specialty.label}
                          name="specialtyChoicesList"
                          checked={specialty.value === specialtyChoicesList[0]}
                        />
                        <p className="ml-3">{specialty.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>

            {/* Languages */}
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 3}
              icon={<Icon id={3} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(3)}>
                Languages
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[200px] overflow-y-scroll">
                  {languagesFilter.map((language, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateQueryList(
                            setLanguagesFilter,
                            languagesFilter,
                            language.id,
                            "languages"
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          name={language.label}
                          checked={language.selected}
                          className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 focus:outline-none"
                        />
                        <p className="ml-3">{language.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>

            {/* Therapy Approaches */}
            <Accordion
              className={`bg-white mt-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 4}
              icon={<Icon id={4} open={open} />}
            >
              <AccordionHeader
                onClick={() => handleOpen(4)}
                className="text-[18px] text-center"
              >
                Methods/Approaches
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[250px] overflow-y-scroll">
                  {therapyApproachesFilter.map((approach, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateQueryList(
                            setTherapyApproachesFilter,
                            therapyApproachesFilter,
                            approach.id,
                            "therapyApproaches"
                          )
                        }
                      >
                        <input
                          type="checkbox"
                          name={approach.label}
                          checked={approach.selected}
                          className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-500 hover:ring hover:ring-gray-300 focus:outline-none"
                        />
                        <p className="ml-3">{approach.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>

            {/* Religious Preference*/}
            <Accordion
              className={`bg-white my-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 5}
              icon={<Icon id={5} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(5)}>
                Religion
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[200px] overflow-y-scroll">
                  {religionObj.map((religion, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateRadioInput(
                            setReligionFilter,
                            religionFilter,
                            [religion.value],
                            "religion"
                          )
                        }
                      >
                        <input
                          type="radio"
                          value={religion.label}
                          name="qualificationFilter"
                          checked={religion.value === religionFilter[0]}
                        />
                        <p className="ml-3">{religion.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>

            {/* Credentials*/}
            <Accordion
              className={`bg-white my-5 py-3 pb-7 px-5  border-blue-gray-50 border rounded-md`}
              open={open === 6}
              icon={<Icon id={6} open={open} />}
            >
              <AccordionHeader onClick={() => handleOpen(6)}>
                Credentials
              </AccordionHeader>
              <AccordionBody>
                <div className="h-[200px] overflow-y-scroll">
                  {qualificationsObj.map((qualification, index) => (
                    <div className="max-w-[350px] my-3">
                      <div
                        className="flex flex-row cursor-pointer text-[16px]"
                        onClick={() =>
                          updateRadioInput(
                            setQualificationsFilter,
                            qualificationsFilter,
                            [qualification.value],
                            "classification"
                          )
                        }
                      >
                        <input
                          type="radio"
                          value={qualification.label}
                          name="qualificationFilter"
                          checked={
                            qualification.value === qualificationsFilter[0]
                          }
                        />
                        <p className="ml-3">{qualification.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>
          </div>
          {/* Listings */}
          <div className="flex flex-col w-[100%]">
            {isLoadingQuery ? (
              <div>
                <ReactLoading
                  type={"bars"}
                  color={"#03fc4e"}
                  height={500}
                  width={500}
                />
              </div>
            ) : (
              <div className={`bg-white  mt-5 ml-3`}>
                {therapists.length > 0 ? (
                  therapists.map((therapist) => (
                    <div className="py-2">
                      <ListingProfile therapist={therapist} />
                    </div>
                  ))
                ) : (
                  <div className="text-center mt-10">
                    <p className="capitalize font-bold italic">
                      No therapists matched your search query. Please revise
                      your search parameters
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Pagination Controls */}
            <div className="w-[100%] flex gap-[50%] px-[20%] justify-center">
              {hasPrevPage ? (
                <button
                  className="px-5 py-2 bg-mint-tulip-400 text-white text-[20px] rounded-md"
                  onClick={previousPage}
                >
                  <p className="w-[100px]">Previous</p>
                </button>
              ) : (
                ""
              )}
              {hasNextPage ? (
                <button
                  className="px-5 py-2 bg-mint-tulip-400 text-white text-[20px] rounded-md"
                  onClick={nextPage}
                >
                  <p className="w-[100px]">Next</p>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Area */}

      <div className="w-[30%] mt-3">
        <div className="flex flex-col items-center bg-white sticky top-[100px]">
          {/* Google map */}

          {isLoadingQuery ? (
            <div>
              <ReactLoading
                type={"bars"}
                color={"#03fc4e"}
                height={500}
                width={500}
              />
            </div>
          ) : (
            <div
              className="w-[100%] h-[500px]"
              // style={{ height: "100%", width: "100%" }}
            >
              <GoogleMap
                options={mapOptions}
                zoom={zoomLevelDict[radius]}
                center={mapCenter}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onLoad={onLoad}
              >
                <CircleF center={mapCenter} options={circleOptions} />

                {therapists.map((therapist, idx) => (
                  <MarkerF
                    key={query.page + idx}
                    position={{
                      lat: therapist.latitude + idx * 0.03,
                      lng: therapist.longitude + idx * 0.05,
                    }}
                    onClick={() => handleActiveMarker(query.page + idx)}
                  >
                    {activeMarker === query.page + idx ? (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div>
                          <MapListingProfile therapist={therapist} />
                        </div>
                      </InfoWindowF>
                    ) : null}
                  </MarkerF>
                ))}
              </GoogleMap>
            </div>
          )}

          <div className="text-center mt-5 mb-10">
            <p className="text-[20px] font-semibold">Search Location</p>
            <p className="text-[20px]">{query.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
