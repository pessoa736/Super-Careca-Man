import vec2  from './vec2.js';
import { canvas, ctx } from './canva.js';
import { TileSize } from './variaveis de mundo.js';
import {around} from './utils.js';
import Sprite from './sprites.js';
import { getCameraPos } from './camera.js';

let tilesImag = [
    "tiles/1.png",
    "tiles/2.png",
    "tiles/3.png",
    "tiles/4.png",
    "tiles/5.png",
    "tiles/6.png",
    "tiles/7.png",
    "tiles/8.png",
    "tiles/9.png",
]

let tilesSpr = []
let map = []

let i = 0
for (const imag of tilesImag){
    tilesSpr.push(
        new Sprite(
            imag, 
            vec2(
                TileSize, 
                TileSize
            )
        )
    )
    console.log(tilesSpr[i])
    i=i+1
}
class Platform {
    constructor(pos = vec2(0, 0), size = vec2(1, 1)) {
        this.pos = pos.mult(vec2(TileSize, TileSize)).around(TileSize);
        this.size = size.mult(vec2(TileSize, TileSize)).around(TileSize);
    }
    init(){
        let initx = around(this.pos.x, TileSize)
        let inity = around(this.pos.y, TileSize)
        let finalx = around((this.size.add(this.pos)).x, TileSize)
        let finaly = around((this.size.add(this.pos)).y, TileSize)

        for(let x = this.pos.x; x<finalx; x+=TileSize){
            const xi = parseInt(x / TileSize);
            if (!map[xi]) map[xi] = [];
            for (let y = this.pos.y; y<=finaly-1; y+=TileSize){
                const yi = parseInt(y / TileSize);
                let DImag
                
                console.log(x, y)
                
                let Dup = Math.abs(y)===parseInt(Math.abs(this.pos.y)) && Math.abs(x)>0 && x<finalx
                
                let Ddown = Math.abs(y+TileSize)===parseInt(Math.abs(finaly)) && Math.abs(x)>0 && x<finalx

                let Dright = Math.abs(x)===parseInt(Math.abs(this.pos.x)) && Math.abs(y)>0 && y<finaly

                let Dleft = Math.abs(x+TileSize)===parseInt(Math.abs(finalx)) && Math.abs(y)>0 && y<finaly

                if (Dup && !Dleft && !Dright){
                    DImag = tilesSpr[0]
                }else if (Ddown && !Dleft && !Dright){
                    DImag = tilesSpr[2]
                }else if (Dright && !Dup && !Ddown){
                    DImag = tilesSpr[3]
                }else if (Dleft && !Dup && !Ddown){
                    DImag = tilesSpr[1]
                }else if(Dup && Dright){
                    DImag = tilesSpr[5]
                }else if(Dup && Dleft){
                    DImag = tilesSpr[6]
                }else if(Ddown && Dright){
                    DImag = tilesSpr[7]
                }else if(Ddown && Dleft){
                    DImag = tilesSpr[8]
                }else if (!Dup && !Ddown && !Dleft && !Dright){
                    DImag = tilesSpr[4]
                }

                DImag.pos = this.pos
                map[xi][yi]=DImag
            }
        }
    }
}


const platforms = [];

function plat(pos, size = vec2(1, 1)) {
    let p = new Platform(pos, size)
    p.init()
    platforms.push(p)
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

function drawShadows(pos = vec2(), size = vec2(), alpha = 0.1){
    ctx.save()

    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`; 
    ctx.fillRect(pos.x, pos.y, size.x, size.y)
    
    ctx.restore()
}


function drawPlatforms(){
    ctx.save()
    const cam = getCameraPos();
    const minX = parseInt(cam.x / TileSize)-1;
    const maxX = minX + 30;
    const minY = parseInt(cam.y / TileSize) - 1;
    const maxY = parseInt(cam.y / TileSize) + 17;

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {

            if (map[x] && map[x][y]) {
                    map[x][y].draw(
                    vec2(x * TileSize, y * TileSize),
                    vec2(1, 1),
                    0,
                    1
                );
            }
        }
    }

    for (const plat of platforms) {
        drawShadows(vec2(plat.pos.x, plat.pos.y+10), vec2(plat.size.x-10, plat.size.y-10))
        drawShadows(vec2(plat.pos.x, plat.pos.y+15), vec2(plat.size.x-15, plat.size.y-15), 0.1)
        drawShadows(vec2(plat.pos.x, plat.pos.y+20), vec2(plat.size.x-20, plat.size.y-20), 0.1)
        drawShadows(vec2(plat.pos.x, plat.pos.y+25), vec2(plat.size.x-25, plat.size.y-25), 0.2)
    }
    
    ctx.restore()
    console.log(platforms.length)

}


plat(vec2(0, 15), vec2(20, 3)) 
plat(vec2(24, 13), vec2(5, 5))
plat(vec2(29, 12), vec2(3, 6))
plat(vec2(37, 8), vec2(3, 10))
plat(vec2(43, 5), vec2(3, 13))
plat(vec2(46, 8), vec2(2, 15))
plat(vec2(-3, -100), vec2(3, 115))
plat(vec2(5, -109), vec2(15, 115))
plat(vec2(26, 4), vec2(4, 4)) 
plat(vec2(20, -1), vec2(2, 2)) 
plat(vec2(20, 1), vec2(6, 6)) 
plat(vec2(28, -7), vec2(9, 6)) 
plat(vec2(54, 12), vec2(3, 8))
plat(vec2(69, 9), vec2(3, 6)) 
plat(vec2(72, 5), vec2(6, 13)) 
plat(vec2(57, 15), vec2(20, 6)) 

export {platforms, drawPlatforms, checkCollision, plat};