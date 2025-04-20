import vec2 from "./vec2.js"
import { ctx, canvas} from "./canva.js";

class Camera {
    constructor(pos = vec2()) {
        this.pos = pos;
        this.target;
        this.size = vec2(canvas.width, canvas.height)        
    }
    setTarget(target){
        this.target = target
        console.log(target)
    }
    update(){
        let t = 0.05
        let tx = this.target.x-this.size.x*2
        let ty = this.target.y-this.size.y*2
        this.pos.x = this.pos.x*(1-t)+tx*t
        this.pos.y = this.pos.y*(1-t)+ty*t
        this.pos.x - Math.min(-this.pos.x, 0)
        this.pos.y - Math.min(-this.pos.y, 0)
    }
    draw(){
        let sca = 0.75
        ctx.scale(sca, sca)
        ctx.translate(-this.pos.x, -this.pos.y)
    }
}

export default Camera;

console.log('modulo da classe da camera carregada');