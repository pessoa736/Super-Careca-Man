import { update_keys } from "./src/controle.js";
import * as Particle from './src/particles.js';

var time = 0;

function update(cam, plr) {
    update_keys();
    cam.setTarget(plr.pos)
    cam.update()
    plr.update();
    Particle.updateParticles();

    time = time + 1 ;
}


export { update, time };
export default update;
