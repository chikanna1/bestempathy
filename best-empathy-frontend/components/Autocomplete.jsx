import React, { useState, useContext, useEffect } from "react";
// import GoogleMapReact from 'google-map-react'
import { LoadScript, useLoadScript } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";
import {
  faL,
  faLocationCrosshairs,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Rings } from "react-loader-spinner";

import { Autocomplete } from "@react-google-maps/api";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const LIBRARIES = ["places"];

const Autocompletor = () => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [place, setPlace] = useState();
  const [loading, setLoading] = useState(false);
  const libraries = LIBRARIES;
  const onLoad = (autoC) => setAutocomplete(autoC);
  const [loaded, setLoaded] = useState(false);

  const [loadingTrue, setLoadingTrue] = useState(false);

  const apiKey = "AIzaSyC2ryNCZtcf1sFdowVC36QK6fEmO4KORPQ";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    // searchInput.current.value = "Getting your location...";
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        // setFullAddress(place.formatted_address);

        console.log(place);
        setLoadingTrue(false);
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
  const onPlaceChanged = () => {
    setPlace({
      address: autocomplete.getPlace().formatted_address,
      lat: autocomplete.getPlace().geometry.location.lat(),
      lng: autocomplete.getPlace().geometry.location.lng(),
    });
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    // setCoordinates({ lat, lng });
  };

  if (!isLoaded) {
    return (
      <div>
        <ReactLoading type={"bars"} color={"#03fc4e"} height={20} width={20} />
      </div>
    );
  }
  return (
    <div className="h-[100%] ">
      <div className="flex flex-row items-center h-[100%] ">
        <div className="flex flex-col justify-center items-center m-4">
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div width={"35vw"} shadow="lg">
              <div
                pointerEvents={"none"}
                children={<div color="gray" fontSize={20} />}
              />

              <input
                type={"text"}
                placeholder="Search Google Map..."
                variant={"filled"}
                className="rounded-md py-3 px-10 min-w-[200px] w-[100%] focus:outline-gray-600 focus:bg-white outline outline-2 outline-gray-400 h-[100%]"
              />
            </div>
          </Autocomplete>
        </div>

        <div className="w-[50px] h-[50px] flex items-center justify-center ml-[-70px] ">
          <button onClick={findMyLocation}>
            {loadingTrue ? (
              <Rings
                height="40"
                width="40"
                color="#000000"
                radius="6"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="rings-loading"
              />
            ) : (
              <FontAwesomeIcon
                className="w-[20px] h-[20px] text-black"
                icon={faLocationCrosshairs}
                size="2x"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Autocompletor;
