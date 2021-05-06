import fetchApi from '../utils/fetchApi.js'

const crudder = url => path => {
    return ({
        getAll: (params = {}) => {
            const newUrl = `${url}/${path}`
            return fetchApi(newUrl, params)
        },
        getOne: (id, params = {}) => {
            const newUrl = `${url}/${path}/${id}`
            return fetchApi(newUrl, params)
        }
    })
}

const base = crudder('http://gateway.marvel.com/v1/public')

export default base