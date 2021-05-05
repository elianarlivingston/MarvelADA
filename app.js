import { useComics } from './hooks/index.js'

// EXAMPLE
const { getAllComics, getOneComic } = useComics()

getAllComics()

getOneComic('82967')