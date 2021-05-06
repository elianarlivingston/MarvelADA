import base from '../services/crudder.js'

const { getAll, getOne } = base('characters')

export default function useCharacters() {
    return {
        getAllCharacters: async (params) => {
            const data = await getAll(params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const characters = results.map(character => {
                    const { id, name, thumbnail} = character
                    return ({ id, name, thumbnail })
                })

                return {
                    meta: { offset, limit, total, count },
                    results: characters
                }
            })

            return data || {}
        },
        getOneCharacter: async (id, params) => {
            const data = await getOne(id, params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const characters = results.map(character => {
                    const { id, name, description, thumbnail} = character
                    return ({ id, name, description, thumbnail })
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