import './sass/main.scss';
import './js/fetchCountries.js'

import templateCountriesList from './templates/coutries-list.hbs'
import templateCountryCard from './templates/country-card.hbs'
import { error } from '@pnotify/core'
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

import { fetchCountries } from './js/fetchCountries.js';

const validInput = document.getElementById('validation-input')
const debounce = require('lodash.debounce')


const refs = {
    bodySt: document.querySelector('body'),
    listOfCountries: document.querySelector('.country-list'),
    cardOfCountry: document.querySelector('.country__card')
}

validInput.addEventListener('input', debounce(onSearch, 500))


function onSearch(evt) {
    evt.preventDefault()
    let inputValue = ''
    inputValue = evt.target.value
    if (inputValue === '') {return}
    clearContainer()
    fetchCountries(inputValue).then(countries => {
        if (countries.length > 10) { listToLong()} else
        if (countries.length < 10 && countries.length >= 2) { makeList(countries) }
        else if (countries.length === 1) { makeCard(countries) }
    }).catch(error => console.log(error))
}

function makeList(e) {
    
    let result = templateCountriesList(e)
    refs.listOfCountries.insertAdjacentHTML('beforeend', result)
    
    const activeListCountries = document.querySelector('.country-list')
    activeListCountries.addEventListener('click', (evt) => {
        evt.preventDefault()
        console.log(evt.target.innerHTML)
        fetchCountries(evt.target.innerHTML).then((countries) => {
            clearContainer()
            makeCard(countries)
            
        })
})
    
}

// function makeActiveList(e) {
//     console.dir(e)
//     makeCard(e)
// }
   


function makeCard(e) {
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


