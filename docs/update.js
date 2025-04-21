import * as controle from "./src/controle.js";
import * as Particle from './src/particles.js';
import * as gamestate from './src/gamestate.js';
import * as plr from './src/class_player.js';
import * as cam from './src/camera.js';
import * as buttons from './src/button.js';
import * as vars from './src/variaveis de mundo.js';

var time = 0;

function resetTime() {
    time = 0;
}

function updategame(){
    if (vars.getPause()){
        if ((controle.getkeys()["Escape"] || controle.getkeys()['KeyP'])){
            vars.setPause(false)
            vars.updateTimePause()
        }
    }else{
        cam.setTarget(plr.getAllPlayers());
        cam.update()
        plr.update();
        vars.updateTimePause()
    }
    
}


function update() {
    controle.update();
    buttons.update();
    
    if (gamestate.get() == "game") {
        updategame();
    }else if (gamestate.get() == "menu") {
    
    } else if (gamestate.get() == "creditos") {
    
    } else if (gamestate.get() == "settings") {
    
    } else gamestate.setByName("menu");

    Particle.updateParticles();
    time = time + 1 ;
}


export { update, time, resetTime };
export default update;
