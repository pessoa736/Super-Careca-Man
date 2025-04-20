import { canvas } from './src/canva.js';
import {platforms, drawPlatforms}  from './src/plataformas.js';

function limparTela(ctx, canvas) {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}


function vinheta(ctx, canvas) {
    ctx.save()
    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, Math.sqrt(canvas.height*canvas.width)*0.1,        // centro interno
        canvas.width/2, canvas.height/2, Math.sqrt(canvas.height*canvas.width)*0.8      // centro externo
    );
    gradient.addColorStop(0.5, "rgba(0, 32, 30, 0.05)");
    gradient.addColorStop(1, "rgba(5, 12, 0, 0.87)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore()
}

function background(){
}

function foreground(ctx, canvas, time, cam, plr) {
    ctx.save()

    cam.draw(ctx, canvas)
    drawPlatforms();
    plr.draw(ctx, time);
    
    ctx.restore()
}

function overlay(ctx, canvas){
    ctx.save()
    vinheta(ctx, canvas)
    ctx.restore()
}


function draw(ctx, canvas, time, cam, plr) {
    limparTela(ctx, canvas);
    
    ctx.save()
    background()
    foreground(ctx, canvas, time, cam, plr)
    ctx.restore()
    
    overlay(ctx, canvas)
}
export default draw;