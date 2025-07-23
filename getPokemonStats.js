import fs from "fs/promises";

// Gets data for chosen pokemon 
const getPokemon = async (name) => {
    const pokemonFinder = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (pokemonFinder.status === 404) {
        return null;
    } else if (/\s/g.test(name)) {
        return null;
    } else {
        const pokemonData = pokemonFinder.json();
        return pokemonData;
    }
};

// Gets stats of the pokemon and reformats it into a clean object
const getPokemonStats = (data, name) => {
    const baseStats = {base_stats: {}}
    for (const stats of data.stats) {
        baseStats.base_stats[stats.stat.name] = stats.base_stat;
    }
    fs.writeFile(`./${name}/stats.txt`, Buffer.from(JSON.stringify(baseStats)));
};

// Gets pokemon sprites and stores it into an array
const getPokemonSprites = async (data, name) => {
    const sprites = [];
    let i = 1;
    for await (const sprite of Object.values(data.sprites.other.showdown)) {
        if (!sprite){
        } else {
            await fetch(sprite)
            .then(result => result.bytes())
            .then(gif => fs.writeFile(`./${name}/sprite-${i}.gif`, gif));
            console.log(`sprite-${i} sucessfully created...`);
            i++;
        }
    }
};

// Gets pokemon artwork and returns it
const getPokemonArtwork = async (data, name) => {
    await fetch(data.sprites.other["official-artwork"].front_default)
    .then(result => result.bytes())
    .then(image => fs.writeFile(`./${name}/original-artwork.png`, image))
}

export { getPokemon, getPokemonStats, getPokemonSprites, getPokemonArtwork}