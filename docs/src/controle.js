import { canvas } from "./canva.js";
import vec2 from "./vec2.js";

let keys = {};
let mouse = {left: false, middle: false, right: false, pos: vec2()};

function Keys() {
    window.addEventListener('keydown', e => keys[e.code] = true);
    window.addEventListener('keyup', e => keys[e.code] = false);
}


function Mouse () {
    window.addEventListener('mousedown', function(e) {
        switch (e.button) {
            case 0:
                mouse.left = true;
                break;
            case 1:
                mouse.middle = true;
                break;
            case 2:
                mouse.right = true;
                break;
        }
    });

    window.addEventListener('mouseup', function(e) {
        switch (e.button) {
            case 0:
                mouse.left = false;
                break;
            case 1:
                mouse.middle = false;
                break;
            case 2:
                mouse.right = false;
                break;
        }
    });

    canvas.addEventListener('mousemove', function(e) {
        let rect = canvas.getBoundingClientRect();
        mouse.pos = vec2(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    });
}

function update(){
    Keys();
    Mouse();
}

const getkeys = () => {return keys};
const getmouse = () => {return mouse};

export {update, getkeys, getmouse}