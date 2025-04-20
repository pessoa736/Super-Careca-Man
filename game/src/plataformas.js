import vec2  from '/game/src/vec2.js';
import { canvas, ctx } from '/game/src/canva.js';
import { TileSize } from './variaveis de mundo.js';


class Platform {
    constructor(pos = vec2(0, 0)) {
        this.pos = pos.mult(vec2(TileSize, TileSize));
        this.size = vec2(TileSize, TileSize);
    }
}

function plat(pos){
    return new Platform(pos)
}


const platforms = [
    plat(vec2(0, 25)),
    plat(vec2(25, 15)),
    plat(vec2(0, 260)),
    plat(vec2(0, 180)),
];


for (let i = 0; i<80; i++){
    let pos = vec2(i, 25)
    platforms.push(plat(pos))
}

function checkCollision(pos, size = vec2(TileSize, TileSize)) {
    for (const plat of platforms) {
        if (
            pos.x  < plat.pos.x + plat.size.x &&
            pos.x + size.x > plat.pos.x &&
            pos.y < plat.pos.y + plat.size.y &&
            pos.y + size.y > plat.pos.y
        ) {
            return true;
        }
    }
    return false;
}


function drawPlatforms(){
    ctx.save()
    ctx.fillStyle = '#27ae60';
    for (const plat of platforms) {
        ctx.fillRect(plat.pos.x, plat.pos.y, plat.size.x, plat.size.y);
    }
    ctx.restore()
}

export {platforms, drawPlatforms, checkCollision};