import { useCharacters } from '../hooks/index.js'
const { getOneCharacter, getComicsOfCharacter } = useCharacters()

const Character = async (id) => {
    const character = await getOneCharacter(id)
    const comics = await getComicsOfCharacter(id)
    console.log(character)
    console.log(comics)

    const comicsHTML = comics?.comics?.reduce((acc, el) => acc + (
        `<article class="m-card-comics g-cards__item" data-comic id="${el?.id}">
            <header>
                <h3 class="m-card-comics__title">${el?.title}</h3>
            </header>
            <figure class="m-card-comics__image">
                <img src="${el?.image}" alt="Comic cover"  crossorigin="anonymous">
            </figure>
        </article>
        `
    ), '')

    return `
        <article class="is-py-8 o-container">
            <div class="g-one-characters">
                <header class="is-w-full">
                    <h3>${character?.name}</h3>
                    <p class="is-flex is-flex-col is-gap-4">
                        <span class="is-bold a-heading-4">Publicado</span>
                        <span>${character?.description}</span>
                    </p>
                </header>
                <figure class="is-w-max-80 g-characters__item">
                    <img src="${character?.image}" alt="Comic cover"  crossorigin="anonymous">
                </figure>
            </div>
            <section>
                <header>
                    <h4 class="a-heading-3">Comics</h4>
                </header>
                <div class="g-characters__grid">
                    ${comicsHTML}
                </div>
            </section>
        </article>
    `
}

export default Character