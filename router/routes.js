const routes = [
    {
        path: '/',
        component:  () => `<h1>Home</h1>`,
        name: 'Home'
    },
    {
        path: '/characters',
        component:  () => `<h1>Personajes</h1>`,
        name: 'Characters'
    },

    {
        path: '/characters/:id',
        component: () => `<h1>Personaje ID</h1>`,
        name: 'Characters ID'
    }
]

export default routes