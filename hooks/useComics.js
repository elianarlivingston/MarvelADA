import base from '../services/crudder.js'
import {defaultImage} from '../config/index.js'

const { getAll, getOne, getAllOf } = base('comics')

export default function useComics() {
    return {
        getAllComics: async (params) => {
            const data = await getAll(params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const comics = results.map(comic => {
                    const { thumbnail, id, title } = comic
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`

                    return {
                        id,
                        title,
                        image
                    }
                })

                return {
                    meta: { offset, limit, total, count },
                    results: comics
                }
            })

            return data || {}
        },
        getOneComic: async (id) => {
            const data = await getOne(id)
            .then(res => {
                const comics = res?.data?.results.map(comic => {
                    const { thumbnail, id, title, creators, description, dates  } = comic
                    const writer = creators?.items?.filter(el => el.role === 'writer')
                    const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`

                    return {
                        id,
                        title,
                        writer,
                        releaseDate,
                        description,
                        image
                    }
                })

                return comics[0]
            })

            return data || {}
        },
        getCharactersOfComics: async (id) => {
            const data = await getAllOf(id, 'characters')
            .then(res => {
                const characters = res?.data?.results?.map(character => {
                    const { thumbnail, id, name } = character
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`
                    return {
                        id,
                        name,
                        image
                    }
                })

                return { characters }
            })

            return data || {}
        }
    }
}