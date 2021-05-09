import Comics from '../views/Comics.js'
import Comic from '../views/Comic.js'
import Characters from '../views/Characters.js'
import Character from '../views/Character.js'
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
        path: '/characters/:id',
        component: async (id) => await Character(id),
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