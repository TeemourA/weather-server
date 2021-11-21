import axios from 'axios';

const getGeoserviceUrl = (location) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidGVlbW91cmEiLCJhIjoiY2t1N2Iyb2ZuMHB5OTJ5cGE1bTl3Z2M0ayJ9.Y7N3sIqHiaMwVfbCrLxOlQ&limit=1`;

const getWeatherServiceUrl = ({ lon, lat }) =>
  `http://api.weatherstack.com/current?access_key=2a11f9bc68ff2a9ea507c86875f1afa8&query=${lat},${lon}`;

const getLocationData = async (location) => {
  const {
    data: {
      // @ts-ignore
      features: [searchResult],
    },
  } = await axios(getGeoserviceUrl(location));

  return searchResult;
};

const getWeatherData = async ({ lat, lon }) => {
  const { data } = await axios(getWeatherServiceUrl({ lat, lon }));

  return data;
};

export const getWeatherDataForLocation = async (location) => {
  try {
    const {
      place_name,
      center: [lon, lat],
    } = await getLocationData(location);

    const {
      // @ts-ignore
      current: { temperature, feelslike, weather_descriptions },
    } = await getWeatherData({ lon, lat });

    return { place_name, temperature, feelslike, weather_descriptions };
  } catch (e) {
    return e;
  }
};
