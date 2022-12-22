import { useContext, useState } from "react";

import { ACTION_TYPES, StoreContext } from "../store/store-context";

const useTrackLocation = () => {
  const [locationErrorMesg, setLocationErrorMesg] = useState("");
  // const [latLong, setLatLong] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // setLatLong(`${latitude},${longitude}`);

    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });

    setLocationErrorMesg("");
    setIsLoadingLocation(false);
  };

  const error = () => {
    setLocationErrorMesg("Unable to retrieve your location");
    setIsLoadingLocation(false);
  };

  const handleTrackLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMesg("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    // latLong,
    handleTrackLocation,
    locationErrorMesg,
    isLoadingLocation,
  };
};

export default useTrackLocation;
