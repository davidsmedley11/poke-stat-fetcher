import fs from "fs/promises";
import * as choice from './askUser.js';
import * as data from './getPokemonStats.js'

let appRunning = true;

const initApp = async () => {
    // Get choices
    let notPokemon = true;
    while (notPokemon) {
        const pokemon = choice.pokemonChoice();
        const pokemonData = await data.getPokemon(pokemon);
        if (pokemonData === null) {
            console.log("Pokémon not found!");
        } else {
            notPokemon = false;
            const wouldLikeStats = choice.wouldLikeStats(pokemon);
            const wouldLikeArtwork = choice.wouldLikeArtwork(pokemon);
            const wouldLikeSprites = choice.wouldLikeSprites(pokemon);

            if (wouldLikeStats || wouldLikeArtwork || wouldLikeSprites) {
                fs.mkdir(pokemon);
                console.log(`File (name: ${pokemon}) sucessfully created!`);

                if (wouldLikeStats) {
                    data.getPokemonStats(pokemonData, pokemon);
                    console.log("stats.txt succesfully created...")
                };

                if (wouldLikeSprites) {
                    await data.getPokemonSprites(pokemonData, pokemon);
                };

                if (wouldLikeArtwork) {
                    await data.getPokemonArtwork(pokemonData, pokemon);
                    console.log("official-artwork.png succesfully created...")
                };
            } else {
                console.log("No information to download...");
            };
        }};

    if (choice.continuePlaying()) {
            initApp();
    } else {
        console.log("Exiting App...")
    }
}

initApp();
