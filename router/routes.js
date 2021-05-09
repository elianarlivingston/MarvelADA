import Comics from '../views/Comics.js'
import Comic from '../views/Comic.js'
import Characters from '../views/Characters.js'
import Home from '../views/Home.js'

const routes = [
    {
        path: '/',
        component:  () => Home(),
        name: 'Home'
    },
    {
        path: '/characters',
        component: Characters,
        name: 'Characters'
    },
    {
        path: '/characters/id:',
        component:  (id) => `<h1>Personajes ${id}</h1>`,
        name: 'Characters'
    },
    {
        path: '/comics',
        component: Comics,
        name: 'Comics'
    },
    {
        path: '/comics/:id',
        component: async (id) => await Comic(id) ,
        name: 'Characters ID'
    }
]

export default routes