import vec2 from "./vec2.js"
import { ctx, canvas} from "./canva.js";
import { TileSize } from "./variaveis de mundo.js";
import { random } from "./utils.js";
import * as utils from "./utils.js";

let cameras = []

class Camera {
    constructor(pos = vec2()) {
        this.pos = pos;
        this.target;
        this.size = vec2(canvas.width, canvas.height)        
    }
    setTarget(target = []) { 
        this.target = target
    }
    update(){
        let sca = utils.getScreemScale()
        this.size.x = 350*sca.x
        this.size.y = 300*sca.y
        
        if (!this.target) return;
        this.target.forEach( (target) => {
            if (!target) return;
            let t = 0.1
            let tx = target.pos.x-this.size.x/2 + target.vel.x*5
            let ty = target.pos.y-this.size.y/2 - target.vel.y*5

            tx = Math.max(Math.min(tx+random(-5,5), 30*8*32), 0)
            ty = Math.min(ty+random(-100,100)/100, 15)


            this.pos = this.pos.lerp(vec2(tx, ty), t)
        })
    }
    draw(ctx, canvas){
        let sca = utils.getScreemScale()
        ctx.scale(sca.x, sca.y)
        ctx.translate(-this.pos.x, -this.pos.y)
    }
    remove() {
        const index = cameras.indexOf(this);
        cameras.splice(index, 1);
    }
}

function add(pos = vec2()) {
    if (cameras.length > 0) {
        cameras[0].remove()
    }
    const camera = new Camera(pos);
    cameras.push(camera);
}

function setTarget( target){
    cameras[0].setTarget(target)
}

function update(){
    cameras.forEach(camera => {
        camera.update()
    });
}

function draw(ctx, canvas){
    cameras.forEach(camera => {
        camera.draw(ctx, canvas)
    });
}

function removeAll() {
    cameras.forEach(camera => {
        camera.remove()
    });
    if (cameras.length > 0) {
        cameras=[];
    }
}




export {add, setTarget, update, draw, removeAll};

console.log('modulo da classe da camera carregada');
