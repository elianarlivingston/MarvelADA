import fetchApi from '../utils/fetchApi.js'

const crudder = url => path => {
    return ({
        getAll: (params = {}) => {
            const newUrl = `${url}/${path}`
            return fetchApi(newUrl, params)
        },
        getOne: (id) => {
            const newUrl = `${url}/${path}/${id}`
            return fetchApi(newUrl)
        },
        getAllOf: (id, subpath) => {
            const newUrl = `${url}/${path}/${id}/${subpath}`
            return fetchApi(newUrl)
        }
    })
}

const base = crudder('http://gateway.marvel.com/v1/public')

export default base