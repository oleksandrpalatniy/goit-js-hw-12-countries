export function fetchCountries(evt) {
    return fetch(`https://restcountries.com/v2/name/${evt}`)
        .then(response => {
            return response.json()
        })
}

