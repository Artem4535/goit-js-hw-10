export default function fetchCountry(countryName) {
    const URl = 'https://restcountries.com/v3.1/name/';
    const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages,',
});

return fetch(`${URl}${countryName}?${searchParams}`).then(response => {
    if (response.status === 404) {
      throw new Error(response.status);
    }
    return response.json();
})
}

