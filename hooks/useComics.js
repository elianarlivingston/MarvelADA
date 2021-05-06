import base from '../services/crudder.js'

const { getAll, getOne } = base('comics')

export default function useComics() {
    return {
        getAllComics: async (params) => {
            const data = await getAll(params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const comics = results.map(comic => {
                    const { thumbnail, id, title } = comic
                    return {
                        thumbnail,
                        id,
                        title
                    }
                })

                return {
                    meta: { offset, limit, total, count },
                    results: comics
                }
            })

            return data || {}
        },
        getOneComic: async (id, params) => {
            const data = await getOne(id, params)
            .then(res => {
                const { offset, limit, total, count, results } = res?.data
                const comics = results.map(comic => {
                    const { thumbnail, id, title, creators, characters: { items }, description, dates  } = comic
                    const writer = creators?.items?.filter(el => el.role === 'writer')
                    const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))

                    return {
                        thumbnail,
                        id,
                        title,
                        writer,
                        releaseDate,
                        description,
                        characters: items
                    }
                })

                return {
                    meta: { offset, limit, total, count },
                    results: comics[0]
                }
            })

            return data || {}
        }
    }
}