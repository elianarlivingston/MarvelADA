import { $, $$ } from './utils/dom.js'
import { router, push } from './router/router.js'
import routes from './router/routes.js'
import { getParams, setParams } from './utils/URLParams.js'


window.addEventListener('hashchange', () => router(routes))

window.addEventListener('DOMContentLoaded', () => {
    router(routes)

    const btnToggleSidebar = Array.from($$('[data-toggle="sidebar"]'))
    const sidebar = $('.g-sidebar')

    btnToggleSidebar.map(btn => btn.addEventListener('click', () => sidebar?.classList?.toggle('g-sidebar--hidden')))
})

$('#root').addEventListener('click', event => {
    if(event.target.matches('[data-comic]')) {
        const id = event.target.id
        push(`#/comics/${id}`)
        return 
    }

    if(event.target.matches('[data-character]')) {
        const id = event.target.id
        push(`#/characters/${id}`)
        return 
    }

    if(event.target.matches('[data-character]')) {
        const id = event.target.id
        push(`#/characters/${id}`)
        return 
    }
    
})

$('#root').addEventListener('change', event => {
    if(event.target.matches('[data-filter-comics="search"]')) {
        const value = event.target.value

        const params = getParams(location.href)
        params.titleStartsWith = value

        params.offset = 0

        const newURL = setParams(`${location.origin}/${location.hash}`, params)

        push(newURL)
    }

    if(event.target.matches('[data-filter-comics="order"]')) {
        const value = event.target.value
        console.log(event.target.value)

        const params = getParams(location.href)
        params.orderBy = value

        params.offset = 0

        const newURL = setParams(`${location.origin}/${location.hash}`, params)

        push(newURL)
    }

    if(event.target.matches('[data-filter-comics="search"]')) {
        const value = event.target.value

        const params = getParams(location.href)
        params.titleStartsWith = value

        params.offset = 0

        const newURL = setParams(`${location.origin}/${location.hash}`, params)

        push(newURL)
    }

    if(event.target.matches('[data-filter-characters="search"]')) {
        const value = event.target.value

        const params = getParams(location.href)
        params.nameStartsWith = value

        params.offset = 0

        const newURL = setParams(`${location.origin}/${location.hash}`, params)

        push(newURL)
    }

    if(event.target.matches('[data-filter-characters="order"')) {
        const value = event.target.value
        console.log(event.target.value)

        const params = getParams(location.href)
        params.orderBy = value

        const newURL = setParams(`${location.origin}/${location.hash}`, params)

        push(newURL)
    }
})