import { useComics } from './hooks/index.js'

// EXAMPLE
const { getOneComic } = useComics()

getOneComic('82967')
.then(data => console.log(data))

console.log('Hello, word!')