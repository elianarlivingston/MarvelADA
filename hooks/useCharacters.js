import base from '../services/crudder.js'

const { getAll, getOne } = base('characters')

export default function useCharacters() {
    return {
        getAllCharacters: async (params) => {
            const data = await getAll(params).then(res => {
                const { offset, limit, total, count, results } = res?.data

                return {
                    meta: { offset, limit, total, count },
                    results
                }
            })

            return data || {}
        },
        getOneCharacter: async (id, params) => {
            const data = await getOne(id, params).then(res => res?.data?.results['0'])

            return data || {}
        }
    }
}