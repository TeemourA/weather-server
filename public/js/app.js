// @ts-nocheck
const weatherSearchForm = document.querySelector('#weather-search-form');
const weatherSearchInput = document.querySelector('#weather-search-form input');

const weatherSearchMessage = document.querySelector('#message');
const weatherSearchResult = document.querySelector('#result');

// weatherSearchMessage.textContent = 'message';
// weatherSearchResult.textContent = 'result';

weatherSearchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  weatherSearchMessage.textContent = 'Loading...';
  weatherSearchResult.textContent = '';

  fetch(`http://localhost:3000/weather?address=${weatherSearchInput.value}`)
    .then((res) => res.json())
    .then(
      ({ feelslike, place_name, temperature, weather_descriptions, error }) => {
        if (error) {
          weatherSearchMessage.textContent = error;
        } else {
          weatherSearchMessage.textContent = 'Loaded successfully';
          console.log({
            feelslike,
            place_name,
            temperature,
            weather_descriptions,
            error,
          });
          weatherSearchMessage.textContent = place_name;
          weatherSearchResult.textContent = `Weather conditions: ${weather_descriptions[0]}\nTemperature: ${temperature}C\nFeels like: ${feelslike}C`;
        }
      }
    );
});
