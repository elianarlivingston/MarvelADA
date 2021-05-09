import base from '../services/crudder.js'
import { defaultImage } from '../config/index.js'

const { getAll, getOne, getAllOf } = base('characters')

export default function useCharacters() {
    return {
        getAllCharacters: async (params) => {
            const data = await getAll(params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const characters = results.map(character => {
                    const { id, name, thumbnail} = character
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`


                    return ({ id, name, image })
                })

                return {
                    meta: { offset, limit, total, count },
                    results: characters
                }
            })

            return data || {}
        },
        getOneCharacter: async (id) => {
            const data = await getOne(id)
            .then(res => {
                const characters = res?.data?.results.map(character => {
                    const { id, name, description, thumbnail} = character
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`

                    return ({ id, name, description, image })
                })

                return characters[0]
            })

            return data || {}
        },
        getComicsOfCharacter: async (id) => {
            const data = await getAllOf(id, 'comics')
            .then(res => {
                const comics = res?.data?.results?.map(character => {
                    const { thumbnail, id, title } = character
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`
                    return {
                        id,
                        title,
                        image
                    }
                })

                return { comics }
            })

            return data || {}
        }
    }
}