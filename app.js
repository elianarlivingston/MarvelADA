import base from './services/crudder.js'

// EXAMPLE
const characters = base('characters')

characters.getAll().then(data => console.log(data))
characters.getOne('1009610').then(data => console.log(data))