import vec2 from "./vec2.js"
import { ctx, canvas} from "./canva.js";
import { TileSize } from "./variaveis de mundo.js";

class Camera {
    constructor(pos = vec2()) {
        this.pos = pos;
        this.target;
        this.size = vec2(canvas.width, canvas.height)        
    }
    setTarget(target){
        this.target = target
    }
    update(){
        let t = 0.05
        let tx = this.target.x-this.size.x*2
        let ty = this.target.y-this.size.y*2

        tx = Math.max(tx, 0)
        tx = Math.min(tx, 240*136)
        ty = Math.min(ty, 15)

        this.pos.x = this.pos.x*(1-t)+tx*t
        this.pos.y = this.pos.y*(1-t)+ty*t
    }
    draw(){
        let scaX = 8*canvas.width/(240*TileSize)
        let scaY = 8*canvas.height/(136*TileSize)
        console.log(scaX, scaY)
        ctx.scale(scaX, scaY)
        ctx.translate(-this.pos.x, -this.pos.y)
    }
}

export default Camera;

console.log('modulo da classe da camera carregada');