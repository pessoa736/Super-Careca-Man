import vec2  from './vec2.js';
import { canvas, ctx } from './canva.js';
import { TileSize } from './variaveis de mundo.js';
import {around} from './utils.js';

class Platform {
    constructor(pos = vec2(0, 0), size = vec2(1, 1)) {
        this.pos = pos.mult(vec2(TileSize, TileSize)).around(TileSize);
        this.size = size.mult(vec2(TileSize, TileSize)).around(TileSize);
    }
}


const platforms = [];

function plat(pos, size = vec2(1, 1)) {
    
    platforms.push(new Platform(pos, size))
}


function checkCollision(pos, size = vec2(TileSize, TileSize)) {
    for (const plat of platforms) {
        if (
            pos.x  <= plat.pos.x + plat.size.x &&
            pos.x + size.x >= plat.pos.x &&
            pos.y <= plat.pos.y + plat.size.y &&
            pos.y + size.y >= plat.pos.y
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

export {platforms, drawPlatforms, checkCollision, plat};