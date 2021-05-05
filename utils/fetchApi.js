import { setParams } from './URLParams.js'
import authorization from '../config/authorization.js'

const fetchApi = (url, params) => {
    const newUrl = setParams(url, { ...params, ...authorization })

    if(!newUrl) return Promise.reject('La url no es válida')

    return fetch(newUrl)
    .then(res => res.json())
    .catch(err => console.err(err))
}

export default fetchApi