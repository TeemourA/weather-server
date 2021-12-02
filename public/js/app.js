// @ts-nocheck
const weatherSearchForm = document.querySelector('#weather-search-form');
const weatherSearchInput = document.querySelector('#weather-search-form input');

const weatherSearchMessage = document.querySelector('#message');
const weatherSearchResult = document.querySelector('#result');

weatherSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  weatherSearchMessage.textContent = 'Loading...';
  weatherSearchResult.textContent = '';

  fetch(`/weather?address=${weatherSearchInput.value}`)
    .then((res) => res.json())
    .then(
      ({
        feelslike,
        place_name,
        temperature,
        weather_descriptions,
        humidity,
        error,
      }) => {
        if (error) {
          weatherSearchMessage.textContent = error;
        } else {
          weatherSearchMessage.textContent = place_name;
          weatherSearchResult.textContent = `Weather conditions: ${weather_descriptions[0]}\n\nTemperature: ${temperature}°C\n\nFeels like: ${feelslike}°C\n\nHumidity: ${humidity}%`;
        }
      }
    );
});
