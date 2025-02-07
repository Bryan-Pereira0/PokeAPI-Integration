document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const pokemonList = document.getElementById('pokemonList');
  let allMoves = [];

  function showMoves(movesArray) {
    pokemonList.innerHTML = '';
    movesArray.forEach(move => {
      const moveCard = document.createElement('div');
      moveCard.classList.add('card', 'mb-2', 'p-3');
      moveCard.innerHTML = `
        <h5 class="card-title text-capitalize">${move.name}</h5>
        <p class="card-text">Damage: Loading...</p>
      `;
      pokemonList.appendChild(moveCard);

      fetch(move.url)
        .then(response => response.json())
        .then(data => {
          const power = data.power !== null ? data.power : 'N/A';
          moveCard.innerHTML = `
            <h5 class="card-title text-capitalize">${data.name}</h5>
            <p class="card-text">Damage: ${power}</p>
            <p class="card-text">Type: ${data.type.name}</p>
            <p class="card-text">Accuracy: ${data.accuracy || 'N/A'}</p>
            <p class="card-text">PP: ${data.pp}</p>
            <p class="card-text">Effect: ${data.effect_entries[0].short_effect}</p>
          `;
        })
        .catch(err => {
          moveCard.innerHTML = `
            <h5 class="card-title text-capitalize">${move.name}</h5>
            <p class="card-text">Error loading damage.</p>
          `;
        });
    });
  }

  fetch('https://pokeapi.co/api/v2/move?limit=1000')
    .then(response => response.json())
    .then(data => {
      allMoves = data.results;
      showMoves(allMoves);
    })
    .catch(err => {
      pokemonList.innerHTML = '<p>Error loading moves.</p>';
    });

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allMoves.filter(move =>
      move.name.includes(searchTerm)
    );
    showMoves(filtered);
  });
});