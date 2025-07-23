
import promptSync from 'prompt-sync';
const prompt = promptSync(); 

// Asks user to pick a pokemon and returns said pokemon in lower case
const pokemonChoice = () => {
    const pokemon = prompt("Which Pokémon would you like to choose?: ").toLowerCase();
    return pokemon;
};

// If user would like stats, returns true
const wouldLikeStats = (name) => {
    const userResponse = prompt(`Would you like to download ${name}'s stats?: `).toLowerCase();
    if (userResponse === "yes" || userResponse === "y") {
        return true;
    } else {
        return false;
    }
};

// If user would like sprites, returns true
const wouldLikeSprites = (name) => {
    const userResponse = prompt(`Would you like to download ${name}'s sprites?: `).toLowerCase();
    if (userResponse === "yes" || userResponse === "y") {
        return true;
    } else {
        return false;
    }
};

// If user would like artwork, returns true
const wouldLikeArtwork = (name) => {
    const userResponse = prompt(`Would you like to download ${name}'s artwork?: `).toLowerCase();
    if (userResponse === "yes" || userResponse === "y") {
        return true;
    } else {
        return false;
    }
};

const continuePlaying = () => {
    const keepPlaying = prompt("Would you like to pick another pokemon?: ").toLowerCase();
    let shouldContinue = keepPlaying === "y" || keepPlaying === "yes" ? true: false;
    return shouldContinue
}

export { pokemonChoice, wouldLikeArtwork, wouldLikeSprites, wouldLikeStats, continuePlaying }
