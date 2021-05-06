import { $ } from './dom.js'

const notify = (type) => (str) => {
    const alertElement = document.createElement('aside')
    alertElement.classList.remove('is-hidden')
    alertElement.classList.add(`notify-${type}`)

    alertElement.innerHTML = `
        <header>
            <h3>${type}</h3>
        </header>
        <p>${str}</p>
        <button data-close>Cerrar</button>
    `
    const btnClose = alertElement.querySelector('[data-close]')
    btnClose.addEventListener('click', () => alertElement.classList.add('is-hidden'))

    $('#root').append(alertElement)

    return {
        show: () => alertElement.classList.remove('is-hidden'),
        close: () => alertElement.classList.add('is-hidden')
    }
}

export const errorAlert = notify('error')
export const successAlert = notify('success')