

let gameState = "menu" 

const telas = [
    "menu",
    "game",
    "settings",
    "creditos",
]

function setById(state) {
    try {
        if (state < 0 || state >= telas.length) {
            throw new Error("Invalid game state ID");
        }
        gameState = telas[state]
    } catch (error) {
        console.error("Error game state:", error.message);
    }

    console.log("gameState is: ", gameState)
}

function setByName(state) {
    try {
        if (!telas.includes(state)) {
            throw new Error("Invalid game state name");
        }
        gameState = state
    } catch (error) {
        console.error("Error game state:", error.message);
    }

    console.log("gameState is: ", gameState)
}


function get() {
    return gameState
}


export { setById, setByName, get };