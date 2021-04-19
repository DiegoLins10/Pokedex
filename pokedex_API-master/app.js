const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` // Get api ...aspas assim para usar o id

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json())) //criando array

const generateHTML = pokemons => pokemons.reduce((acumulator, {name, id, types}) => {
        const elementsTypes = types.map(typeInfo => typeInfo.type.name)

        acumulator += `
        <li class="card ${elementsTypes[0]}">
        <img class="card-image" alt="${name}" src ="https://pokeres.bastionbot.org/images/pokemon/${id}.png"  />
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementsTypes.join(' | ')}</p>
        </li>
        `
        return acumulator
    }, '') //reduzir  array



const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')//atributo ul
    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises) // promisser encapsular assincrono
    .then(generateHTML) //reduzir  array
    .then(insertPokemonsIntoPage)
