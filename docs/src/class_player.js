import vec2 from "./vec2.js";
import { gravity, TileSize, setPause, getPause} from "./variaveis de mundo.js";
import { platforms, checkCollision } from "./plataformas.js";
import * as controle from "./controle.js";
import Sprite from "./sprites.js";
import {lerp, around, random} from "./utils.js";
import * as Particle from "./particles.js";
import { time } from "../update.js";
import init from "../init.js";


function normalize(n){
    return Math.abs(n) / n;
}

let players = [];

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
    update(){
        let keys = controle.getkeys();

        // controle
        this.inputs.left = keys['ArrowLeft'] || keys['KeyA']
        this.inputs.right = keys['ArrowRight'] || keys['KeyD']
        this.inputs.jump = keys['ArrowUp'] || keys['KeyW'] || keys['Space']
        this.inputs.esc = keys["Escape"] || keys['KeyP']
        
        if (this.inputs.esc) {
            setPause(true)
        }
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
            if (this.vel.y >= 0) {
                this.onGround = true;
            }
            this.vel.y = 0;
            this.sprites.junpingtime = 0;
        }    
       
        // da update na possiçao do player
        this.pos = this.pos.add(this.vel);

        

        if (this.pos.y >= 15*TileSize) {
            this.alive = false;
        }

        if (!this.alive){
            init()
            this.remove();
        }
    }
    draw(ctx, Time){
        let time = getPause() ? 0 : Time
        ctx.save();
       
        if(Math.abs(parseInt(this.vel.y)) != 0){
            let spriteTime2 = parseInt((this.sprites.junpingtime/(this.sprites.junpingtime+1))+0.4) % 2;
            this.sprites.junping[spriteTime2].draw(
                this.pos, 
                vec2(1, 1),
                0,this.directionX
            );
            this.sprites.junpingtime++;
        } 
        else if (parseInt(Math.abs(this.vel.x))==0) {
            let spriteTime = parseInt(time/15) % 2;
            this.sprites.idle[spriteTime].draw(
                this.pos, 
                vec2(1,1),
                0,this.directionX
            );
        }
        else if (Math.abs(this.vel.x) > 0) {
            
        let spriteTime = parseInt(time/5) % 4;
            this.sprites.walk[spriteTime].draw(
                this.pos, 
                vec2(1, 1),
                0,this.directionX
            );
        }
        ctx.restore();
        let isRunning = parseInt(Math.abs(this.vel.x)) > 0 && this.onGround && time % 6 == 0
        let isJumping = this.inputs.jump && this.onGround
        if (isRunning || isJumping) {
            for (let i = 0; i < random(5, 10); i++) {
                
                let pos = this.pos.add(
                    vec2(
                        this.size.x/2 - this.size.x*this.directionX/2 + random(-8, 8),
                        this.size.y + random(-8, 8)
                    )
                )
    
                let vel = vec2(
                    random(-100, 100)/100-this.vel.x/4, 
                    random(-50,100)/100-this.vel.y
                )
    
                let size = random(9, 13)
    
                Particle.addParticle(
                    pos, 
                    vel, 
                    vec2(size, size),
                    "rgba(191, 165, 121, 0.69)", 
                    random(1, 5)/5
                )

            }
        } 
    }
    remove(){
        const index = players.indexOf(this);
        if (index === -1) {
            console.error("Jogador não encontrado para remoção:", this);
            return;
        }
        players.splice(index, 1);
    }
}

function add(pos, size, vel, speed, jumpPower){
    let player = new Player(pos, size, vel, speed, jumpPower);
    players.push(player);
    console.log("adicionando jogador", player, players.length);
}

function update(time){
    players.forEach(player => {
        player.update(time);
    })
}

function draw(ctx, time){
    players.forEach(player => {
        player.draw(ctx, time);
    })
}

function getPlayer(id){
    if (id < 0 || id >= players.length) {
        console.error("ID do jogador inválido:", id);
        return null;
    }
    return players[id];
}
function getAllPlayers(){
    return players;
}

function removeAll(){
    players.forEach(player => {
        player.remove()
    })
    if (players.length > 0) {
        players = []
    }
}

console.log('classe de jogador carregada');

export {add, update, draw, getPlayer, getAllPlayers, removeAll} ;