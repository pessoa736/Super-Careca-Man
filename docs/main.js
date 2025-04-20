import Player from './src/class_player.js';
import Camera from './src/camera.js';
import draw from './draw.js';
import vec2 from './src/vec2.js';
import { canvas, ctx, updateCanvas } from './src/canva.js';
import { keys, update_keys } from './src/controle.js';
import { gravity, TileSize } from './src/variaveis de mundo.js';
import {update, time} from './update.js';


var plr = new Player();
var cam = new Camera();




function loop() {
    updateCanvas();
    update(cam, plr);
    draw(ctx, canvas, time, cam, plr);
    requestAnimationFrame(loop);
}

loop();
