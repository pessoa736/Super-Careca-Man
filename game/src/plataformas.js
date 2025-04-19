import vec2  from '/game/src/vec2.js';
import { canvas, ctx } from '/game/src/canva.js';
import { TileSize } from './variaveis de mundo.js';


class Platform {
    constructor(pos = vec2(0, 0), size = vec2(100, 20)) {
        this.pos = pos.mult(vec2(TileSize, TileSize));
        this.size = size.mult(vec2(TileSize, TileSize));
    }
}


const platforms = [
    new Platform(vec2(0, 25), vec2(30, 5)) ,
    new Platform(vec2(25, 15), vec2(3, 8)) ,
    new Platform(vec2(0, 260), vec2(80, 80)) ,
    new Platform(vec2(0, 180), vec2(80, 80)) ,
];

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
    ctx.fillStyle = '#27ae60';
    for (const plat of platforms) {
        ctx.fillRect(plat.pos.x, plat.pos.y, plat.size.x, plat.size.y);
    }
}

export {platforms, drawPlatforms, checkCollision};