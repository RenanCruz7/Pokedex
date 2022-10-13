// função que busca os pokemons
const fetchPokemon = () => {
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonNum = [6,18,26,45,51,134]
    const pokemonParty = []

    pokemonNum.forEach(id =>{
        pokemonParty.push(fetch(getPokemonUrl(id)).then(Response => Response.json()))
    })

    // esse metodo recebe um array de promises como argumento
    // retornando uma outra promise como resultado
    Promise.all(pokemonParty) 
        .then(pokemons => {
            const lisPokemons = pokemons.reduce((accumulator, pokemon) =>{
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                    <li class = "card" ${types[0]}>
                    <img class ="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '')
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = lisPokemons
    })
}

fetchPokemon()