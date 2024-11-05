'use strict'

import { data } from "./data.js" // Importa un conjunto de datos desde data.js para usar en la búsqueda y el renderizado

const $ = (tag) => document.querySelector(tag) // Función de utilidad para seleccionar un solo elemento del DOM

// Variables que almacenan referencias a elementos HTML específicos
const $searchInput = $('#search-input') // Campo de entrada para la búsqueda
const $results = $('#results') // Contenedor donde se mostrarán los resultados
const $cardTemplate = $('#card-template') // Template de tarjeta para los resultados de búsqueda
const $searchClear = $('#search-clear') // Botón para limpiar el campo de búsqueda

// Función de debounce que limita la frecuencia de ejecución de una función
const debouncer = (fn, delay) => {
  let timeoutId // Identificador del timeout
  return (param) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId) // Cancela el timeout si ya existe uno activo
    }
    timeoutId = setTimeout(() => {
      fn(param) // Ejecuta la función `fn` con un retraso de `delay`
    }, delay);
  }
}

// Asigna la función al evento "oninput" del campo de búsqueda
$searchInput.oninput = (e) => {
  debouncer(searchData, 300)(e.target.value) // Llama al debouncer para que `searchData` se ejecute cada 300 ms
}

$searchClear.onclick = (e) => {
  e.preventDefault() // Evita el comportamiento por defecto del botón
  $searchInput.value = '' // Limpia el campo de búsqueda
  renderData(data) // Renderiza todos los datos cuando el campo está vacío
}

// Función de búsqueda: verifica si `needle` se encuentra dentro de `haystack` ignorando mayúsculas
const includes = (haystack, needle) => {
  return haystack.toLowerCase().includes(needle.toLowerCase())
}

// Función que filtra `data` según el parámetro de búsqueda ingresado
const searchData = (searchParam) => {
  const t0 = performance.now()
  const filterData = data.filter(movie =>
    includes(movie.title, searchParam) || // Verifica si el título contiene el parámetro de búsqueda
    includes(movie.short_description, searchParam) || // Verifica si la descripción contiene el parámetro
    includes(movie.release_date, searchParam) // Verifica si la fecha de lanzamiento contiene el parámetro
  )
  renderData(filterData, searchParam) // Renderiza los datos filtrados
  console.log('Searched in %i milliseconds.', performance.now() - t0)
}

// Función que renderiza las tarjetas en pantalla
// con resaltado de coincidencias
const renderData = (data, searchParam) => {
  $results.replaceChildren();
  data.forEach(movie => {
    const cardClone = $cardTemplate.content.cloneNode(true);

    // Resaltar coincidencias en los textos
    const highlightMatch = (text) =>
      text.replace(new RegExp(`(${searchParam})`, 'gi'), '<mark>$1</mark>');

    cardClone.querySelector('.card-title').innerHTML = highlightMatch(movie.title);
    cardClone.querySelector('.card-date').innerHTML = highlightMatch(movie.release_date);
    cardClone.querySelector('.card-description').innerHTML = highlightMatch(movie.short_description);

    $results.appendChild(cardClone);
  });
};

// Función principal que realiza el primer renderizado; es una IIFE (Inmediatly Invoked Function Expression)
; (function () {
  renderData(data) // Renderiza todos los datos al cargar la página
})()
