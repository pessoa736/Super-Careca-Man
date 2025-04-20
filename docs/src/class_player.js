import vec2 from "./vec2.js";
import { gravity, TileSize } from "./variaveis de mundo.js";
import { platforms, checkCollision } from "./plataformas.js";
import { canvas, ctx } from "./canva.js";
import { keys } from "./controle.js";

function around(n, int) {
    return parseInt(n / int) * int;
}

function sign(n) {
    let a = Math.abs(n);
    if (a == 0) return 0;
    return (a-1)/a;
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
                new Image(this.size.x, this.size.y),
                new Image(this.size.x, this.size.y),
            ],
            walk: [
                new Image(this.size.x, this.size.y),
                new Image(this.size.x, this.size.y),
            ],
            junping: [
                new Image(this.size.x, this.size.y),
                new Image(this.size.x, this.size.y),
            ],
        }
        this.sprites.idle[0].src = '/src/sprites/careca/careca_parado_1.png';
        this.sprites.idle[1].src = '/src/sprites/careca/careca_parado_2.png';
        this.sprites.walk[0].src = '/src/sprites/careca/careca_parado_1.png';
        this.sprites.walk[1].src = '/src/sprites/careca/careca_parado_2.png';
        this.sprites.junping[0].src = '/src/sprites/careca/careca_pulando_1.png';
        this.sprites.junping[1].src = '/src/sprites/careca/careca_pulando_2.png';
        this.sprites.junpingtime = 0;
    }
    update(){
        // controle
        this.vel.x = 0;
        let kl= keys['ArrowLeft'] || keys['KeyA']
        let kr = keys['ArrowRight'] || keys['KeyD']
        if (kl && !kr) {this.vel.x = -this.speed; this.directionX = -1} 
        if (kr && !kl) {this.vel.x = this.speed; this.directionX = 1}
        if (kr && kl) { this.vel.x = this.vel.x*(0.05);}

        if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && this.onGround) {
            this.vel.y = -this.jumpPower*(1/gravity);
            this.onGround = false;
        }

        this.vel.y += gravity;
        this.onGround = false;

        
        //colissão
        if (checkCollision(this.pos.add(vec2(this.vel.x, 0)), this.size)) {
            while (checkCollision(this.pos.add(vec2(sign(this.vel.x), 0)))) {
                this.pos.x +=sign(this.vel.x); 
            }
            this.vel.x = 0;
        }    

        if (checkCollision(this.pos.add(vec2(0, this.vel.y)), this.size)) {
            while (checkCollision(this.pos.add(vec2(0, sign(this.vel.y))))) {
                this.pos.y +=sign(this.vel.y); 
            }
            this.vel.y = 0;
            this.onGround = true;
            this.sprites.junpingtime = 0;
        }    
       
        // da update na possiçao do player
        this.pos = this.pos.add(this.vel);
    }
    draw(time){
        let spriteTime = parseInt(time/15) % 2;

        let spriteScaleX = this.vel.x < 0?  -(this.size.x) : this.size.x;
        let spritePosX = this.vel.x < 0?  -(this.pos.x) : this.pos.x ;
        ctx.save();
        
        ctx.scale(normalize(this.vel.x), 1);
       
        if(Math.abs(parseInt(this.vel.y-gravity))>0){
            ctx.drawImage(
                this.sprites.junping[parseInt((this.sprites.junpingtime/(this.sprites.junpingtime+1))+0.4)],      
                spritePosX, this.pos.y, spriteScaleX, this.size.y
            ); 
            this.sprites.junpingtime++;
        } 
        else if (Math.abs(this.vel.x) == 0) {
            ctx.drawImage(
                this.sprites.idle[spriteTime],      
                spritePosX, this.pos.y, spriteScaleX, this.size.y
            );
        }
        else if (Math.abs(this.vel.x) > 0) {
            ctx.drawImage(
                this.sprites.walk[spriteTime],      
                spritePosX, this.pos.y, spriteScaleX, this.size.y
            );
        }
        ctx.restore();

    }
}

console.log('classe de jogador carregada');

export default Player ;