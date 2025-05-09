import draw from './draw.js';
import init from './init.js';
import { canvas, ctx, updateCanvas } from './src/canva.js';
import {update} from './update.js';


let timeInit = 0


function loop() {
    if (timeInit == 0) { init(); timeInit++}
    updateCanvas();
    update();
    draw(ctx, canvas);
    requestAnimationFrame(loop);
}

loop();
