const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

const detailsContainer = document.getElementById('pokemonDetails');

if (detailsContainer && pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(data => {
            const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const detailsHTML = `
                <h1>${capitalizedName}</h1>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="${capitalizedName}">
                <p><strong>Height:</strong> ${data.height} FT</p>
                <p><strong>Weight:</strong> ${data.weight} LBS</p>
                <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
                <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Types:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            detailsContainer.innerHTML = detailsHTML;
        })
        .catch(err => detailsContainer.innerHTML = '<p>Error loading details.</p>');
} else {
    detailsContainer.innerHTML = '<p>No Pokémon selected.</p>';
}