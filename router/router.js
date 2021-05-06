import { $ } from '../utils/dom.js'

const parseRequestId = () => {
    const { hash } = window.location
    const elementsHash = hash.split('/')

    return {
        hash: elementsHash[0],
        resource: elementsHash[1],
        id: elementsHash[2]
    }
}

const router = async (routes = []) => {
    const request = parseRequestId()
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '')
    const route = routes?.find(el => el.path === parseUrl)
    
    if(route) {
        request.id ? route.id = request.id : ''

        console.log(route)
        $('#root').innerHTML = await route?.component()
    } else {
        const routeDefault = routes?.find(el => el.path === '/')

        console.log(routeDefault)
        $('#root').innerHTML = await routeDefault?.component()
    }
}

export default router