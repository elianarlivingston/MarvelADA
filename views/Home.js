const Home = () => {
    const section = document.createElement('section')
    section.innerHTML = `
    <section class="g-hero">
        <header class="g-hero__info">
            <h1>MARVEL CHARACTERS</h1>
            <p>Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!</p>
        </header>
    </section>
    `

    return section
}

export default Home