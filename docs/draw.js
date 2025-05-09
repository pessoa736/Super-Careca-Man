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
import { getmouse } from './src/controle.js';

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
    let resume = buttons.GetButton("resume")
    let sca = utils.getScreemScale()
    cam.draw()
    drawPlatforms();
    plr.draw(ctx, time);
    Particle.drawParticles(ctx)
    if (Vars.getPause()){
        resume.draw(
            vec2(canvas.width*0.333, canvas.height*0.3),
        )
    }
}


let careca = new Sprite("careca/careca_apenas_rosto.png", vec2(32, 64))

function drawMenu() {
    let sca = utils.getScreemScale();
    
    let playButton = buttons.GetButton("Play")
    let settingsButton = buttons.GetButton("Settings")
    let CreditosButton = buttons.GetButton("Creditos")

    Particle.drawParticles(ctx)
    playButton.draw(vec2(canvas.width*0.05, canvas.height*0.2))
    settingsButton.draw(vec2(canvas.width*0.05, canvas.height*0.3))
    CreditosButton.draw(vec2(canvas.width*0.05, canvas.height*0.4))

    ctx.save()
    utils.drawText(
        "Super Careca Man",
        vec2( canvas.width*0.05, canvas.height*0.1),
        15,
        "white",
        vec2(3, 3),
        "start"
    )
    
    ctx.restore()
    careca.draw(vec2(canvas.width - 175*sca.x, 100*sca.y), vec2(5*sca.x, 5*sca.y), -45, 1)
    
    utils.drawRect(
        vec2(canvas.width*0.3, canvas.height*0.45), 
        vec2(canvas.width*0.7, canvas.height*0.45), 
        "rgba(0, 0, 0, 0.5)"
    )


    let frase = [
        "O Super Careca Man precisa chega na instituição de ",
        'ensino "Angulo Tecnicos" para dar aula de programação,',
        'mas o caminho é cheio de desafios e obstáculos',
        "Ajude-o a chegar lá!"
    ]
    for (let i = 0; i < frase.length; i++) {
        utils.drawText(
            frase[i],
            vec2(canvas.width*0.65, (canvas.height+ i*80*sca.y)*0.55),
            6,
            "white",
            vec2(3,3),
            "center"
        )
    }
    
    ctx.restore()
}

let DI = 0 
let discent1 = new Sprite("creditos/discente_1.png", vec2(900, 900))
let discent2 = new Sprite("creditos/discente_2.png", vec2(900,900))
let docent = new Sprite("creditos/docente.png", vec2(700,800)) 


function drawCreditos(){
    let backtoMenu = buttons.GetButton("back to menu")
    let sca = utils.getScreemScale()
    backtoMenu.draw(vec2(canvas.width*0.05, canvas.height*0.9), vec2(150,50))
    utils.drawRect(
        vec2(canvas.width*0.1, canvas.height*0.1),
        vec2(canvas.width*0.8, canvas.height*0.8),
        "rgba(26, 26, 28, 0.64)"
    )
    docent.draw(
        vec2(
            canvas.width*0.15, 
            canvas.height*0.625 
        ),
        vec2(
            0.15*sca.x, 
            0.15*sca.y 
        ),
        0,
        1
    )
    utils.drawText(
        "Docente: Clodoaldo Valetim",
        vec2(
            canvas.width*0.225,
            canvas.height*0.6
        ),
        13,
        "white",
        vec2(1,1),
        "center"
    )
    let discent =   (DI<60*20) ? discent1 : discent2
    let disScalex = (DI<60*20) ? 0.2 : 0.13
    let disScaley = (DI<60*20) ? 0.2 : 0.13
    DI++
    discent.draw(
        vec2(
            canvas.width*0.45, 
            canvas.height*0.625
        ),
        vec2(
            disScalex*sca.x, 
            disScaley*sca.y 
        ),
        0,
        1
    )

    utils.drawText(
        "Discente: Davi dos Santos",
        vec2(
            canvas.width*0.5,
            canvas.height*0.6
        ),
        13,
        "white",
        vec2(1,1),
        "center"
    )
    let frase = [
        'Davi dos Santos - prograamação, game designer, "arte"',
        "",
        "Ferramentas utilizadas: css, html e javascript.",
        "",
        'Desenvolvido como parte de uma atividade complementar para HTML, CSS e JAVASCRIPT',
        'no curso Tecnico de Imformatica do Grau Tecnico - Zona Norte Natal',
        ""
    ]
    for (let i = 0; i < frase.length; i++) {
        utils.drawText(
            frase[i],
            vec2(canvas.width*0.125, (canvas.height+ i*100*sca.y)*0.15),
            12,
            "white",
            vec2(1,1),
            "start"
        )
    }
}


function background(){ 
    if (gamestate.get() == "menu"){
        if (Particle.particles.length <=150){
            Particle.addParticle(
                vec2(
                    utils.random(0, canvas.width),
                    utils.random(0, canvas.width)
                ).around(Vars.TileSize).around(Vars.TileSize),
                vec2(
                    -utils.random(-500, 500)/1000,
                    utils.random(-100, 100)/200
                ),
                vec2(
                    utils.random(4, 8),
                    utils.random(4, 8)
                ),
                "rgba(90, 90, 90, 0.66)",
                utils.random(25, 50)/10
            )
        }
    }
    
}

function UI() {
    ctx.save()
    ctx.restore()
}


function foreground() {
    ctx.save()

    if (gamestate.get() == "game") {
        drawgame()
    } else if (gamestate.get() == "menu") {
        drawMenu()
    } else if (gamestate.get() == "creditos") {
        drawCreditos()
    } else if (gamestate.get() == "settings") {
        drawSettings()
    }

    
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