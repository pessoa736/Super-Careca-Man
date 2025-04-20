import Player from './src/class_player.js';
import Camera from './src/camera.js';
import draw from './draw.js';
import { canvas, ctx, updateCanvas } from './src/canva.js';
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
