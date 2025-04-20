import Player from '/src/class_player.js';
import Camera from '/src/camera.js';
import vec2 from '/src/vec2.js';
import {platforms, drawPlatforms}  from '/src/plataformas.js';
import { canvas, ctx, updateCanvas } from '/src/canva.js';
import { keys, update_keys } from '/src/controle.js';
import { gravity, TileSize } from '/src/variaveis de mundo.js';


var time = 0;

function limparTela() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


var plr = new Player();
var cam = new Camera();

function update() {
    update_keys();
    cam.setTarget(plr.pos)
    cam.update()
    plr.update();

    time = time + 1 ;
}

function vinheta(){
    ctx.save()
    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 250,        // centro interno
        canvas.width/2, canvas.height/2, Math.sqrt(canvas.height*canvas.width)*0.8      // centro externo
    );
    gradient.addColorStop(0.5, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore()
}

function draw() {
    limparTela()
    vinheta()
    
    cam.draw()
    drawPlatforms();
    plr.draw(time);
}


function loop() {
    updateCanvas();
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
