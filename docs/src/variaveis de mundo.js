
const TileSize = 32;
const gravity = .49;

let pause = false;

function setPause(value) {
    pause = value==true;
}

function getPause() {
    return pause;
}

export {setPause, getPause, TileSize, gravity};