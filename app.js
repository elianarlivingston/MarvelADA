import router from './router/router.js'
import routes from './router/routes.js'

window.addEventListener('DOMContentLoaded', () => {
    router(routes)
})

window.addEventListener('hashchange', () => router(routes))
