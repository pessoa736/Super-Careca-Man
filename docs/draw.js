import {drawPlatforms}  from './src/plataformas.js';
import  *  as Particle from './src/particles.js';
import * as gamestate from './src/gamestate.js';
import * as buttons from './src/button.js';
import * as cam from './src/camera.js';
import * as plr from './src/class_player.js';
import { time } from './update.js';
import * as Vars from './src/variaveis de mundo.js';
import { ctx, canvas } from './src/canva.js';
import Sprite from './src/sprites.js';
import vec2 from './src/vec2.js';
import * as utils from './src/utils.js';

function limparTela() {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}


function vinheta() {
    ctx.save()
    let effect = (Math.PI*2 - Math.abs( Math.sin(time/80)))/(Math.PI*2)
    let rad = Math.sqrt(canvas.height*canvas.width)
    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, rad*effect*0.1,        // centro interno
        canvas.width/2, canvas.height/2, rad*effect*0.9     // centro externo
    );
    gradient.addColorStop(0.5, "rgba(0, 32, 30, 0.05)");
    gradient.addColorStop(1, "rgba(5, 12, 0, 0.87)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore()
}


function drawgame() {
    cam.draw(ctx, canvas)
    drawPlatforms();
    plr.draw(ctx, time);
}


let careca = new Sprite("src/sprites/careca/careca_apenas_rosto.png", vec2(32, 64))

function drawMenu() {
    ctx.save()
    ctx.fillStyle = "white"
    ctx.font = "24pt Comic Sans MS"
    ctx.textAlign = "start"
    ctx.textBaseline = "middle"
    ctx.fillText("Super Careca Man", canvas.width*0.05, canvas.height*0.1)
    ctx.restore()

    ctx.save()
    
    careca.draw(vec2(canvas.width*0.7, canvas.height*0.5), vec2(3, 3), -45)
    console.log(careca)
    ctx.restore()

    ctx.save()
    
    utils.drawRect(
        vec2(canvas.width*0.5, canvas.height*0.5), 
        vec2(canvas.width*0.5, canvas.height*0.5), 
        "rgba(0, 0, 0, 0.5)"
    )
    utils.drawText(
        "O Super Careca Man precisa chega na instituição de ",
        vec2(canvas.width*0.5, canvas.height*0.55),
        6,
        "white",
        vec2(4,4),
        "start",
        "right"
    )
    utils.drawText(
        'ensino "Angulo Tecnicos" para dar aula de programação,',
        vec2(canvas.width*0.5, canvas.height*0.6),
        6,
        "white",
        vec2(4,4),
        "start",
        "right"
    )
    utils.drawText(
        'mas o caminho é cheio de desafios e obstáculos',
        vec2(canvas.width*0.5, canvas.height*0.65),
        6,
        "white",
        vec2(4,4),
        "start",
        "right"
    )
    utils.drawText(
        "Ajude-o a chegar lá!",
        vec2(canvas.width*0.5, canvas.height*0.7),
        6,
        "white",
        vec2(4,4),
        "start",
        "right"
    )
    
    ctx.restore()


}

function background(){

}

function UI() {
    ctx.save()
    buttons.draw(ctx)
    ctx.restore()
}


function foreground() {
    ctx.save()

    if (gamestate.get() == "game") {
        drawgame()
    } else if (gamestate.get() == "menu") {
        drawMenu()
    } else if (gamestate.get() == "creditos") {
      
    } else if (gamestate.get() == "settings") {
      
    }

    Particle.drawParticles(ctx)
    
    ctx.restore()
}

function overlay(){
    ctx.save()
    vinheta()
    if (Vars.getPause()){
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "white"
        ctx.font = "50px Comic Sans MS"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("PAUSE", canvas.width/2, canvas.height/2)
    }
    ctx.restore()
}



function draw() {
    limparTela();
    
    ctx.save()
    background()
    foreground()
    ctx.restore()
    
    overlay()
    UI()
}
export default draw;