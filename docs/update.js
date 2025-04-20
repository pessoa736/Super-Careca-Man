import { update_keys } from "./src/controle.js";

var time = 0;

function update(cam, plr) {
    update_keys();
    cam.setTarget(plr.pos)
    cam.update()
    plr.update();

    time = time + 1 ;
}


export { update, time };
export default update;
