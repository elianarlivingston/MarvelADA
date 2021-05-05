import fetchApi from './utils/fetchApi.js'

// EXAMPLE
fetchApi('http://gateway.marvel.com/v1/public/characters', { offset: 20 })
.then(data => console.log(data))