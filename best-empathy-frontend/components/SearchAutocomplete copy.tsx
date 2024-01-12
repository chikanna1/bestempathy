import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faL,
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { resolve } from "path";

import { Rings } from "react-loader-spinner";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import ReactLoading from "react-loading";
import { toast } from "react-toastify";

const apiKey = "AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const backgroundClassMap = {
  themeBorderColor: "border-mint-tulip-500",
  themeTextColor: "text-mint-tulip-500",
  themeHoverTextColor: "mint-tulip-700",
  themeTextSecondaryColor: "black",
  themeBackgroundColor: "bg-mint-tulip-500",
  themeHoverBackgroundColor: "bg-mint-tulip-300",
};

const extractAddress = (place) => {
  console.log("Extracting Address");
  const address = {
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    province: "",
    zip: "",
    country: "",
    plain() {
      const streetNumber = this.streetNumber ? this.streetNumber + " " : "";
      const streetName = this.streetName ? this.streetName + ", " : "";
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      const province = this.province ? this.province + ", " : "";
      return city + zip + state + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("street_number")) {
      address.streetNumber = value;
    }
    if (types.includes("route")) {
      address.streetName = value;
    }
    if (types.includes("locality")) {
      address.city = value;
    }
    if (types.includes("administrative_area_level_1")) {
      address.state = value;
    }
    if (types.includes("administrative_area_level_2")) {
      address.province = value;
    }
    if (types.includes("postal_code")) {
      address.zip = value;
    }
    if (types.includes("country")) {
      address.country = value;
    }
  });
  return address;
};

function SearchAutocomplete({ goToSearchResultsPage }) {
  let searchInput = useRef(null);
  // const searchInput = useState("");
  const [address, setAddress] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loadingTrue, setLoadingTrue] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [addressValue, setAddressValue] = useState("");
  const [formattedAddressValue, setFormattedAddressValue] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const updateSearch = (e) => {
    setFormattedAddress(e.target.value);
    setAddressValue("");
    setFormattedAddressValue("");
    setAddress(searchInput);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();

    if (!("address_components" in place)) {
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    console.log(place);
    setSearchTerm(place.formatted_address);
    setFormattedAddress(place.formatted_address);
    setAddressValue(place);
    setFormattedAddressValue(place.formatted_address);

    setAddress(extractAddress(place));
    const address = extractAddress(place);
    console.log(place);
    const city = address.city;
    const country = address.country;
    const state = address.state;
    const province = address.province;
    const coordinates = {
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    };

    console.log(city);
    setCity(city);
    console.log(state);
    setState(state);
    console.log(country);
    setCountry(country);
    console.log(coordinates);
    setCoordinates(coordinates);
    console.log(addressValue);
  };

  // init autocomplete

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    // searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        // setFullAddress(place.formatted_address);

        const address = extractAddress(place);
        console.log(place);
        const city = address.city;
        const country = address.country;
        const state = address.state;
        const province = address.province;
        const coordinates = {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        };

        console.log(city);
        setCity(city);
        console.log(state);
        setState(state);
        console.log(country);
        setCountry(country);
        console.log(coordinates);
        setCoordinates(coordinates);
        setLoadingTrue(false);
        setAddress(place.formatted_address);
        searchInput.current.value = place.formatted_address;
        setSearchTerm(place.formatted_address);
        setFormattedAddress(place.formatted_address);
        setAddressValue(place);
        setFormattedAddressValue(place.formatted_address);
        setCountry(extractAddress(place).country);

        // setValues({ ...values, ["address"]: place });
      });
  };

  const findMyLocation = (e) => {
    if (e.detail === 0) {
      return;
    }
    console.log("Finding Location");
    setLoadingTrue(true);
    // searchInput.current.value = "Location...";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          reverseGeocode(position.coords);
        },
        function (error) {
          if (error.code == error.PERMISSION_DENIED) {
          }
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    console.log("In Handle Submit");
    e.preventDefault();

    if (!addressValue) {
      toast.error("Invalid Location. Please Enter a Valid Location");
      return;
    }

    console.log(addressValue);

    const res = await fetch("/api/get-search-address-params", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        address: addressValue,
        latitude: latitude,
        longitude: longitude,
        filters: {},
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
    goToSearchResultsPage(data);
  };

  const LIBRARIES = ["places"];
  const libraries = LIBRARIES;

  // load map script after mounted

  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  useEffect(() => {
    initAutocomplete();
  });

  return (
    <div className="h-[100%] ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center ">
          <input
            ref={searchInput}
            type="text"
            placeholder={"Location..."}
            onChange={updateSearch}
            value={formattedAddress}
            className="rounded-md py-3 px-10 min-w-[500px] focus:outline-none focus:bg-white bg-gray-100"
          />
          <div className="w-[50px] h-[50px] flex items-center justify-center ml-[-70px] ">
            <button onClick={findMyLocation}>
              {loadingTrue ? (
                <Rings
                  height="40"
                  width="40"
                  color="#32a1a1"
                  radius="6"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
              ) : (
                <FontAwesomeIcon
                  className="w-[20px] h-[20px] text-mint-tulip-500"
                  icon={faLocationCrosshairs}
                  size="2x"
                />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-[30px]">
          <button
            className={`mt-5 capitalize py-5 px-10 ${backgroundClassMap["themeBackgroundColor"]} rounded-md hover:bg-mint-tulip-700`}
            onClick={handleSubmit}
          >
            Search for therapists
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchAutocomplete;
