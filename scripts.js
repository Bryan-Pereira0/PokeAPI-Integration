async function fetchData(url){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
    }
    return null
}
//API fetch function so that I don't have to remake it on every page
async function fetchPokemonData(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    return await fetchData(url);
}

//This sets up the navbar on every page and lets it hug the top of the page as you scroll
document.addEventListener('DOMContentLoaded', () => {
    const navbar = `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color: #9B0000">
        <div class="container">
            <a class="navbar-brand" href="index.html">Project Pokemon</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                    <li class="nav-item"><a class="nav-link" href="moves.html">Moves</a></li>
                    <li class="nav-item"><a class="nav-link" href="types.html">Pokemon Types</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbar);
});