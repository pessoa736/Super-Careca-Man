import vec2 from "./vec2.js";
import { canvas } from "./canva.js";
import { TileSize } from "./variaveis de mundo.js";
import { ctx } from "./canva.js";


export function lerp(a, b, t) {
    return a*(1-t) + b*t;
}


export function normalize(n){
    return Math.abs(n) / n;
}

export function normalizeVec2(v2 = vec2()){
    let N = Math.sqrt( v2.x**2 + v2.y**2)

    return vec2(v2.x / N, v2.y / N)
}


export function around(n, int) {
    return parseInt(n / int) * int;
}

export function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getScreemScale(){
    
    let scaX = 8*canvas.width/(240*TileSize)
    let scaY = 8*canvas.height/(136*TileSize)
    return vec2(scaX, scaY)
}

export function drawRect (pos = vec2(0, 0), size = vec2(0, 0), color = "white") {
    let sca = getScreemScale()
    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.fillStyle = color
    ctx.fillRect(0, 0, size.x, size.y);
    ctx.restore()
}

export function drawText (text, pos = vec2(0, 0), size = 24, color = "white",scale = vec2(1, 1), textAlign = "start", justify = "middle") {
    ctx.save()
    let sca = getScreemScale()
    ctx.translate(pos.x, pos.y)
    ctx.scale(sca.x*scale.x, sca.x*scale.y)
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.textBaseline = justify
    ctx.font = `${size}pt Comic Sans MS`
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
