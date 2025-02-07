document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const pokemonList = document.getElementById('pokemonList');
    let allTypes = [];
  
    function showTypes(typesArray) {
      pokemonList.innerHTML = '';
      typesArray.forEach(type => {
        const typeCard = document.createElement('div');
        typeCard.classList.add('card', 'mb-2', 'p-3', 'd-flex', 'align-items-center');
        typeCard.style.cursor = 'pointer';
        typeCard.innerHTML = `
          <h5 class="card-title text-capitalize m-0">${type.name}</h5>
        `;
        typeCard.addEventListener('click', () => {
          fetch(type.url)
            .then(response => response.json())
            .then(data => {
              const pokeArray = data.pokemon.map(entry => entry.pokemon);
              showPokemonByType(pokeArray, type.name);
            })
            .catch(err => {
              pokemonList.innerHTML = '<p>Error loading Pokemon for this type.</p>';
            });
        });
        pokemonList.appendChild(typeCard);
      });
    }
  
    function showPokemonByType(pokemonArray, typeName) {
      pokemonList.innerHTML = `<h2 class="text-center mb-3">Pokemon of type ${typeName}</h2>`;
      const row = document.createElement('div');
      row.classList.add('row');
      pokemonArray.forEach(pokemon => {
        const parts = pokemon.url.split('/');
        const id = parts[parts.length - 2];
        const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const col = document.createElement('div');
        col.classList.add('col-md-3', 'mb-3');
        col.innerHTML = `
          <div class="card text-center p-2">
            <h5>${capitalizedName}</h5>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${capitalizedName}" class="img-fluid" style="max-width:100px;">
          </div>
        `;
        row.appendChild(col);
      });
      pokemonList.appendChild(row);
  
      const backButton = document.createElement('button');
      backButton.textContent = 'Back to Types';
      backButton.classList.add('btn', 'btn-secondary', 'mt-3');
      backButton.addEventListener('click', () => {
        showTypes(allTypes);
      });
      pokemonList.appendChild(backButton);
    }
  
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        allTypes = data.results.sort((a, b) => a.name.localeCompare(b.name));
        showTypes(allTypes);
      })
      .catch(err => {
        pokemonList.innerHTML = '<p>Error loading types.</p>';
      });
  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filtered = allTypes.filter(type =>
        type.name.includes(searchTerm)
      );
      showTypes(filtered);
    });
  });