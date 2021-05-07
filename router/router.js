import { $ } from '../utils/dom.js'
import { Loading } from '../components/Loading.js'

const parseRequestId = () => {
    const { hash } = window.location

    const elementsHash = hash.split('/')

    return {
        resource: elementsHash[1],
        id: elementsHash[2]
    }
}

export const router = async (routes = []) => {
    const request = parseRequestId()
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '')
    const route = routes?.find(el => el.path === parseUrl)
    
    if(route) {
        if(!request.id) {
            console.log(route)
            $('#root').innerHTML = Loading()
            const element = await route?.component()
            $('#root').innerHTML = ''
            $('#root').appendChild(element)
            return 
        }

        route.id = request.id
        console.log(route)
        $('#root').innerHTML = Loading()
        $('#root').innerHTML = await route?.component(route.id)
    } else {
        const routeDefault = routes?.find(el => el.path === '/')

        console.log(routeDefault)
        $('#root').innerHTML = Loading()
        $('#root').innerHTML = await routeDefault?.component()
    }
}

export const push = (path) => window.location.assign(path) 
