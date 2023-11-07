import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faL,
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { resolve } from "path";

import { Rings } from "react-loader-spinner";

const mapApiJs = "https://maps.googleapis.com/maps/api/js";
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

function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

const extractAddress = (place) => {
  console.log("Extracting Address");
  console.log(place);
  const address = {
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const streetNumber = this.streetNumber ? this.streetNumber + " " : "";
      const streetName = this.streetName ? this.streetName + ", " : "";
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
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
    if (types.includes("administrative_area_level_2")) {
      address.state = value;
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

function SearchByLocationForm({ goToSearchResultsPage }) {
  const searchInput = useRef(null);
  // const searchInput = useState("");
  const [address, setAddress] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loadingTrue, setLoadingTrue] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState("");
  const [formattedAddressValue, setFormattedAddressValue] = useState("");
  const [addressValue, setAddressValue] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/get-search-address-params", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        address: addressValue,
        latitude: latitude,
        longitude: longitude,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    goToSearchResultsPage(data);
  };

  const updateSearch = (e) => {
    setFormattedAddress(e.target.value);
    // setValues({ ...values, ["formattedAddress"]: "" });
    // setValues({ ...values, ["address"]: {} });
    // setValues({
    //   ...values,
    //   ["formattedAddress"]: "",
    //   ["address"]: {},
    // });
    // handleChangeAddress("", {});
    setAddressValue({});
    setFormattedAddressValue("");

    // setValues({ ...values, ["formattedAddress"]: e.target.value });
    setAddress(searchInput);
  };

  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setLatitude(place.geometry.location.lat());
    setLongitude(place.geometry.location.lng());
    // setAddressValue(place);
    console.log(place);
    // setValues({ ...values, ["formattedAddress"]: "" });

    // setValues({ ...values, ["address"]: place });
    setSearchTerm(place.formatted_address);
    setFormattedAddress(place.formatted_address);
    // setValues({ ...values, ["formattedAddress"]: place.formatted_address });
    // setValues({ ...values, ["address"]: place });

    // handleChangeAddress(place.formatted_address, place);
    setAddressValue(place);
    setFormattedAddressValue(place.formatted_address);

    setAddress(extractAddress(place));

    // setAddress(place.formatted_address);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    // autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.setTypes(["(cities)"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    // searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];

        // setFullAddress(place.formatted_address);
        const _address = extractAddress(place);
        // setAddress(_address);
        setLoadingTrue(false);
        // setValues({ ...values, ["address"]: place });
        setAddress(place.formatted_address);
        // searchInput.current.value = _address.plain();
        searchInput.current.value = place.formatted_address;
        setSearchTerm(place.formatted_address);
        setFormattedAddress(place.formatted_address);
        // setValues({
        //   ...values,
        //   ["formattedAddress"]: place.formatted_address,
        //   ["address"]: place,
        // });
        // handleChangeAddress(place.formatted_address, place);
        setAddressValue(place);
        setLatitude(place.geometry.location.lat);
        setLongitude(place.geometry.location.lng);
        setFormattedAddressValue(place.formatted_address);

        // setValues({ ...values, ["address"]: place });
      });
  };

  const findMyLocation = () => {
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

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  return (
    <div>
      <form>
        <div className="flex flex-row items-center ">
          <input
            ref={searchInput}
            type="text"
            placeholder="Location..."
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

export default SearchByLocationForm;
