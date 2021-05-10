import { useComics } from '../hooks/index.js'
const { getOneComic, getCharactersOfComics } = useComics()

const Comic = async (id) => {
    const comic = await getOneComic(id)
    const characters = await getCharactersOfComics(id)

    const charactersHTML = characters?.characters?.reduce((acc, el) => acc + (
        `
            <article class="m-card-character g-characters__item"  data-character id="${el?.id}">
                <header class="m-card-character__content">
                    <h3 class="m-card-character__title a-heading-3">${el?.name}</h3>
                </header>
                <figure class="m-card-character__image">
                    <img src="${el?.image}" alt="cover character"  crossorigin="anonymous">
                </figure>
            </article>
        `
    ), '')

    const writers = comic?.writer.reduce((acc, el) => acc + (`<span class="is-bold">${el?.name}</span>`), '')

    return `
        <article class="is-py-8 o-container">
            <div class="g-one-characters">
                <header class="is-w-full">
                    <h3>${comic?.title}</h3>
                    <p class="is-flex is-flex-col is-gap-4">
                        <span class="is-bold a-heading-4">Publicado</span>
                        <span>${comic?.releaseDate}</span>
                    </p>
                    <p class="is-flex is-flex-col is-gap-4">
                        <span class="is-bold a-heading-4">Guionistas</span>
                        <span class="is-flex is-flex-wrap is-gap-4">
                            ${writers}
                        </span>
                    </p>
                    <p class="is-flex is-flex-col is-gap-4">
                        <span class="is-bold a-heading-4">Descipción</span>
                        <span>${comic?.description || ''}</span>
                    </p>
                </header>
                <figure class="is-w-max-80 g-characters__item">
                    <img src="${comic?.image}" alt="Comic cover"  crossorigin="anonymous">
                </figure>
            </div>
            <section>
                <header>
                    <h4 class="a-heading-3">Personajes</h4>
                </header>
                <div class="g-characters__grid">
                    ${charactersHTML}
                </div>
            </section>
        </article>
    `
}

export default Comic