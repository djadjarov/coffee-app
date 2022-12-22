import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCSESS_KEY
});


const getCoffestoresUrl = (query, latLong, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListOfCoffeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashPhotos = photos.response.results;

  return unsplashPhotos.map((result) => result.urls["small"]);
};

export const fetchCoffeStores = async (latLong = "42.1292827,24.7309051", limit = 8) => {
  const photos = await getListOfCoffeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  //https://api.foursquare.com/v3/places/search?query=coffee&ll=42.69794855479368%2C23.312299554784257&limit=6
  

  const response = await fetch(
    getCoffestoresUrl("coffee", latLong, limit),
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      address: result.location.region,
      name: result.name,
      imgUrl: photos[index],
    };
  });
  // .catch(err => console.error(err));
}; 