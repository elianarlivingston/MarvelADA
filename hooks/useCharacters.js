import base from '../services/crudder.js'
import { defaultImage } from '../config/index.js'

const { getAll, getOne } = base('characters')

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
                const { offset, limit, total, count, results } = res?.data
                const characters = results.map(character => {
                    const { id, name, description, thumbnail} = character
                    const image = thumbnail?.path.includes('image_not_available') ? defaultImage : `${thumbnail?.path}.${thumbnail?.extension}`

                    return ({ id, name, description, image })
                })

                return {
                    meta: { offset, limit, total, count },
                    results: characters[0]
                }
            })

            return data || {}
        }
    }
}