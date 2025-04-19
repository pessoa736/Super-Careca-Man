import Player from '/game/src/class_player.js';
import vec2 from '/game/src/vec2.js';
import {platforms, drawPlatforms}  from '/game/src/plataformas.js';
import { canvas, ctx, resizeCanvas } from '/game/src/canva.js';
import { keys, update_keys } from '/game/src/controle.js';
import { gravity, TileSize } from '/game/src/variaveis de mundo.js';


var time = 0;

function limparTela() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


var plr = new Player();

function update() {
    update_keys();
    plr.update();

    time = time + 1 ;
}

function draw() {
    limparTela();
    drawPlatforms();
    plr.draw(time);
}


function loop() {
    resizeCanvas();
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
