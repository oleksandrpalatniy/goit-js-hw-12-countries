import templateCountriesList from '../templates/coutries-list.hbs'
import templateCountryCard from '../templates/country-card.hbs'
import { error } from '@pnotify/core'
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const validInput = document.getElementById('validation-input')
const debounce = require('lodash.debounce')

const refs = {
    bodySt: document.querySelector('body'),
    listOfCountries: document.querySelector('.country-list'),
    cardOfCountry: document.querySelector('.country__card')
}

validInput.addEventListener('input', debounce(onSearch, 500))

function onSearch(evt) {
    clearContainer()
    let count = 0
    count = evt.target.value
    console.log(count)
    if (count === '') {return}
    return fetch(`https://restcountries.com/v2/name/${count}`)
    .then(response => { return response.json() })
    .then (countries => {
        
        if (countries.length > 10) { listToLong()} else
        if (countries.length < 10 && countries.length >= 2) { makeList(countries) }
        else if (countries.length === 1) { makeCard(countries) }
    })
    .catch(errorOnQuery)
}


function makeList(e) {
    let result = templateCountriesList(e)
    refs.listOfCountries.insertAdjacentHTML('beforeend', result)
}
function makeCard(e) {
    console.log('малюємо сторінку країни')
    let resultCountry = templateCountryCard(e)
    refs.cardOfCountry.insertAdjacentHTML('beforeend', resultCountry)
}
    

function clearContainer() {
    refs.cardOfCountry.innerHTML = ''
    refs.listOfCountries.innerHTML = ''
}

function listToLong () {
    error({
        text: "Too many matches found. Please enter a more specific query!",
        delay: 2000,
    })
}


