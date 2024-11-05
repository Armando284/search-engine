'use strict'

import { data } from "./data.js"

const $ = (tag) => document.querySelector(tag)

const $searchInput = $('#search-input')
const $results = $('#results')
const $cardTemplate = $('#card-template')

const debouncer = (fn, delay) => {
  let timeoutId
  return (param) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(param)
    }, delay);
  }
}

$searchInput.oninput = (e) => {
  debouncer(searchData, 300)(e.target.value)
}

const includes = (haystack, needle) => {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

const searchData = (searchParam) => {
  const filterData = data.filter(movie =>
    includes(movie.title, searchParam) ||
    includes(movie.short_description, searchParam) ||
    includes(movie.release_date, searchParam)
  )
  renderData(filterData)
}

const renderData = (data) => {
  $results.replaceChildren()
  data.forEach(movie => {
    const cardClone = $cardTemplate.content.cloneNode(true)
    cardClone.querySelector('.card-title').textContent = movie.title
    cardClone.querySelector('.card-date').textContent = movie.release_date
    cardClone.querySelector('.card-description').textContent = movie.short_description
    $results.appendChild(cardClone)
  })
}

  // Main function to start the first render, is an IIFE (Inmediatly Invoked Function Expression)
  ; (function () {
    renderData(data)
  })()