import { setParams } from './URLParams.js'
import authorization from '../config/authorization.js'
import { errorAlert } from './notify.js'

const fetchApi = (url, params = {}) => {
    const newUrl = setParams(url, { ...params, ...authorization })

    if(!newUrl) return Promise.reject('La url no es válida')

    return fetch(newUrl)
    .then(res => res.json())
    .catch(err => {
        const notifyError = errorAlert(err)
        notifyError.show()

        setTimeout(() => {
            notifyError.close()
        }, 5000);
        
        throw err
    })
}

export default fetchApi