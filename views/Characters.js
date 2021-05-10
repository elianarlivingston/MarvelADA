import { getParams, setParams } from '../utils/URLParams.js'
import { push } from '../router/router.js'
import { useCharacters } from '../hooks/index.js'

const { getAllCharacters } = useCharacters()

const Characters = async () => {
    const params = getParams(location.href)

    const characters = await getAllCharacters(params)

    const { total } = characters?.meta

    if(total === 0) {
        params.offset = 0
        const newURL = setParams(`${location.origin}/${location.hash}`, params)
        push(newURL)
    }

    const html = characters?.results?.reduce((acc, el) => acc + (
        `<article class="m-card-character g-characters__item is-z-index-2" data-character id="${el?.id}">
            <header class="m-card-character__content">
                <h3 class="m-card-character__title a-heading-3">${el?.name}</h3>
            </header>
            <figure class="m-card-character__image">
                <img src="${el?.image}" alt="Character cover" crossorigin="anonymous">
            </figure>
        </article>
        `
    ), '')

    const div = document.createElement('div')

    div.innerHTML = `
    <header class="o-container is-py-4">
        <nav class="g-cards__filter">
            <div class="a-search" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input type="text" placeholder="search..."  class="a-search__input" autocomplete="off" data-filter-characters="search">
            </div>
            <label class="is-flex is-gap-4 is-items-center">
                <span class="is-text-uppercase is-text-color-inverted-dark is-bold">order by</span>
                <select class="m-select" data-filter-characters="order">
                    <option class="m-select__option" value="name">a-z</option>
                    <option class="m-select__option" value="-name">z-a</option>
                </select>
            </label>
        </nav>
    </header>
    <section class="is-py-8 o-container">
        <header>
            <h2>Personajes</h2>
        </header>

        <div class="g-characters__grid">
            ${
                characters?.results?.length === 0 ? `<h3 class="is-flex is-justify-center">No hay resultados...</h3>` : html
            }  
        </div>


        <div class="a-pagination">
            <button class="a-pagination__btn" data-pagination="prev">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </button>
            <button disabled  class="a-pagination__btn" data-pagination="current">
                ${(parseInt(characters?.meta?.offset) / parseInt(characters?.meta?.limit)) + 1}
            </button>
            <button  class="a-pagination__btn" data-pagination="next">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
            </button>
            Total pages: ${Math.ceil((parseInt(characters?.meta?.total) / parseInt(characters?.meta?.limit)))}
        </div>
    </section>`
    
    const pagination = div.querySelector('.a-pagination')

    pagination?.addEventListener('click', event => {
        if(event.target.matches('[data-pagination="prev"]')) {
            const { offset, limit } = characters?.meta
            let newOffset = parseInt(offset)

            if(newOffset <= parseInt(limit)) {
                newOffset = 0
            } else {
                newOffset -= 20
            }

            const params = getParams(location.href)
            params.offset = newOffset

            const newURL = setParams(`${location.origin}/${location.hash}`, params)

            push(newURL)
        }

        if(event.target.matches('[data-pagination="next"]')) {
            const { offset, limit, total } = characters?.meta
            const pages = Math.ceil(parseInt(total) / parseInt(limit))
            let newOffset = parseInt(offset)


            if(newOffset < total) {
                newOffset += 20
            } else {
                newOffset = 0
            }

            const params = getParams(location.href)
            params.offset = newOffset

            const newURL = setParams(`${location.origin}/${location.hash}`, params)

            push(newURL)
        }
    })

    const search = div.querySelector('[data-filter-characters="search"]')
    search.value = params.nameStartsWith ?? ''

    const select = div.querySelector('[data-filter-characters="order"]')
    select.value = params?.orderBy
    return div
}

export default Characters