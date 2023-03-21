export default function (country) {
    return country.map(({ flags, name }) => {
        return `
         <li>
      <img src="${flags.svg}"alt="${name.official}"width='40px'> ${name.official}
      </li>
    `
    })
}