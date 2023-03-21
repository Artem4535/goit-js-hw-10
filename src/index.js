import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import marcup from './templetes/marcup';
import previer from './templetes/previos-marcup'
import fetchCountry from './fetch'

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
    countryList.innerHTML = '';
    return;
  }

    fetchCountry(currentValue).then(country => {
        const countryList = country.map(country => country.name);
        if (countryList.length === 1) {
            createMarkup(country);

        }  else if (countryList.length <= 10 && countryList.length > 1) {
             createPreviusMarcup(country)
        } else if (countryList.length > 10) {
           Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }

    })
        
    .catch(error => {
     Notiflix.Notify.failure('Oops, there is no country with that name');
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



function deleteCountriesInfo() {
  infoCountryRef.innerHTML = '';
  countryList.innerHTML = '';
}



