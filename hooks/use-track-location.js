import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMesg, setLocationErrorMesg] = useState("");
  const [latLong, setLatLong] = useState("");

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLatLong(`${latitude}, ${longitude}`);
    setLocationErrorMesg("");
  };

  const error = () => {
    setLocationErrorMesg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMesg("Geolocation is not supported by your browser");
    } else {
      //   status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    latLong,
    handleTrackLocation,
    locationErrorMesg,
  };
};

export default useTrackLocation;
