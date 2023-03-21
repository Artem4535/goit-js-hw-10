export default function (country) {
    return country.map(({ flags, name, capital, population, languages }) => {
        return `
            <div>
    <div>
      <p><img src="${flags.svg}" alt="${name.official}" width='40px'> ${name.official}</p>
    </div>
    <ul>
      <li>Capital: ${capital}</li>
      <li>Population: ${population}</li>
      <li>Languages: ${Object.values(languages).join(', ')}</li>
    </ul>
  </div>`
    })
}