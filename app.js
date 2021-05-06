import { useCharacters } from './hooks/index.js'

// EXAMPLE
// const { getAllComics, getOneComic } = useComics()
const { getAllCharacters, getOneCharacter } = useCharacters()

getAllCharacters()
.then(data => console.log(data))
getOneCharacter('1017100')
.then(data => console.log(data))


console.log('Hello, word!')