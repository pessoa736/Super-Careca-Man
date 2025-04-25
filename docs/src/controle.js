import { canvas } from "./canva.js";
import vec2 from "./vec2.js";

let keys = {};
let mouse = {left: false, middle: false, right: false, pos: vec2()};


window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);
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


//function que pega o touch feito pelo grok
function getTouchOrClickInfo(event) {
    let isTouch = false;
    let x = 0;
    let y = 0;

    if (event.type === 'touchstart') {
        isTouch = true;
        const touch = event.touches[0]; 
        x = touch.clientX;
        y = touch.clientY;
    } else if (event.type === 'click') {
        x = event.clientX;
        y = event.clientY;
    }

    return {
        isTouch: isTouch,
        x: x,
        y: y
    };
}

canvas.addEventListener('touchstart', function(event) {
    let touch = getTouchOrClickInfo(event)
    mouse.pos.x=touch.x
    mouse.pos.y=touch.y
    mouse.left = true
    console.log(mouse)
});

const getkeys = () => {return keys};
const getmouse = () => {return mouse};

export {getkeys, getmouse}