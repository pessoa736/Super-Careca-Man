
const TileSize = 32;
const gravity = .49;

let pause = false;
let timepause = 0

function setPause(value) {
    if (timepause > 8) {
        pause = value==true
        timepause = 0
    }    
}

function updateTimePause(value) {
    timepause++;
}

function getPause() {
    return pause;
}

export {setPause, getPause, TileSize, gravity , updateTimePause};