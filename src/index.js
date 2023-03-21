import './css/styles.css';
import debounce from 'lodash.debounce';
import marcup from './templetes/marcup';
import previer from './templetes/previos-marcup'

const DEBOUNCE_DELAY = 300;
const inputRef = document.querySelector('#search-box');
const infoCountryRef = document.querySelector('.country-info')
const countryList = document.querySelector('.country-list')

inputRef.addEventListener('input', debounce(listenInput, DEBOUNCE_DELAY))

function listenInput(e) {
    e.preventDefault()

    const currentValue = e.target.value.trim();
     if (!currentValue) {
    inputRef.innerHTML = '';
    inputRef.innerHTML = '';
    return;
  }

    fetchCountry(currentValue).then(country => {
        const countryList = country.map(country => country.name.common);
        if (countryList.length === 1) {
            createMarkup(country);

        }  else if (countryList.length <= 5 && countryList.length > 1) {
             createPreviusMarcup(country)
        }

    })
        
    .catch(error => {
    console.log(error);
    }) 
    
    deleteCountriesInfo()
}
function createPreviusMarcup(country) {
    const marcupEl = previer(country);
     countryList.insertAdjacentHTML('beforeend', marcupEl)
}

function createMarkup(country) {
    const marcupEl = marcup(country);
    infoCountryRef.insertAdjacentHTML('beforeend', marcupEl)
}


function fetchCountry(countryName) {
    const URl = 'https://restcountries.com/v3.1/name/';
    const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages,',
});

return fetch(`${URl}${countryName}?${searchParams}`).then(response => {
    return response.json()
})
}

function deleteCountriesInfo() {
  infoCountryRef.innerHTML = '';
  countryList.innerHTML = '';
}



