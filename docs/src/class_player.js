import vec2 from "./vec2.js";
import { gravity, TileSize } from "./variaveis de mundo.js";
import { platforms, checkCollision } from "./plataformas.js";
import { keys } from "./controle.js";
import Sprite from "./sprites.js";
import {lerp, around, random} from "./utils.js";
import * as Particle from "./particles.js";


function normalize(n){
    return Math.abs(n) / n;
}


class Player {
    constructor(pos = vec2(0, 0), size = vec2(TileSize, TileSize*2), vel = vec2(0,0), speed = 8, jumpPower=7) {
        this.pos = pos;
        this.size = size;
        this.vel = vel,
        this.speed = speed;
        this.directionX = 1
        this.jumpPower = jumpPower || 10;
        this.onGround = false;
        this.alive = true;
        this.inputs = {
            left: false,
            right: false,
            jump: false,
        }
        this.sprites = {
            idle: [
                new Sprite("src/sprites/careca/careca_parado_1.png", this.size),
                new Sprite("src/sprites/careca/careca_parado_2.png", this.size),
            ],
            walk: [
                new Sprite("src/sprites/careca/careca_correndo_1.png", this.size),
                new Sprite("src/sprites/careca/careca_correndo_2.png", this.size),
                new Sprite("src/sprites/careca/careca_correndo_3.png", this.size),
                new Sprite("src/sprites/careca/careca_correndo_2.png", this.size),
            ],
            junping: [
                new Sprite("src/sprites/careca/careca_pulando_1.png", this.size),
                new Sprite("src/sprites/careca/careca_pulando_2.png", this.size),
            ],
        }
        this.sprites.junpingtime = 0;
        this.intialVars = this
    }
    reset() {}
    update(time){
        
        // controle
        this.inputs.left = keys['ArrowLeft'] || keys['KeyA']
        this.inputs.right = keys['ArrowRight'] || keys['KeyD']
        this.inputs.jump = keys['ArrowUp'] || keys['KeyW'] || keys['Space']

        if (this.inputs.left && !this.inputs.right) {
            this.vel.x =  -this.speed; 
            this.directionX = -1
        }
        else if (this.inputs.right && !this.inputs.left) {
            this.vel.x = this.speed; 
            this.directionX = 1
        } 
        else { 
            this.vel.x = lerp(around(this.vel.x, 0.01), 0, 0.2)
        }

        if ( this.inputs.jump && this.onGround) {
            this.vel.y = -this.jumpPower*(1/gravity);
            this.onGround = false;
        }

        this.vel.y += gravity;
        this.onGround = false;

        
        //colissão
        if (checkCollision(this.pos.add(vec2(this.vel.x, 0)), this.size)) {
            while (checkCollision(this.pos.add(vec2(Math.sign(this.vel.x), 0)))) {
                this.pos.x -=Math.sign(this.vel.x); 
            }
            this.vel.x = 0;
        }    

        if (checkCollision(this.pos.add(vec2(0, this.vel.y)), this.size)) {
            while (checkCollision(this.pos.add(vec2(0, Math.sign(this.vel.y))))) {
                this.pos.y -=Math.sign(this.vel.y); 
            }
            this.vel.y = 0;
            this.onGround = true;
            this.sprites.junpingtime = 0;
        }    
       
        // da update na possiçao do player
        this.pos = this.pos.add(this.vel);

        

        if (this.pos.y >= 15*TileSize) {
            this.alive = false;
        }

        if (!this.alive){
            this.reset()
        }
    }
    draw(ctx, time){
        let spritePosX = this.directionX*this.pos.x ;

        ctx.save();
        ctx.scale(this.directionX, 1);
       
        if(Math.abs(parseInt(this.vel.y)) != 0){
            let spriteTime2 = parseInt((this.sprites.junpingtime/(this.sprites.junpingtime+1))+0.4) % 2;
            this.sprites.junping[spriteTime2].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
            this.sprites.junpingtime++;
        } 
        else if (parseInt(Math.abs(this.vel.x))==0) {
            let spriteTime = parseInt(time/15) % 2;
            this.sprites.idle[spriteTime].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
        }
        else if (Math.abs(this.vel.x) > 0) {
            
        let spriteTime = parseInt(time/5) % 4;
            this.sprites.walk[spriteTime].draw(ctx, vec2(spritePosX, this.pos.y), vec2(this.directionX, 1));
        }
        ctx.restore();
        let isRunning = parseInt(Math.abs(this.vel.x)) > 0 && this.onGround && time % 4 == 0
        let isJumping = parseInt(Math.abs(this.vel.y)) != 0 && this.onGround
        if (isRunning) {
            for (let i = 0; i < 5; i++) {
                
                let pos = this.pos.add(
                    vec2(
                        this.size.x/2 - this.size.x*this.directionX/2, 
                        this.size.y
                    )
                )
    
                let vel = vec2(
                    random(-1, 1)-this.vel.x/4, 
                    random(-1,1)-this.vel.y
                )
    
                let size = random(9, 13)
    
                Particle.addParticle(
                    pos, 
                    vel, 
                    vec2(size, size),
                    "rgba(255, 255, 255, 0.5)", 
                    random(0.25, 0.75)
                )

            }
        } 
    }
}

console.log('classe de jogador carregada');

export default Player ;