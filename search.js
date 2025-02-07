document.addEventListener('DOMContentLoaded', () => {
  let renderId = 0;
  
  const searchInput = document.getElementById('searchInput');
  const pokemonList = document.getElementById('pokemonList');
  
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=10000')
    .then(response => response.json())
    .then(data => {
      const allPokemon = data.results;
      showPokemon(allPokemon);
  
      searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = allPokemon.filter(pokemon => 
          pokemon.name.includes(searchTerm)
        );
        showPokemon(filtered);
      });
    });
  
  function showPokemon(pokemonArray) {
    renderId++;
    const localRenderId = renderId;
    pokemonList.innerHTML = '';
    let index = 0;
    
    function renderNext() {
      if (localRenderId !== renderId) return;
      if (index >= pokemonArray.length) return;
      
      const pokemon = pokemonArray[index];
      const id = pokemon.url.split('/')[6];
      const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      const cardCol = document.createElement('div');
      cardCol.classList.add('col-md-3');
      
      cardCol.innerHTML = `
        <div id="pokemon-card" class="card text-center border-0">
          <h3>${capitalizedName}</h3>
          <div class="card-body text-center">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" class="img-fluid w-50 mb-3" alt="${capitalizedName}">
            <a href="details.html?id=${id}" class="btn btn-primary w-50" style="background-color: #9B0000">
              View details
            </a>
          </div>
        </div>
      `;
      
      pokemonList.appendChild(cardCol);
      index++;
      setTimeout(renderNext, 30);
    }
    
    renderNext();
  }
});