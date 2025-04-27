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
            map[parseInt(x/TileSize)] = []
            for (let y = this.pos.y; y<=finaly; y+=TileSize){
                let DImag = tilesSpr[4]
                
                let Dup = y==1 && x>0 && x<finalx
                let Ddown = y+TileSize-1==finaly && x>0 && x<finalx
                let Dright = x==1 && y>0 && y<finaly
                let Dleft = x+TileSize-1==finalx && y>0 && y<finaly

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
                map[parseInt(x/TileSize)][parseInt(y/TileSize)]=DImag
            }
        }
    }
    draw(){
    }
}


const platforms = [];

function plat(pos, size = vec2(1, 1)) {
    let p = new Platform(pos, size)
    //p.init()
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


function drawPlatforms(){
    ctx.save()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (const plat of platforms) {
        plat.draw();
        ctx.fillRect(plat.pos.x, plat.pos.y+10, plat.size.x-10, plat.size.y-10)
        ctx.fillRect(plat.pos.x, plat.pos.y+15, plat.size.x-15, plat.size.y-15);
        ctx.fillRect(plat.pos.x, plat.pos.y+20, plat.size.x-20, plat.size.y-20);
        ctx.fillRect(plat.pos.x, plat.pos.y+40, plat.size.x-40, plat.size.y-40);
    }
    
    let cam = getCameraPos()
    let campos = campos.idiv(TileSize, TileSize)
    let tela = vec2(canvas.width, canvas.height).idiv(vec2(TileSize, TileSize))
    console.log(tela)
    for(let x = 0; x<+tela.x; x++){
        for(let y = 0; y<tela.y; y++){
            let DImag = map[x][y]

            if (DImag != undefined || DImag != null){
                DImag.draw(
                    vec2(x*TileSize, y*TileSize),
                    vec2(1, 1),
                    0,
                    1
                )
            }
        }
    }
    ctx.restore()
}

export {platforms, drawPlatforms, checkCollision, plat};