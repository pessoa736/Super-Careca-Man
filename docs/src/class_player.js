import vec2 from "./vec2.js";
import { gravity, TileSize } from "./variaveis de mundo.js";
import { platforms, checkCollision } from "./plataformas.js";
import { canvas, ctx } from "./canva.js";
import { keys } from "./controle.js";
import Sprite from "./sprites.js";
import {lerp} from "./utils.js";


function around(n, int) {
    return parseInt(n / int) * int;
}

function normalize(n){
    return Math.abs(n) / n;
}


class Player {
    constructor(pos = vec2(0, 0), size = vec2(TileSize, TileSize*2), vel = vec2(0,0), speed = 10, jumpPower=7) {
        this.pos = pos;
        this.size = size;
        this.color = '#3498db';
        this.vel = vel,
        this.speed = speed;
        this.directionX = 1
        this.jumpPower = jumpPower || 10;
        this.onGround = false;
        this.sprites = {
            idle: [
                new Sprite("src/sprites/careca/careca_parado_1.png", this.size),
                new Sprite("src/sprites/careca/careca_parado_2.png", this.size),
            ],
            walk: [
                new Sprite("src/sprites/careca/careca_parado_1.png", this.size),
                new Sprite("src/sprites/careca/careca_parado_2.png", this.size),
            ],
            junping: [
                new Sprite("src/sprites/careca/careca_pulando_1.png", this.size),
                new Sprite("src/sprites/careca/careca_pulando_2.png", this.size),
            ],
        }
        this.sprites.junpingtime = 0;
    }
    update(){
        // controle
        
        let kl= keys['ArrowLeft'] || keys['KeyA']
        let kr = keys['ArrowRight'] || keys['KeyD']

        if (kl && !kr) {
            this.vel.x =  -this.speed; 
            this.directionX = -1
        }else if (kr && !kl) {
            this.vel.x = this.speed; 
            this.directionX = 1
        } else { 
            this.vel.x = lerp(around(this.vel.x, 0.01), 0, 0.1)
        }

        if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && this.onGround) {
            this.vel.y = -this.jumpPower*(1/gravity);
            this.onGround = false;
        }

        this.vel.y += gravity;
        this.onGround = false;

        
        //colissão
        if (checkCollision(this.pos.add(vec2(this.vel.x, 0)), this.size)) {
            while (checkCollision(this.pos.add(vec2(Math.sign(this.vel.x), 0)))) {
                this.pos.x +=Math.sign(this.vel.x); 
            }
            this.vel.x = 0;
        }    

        if (checkCollision(this.pos.add(vec2(0, this.vel.y)), this.size)) {
            while (checkCollision(this.pos.add(vec2(0, Math.sign(this.vel.y))))) {
                this.pos.y +=Math.sign(this.vel.y); 
            }
            this.vel.y = 0;
            this.onGround = true;
            this.sprites.junpingtime = 0;
        }    
       
        // da update na possiçao do player
        this.pos = this.pos.add(this.vel);
    }
    draw(ctx, time){
        let spriteTime = parseInt(time/15) % 2;
        let spriteTime2 = parseInt((this.sprites.junpingtime/(this.sprites.junpingtime+1))+0.4) % 2;
        
        let spritePosX = this.directionX*this.pos.x ;

        ctx.save();
        
        ctx.scale(this.directionX, 1);
       
        if(Math.abs(parseInt(this.vel.y)) != 0){
            this.sprites.junping[spriteTime2].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
            this.sprites.junpingtime++;
        } 
        else if (parseInt(Math.abs(this.vel.x))==0) {
            this.sprites.idle[spriteTime].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
        }
        else if (Math.abs(this.vel.x) > 0) {
            this.sprites.walk[spriteTime].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
        }
        ctx.restore();

    }
}

console.log('classe de jogador carregada');

export default Player ;