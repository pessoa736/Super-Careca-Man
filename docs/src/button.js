import vec2 from "./vec2.js";
import * as controle from "./controle.js";
import { ctx } from "./canva.js";
import * as Utils from "./utils.js"

let buttons = [];
let countdown = 0

class Button {
    constructor(label = toString(buttons.length), onClick =  function(){}, size = vec2(1,1)) {
        this.pos = vec2();
        this.size = size;
        this.label = label;
        this.onClick = onClick;
    }
    
    draw(pos = this.pos, size=this.size) {
        this.size = size
        let sca = Utils.getScreemScale()
        ctx.save();
        let mousepos = controle.getmouse().pos
        if (this.hover(mousepos)) {
        }
        
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(pos.x, pos.y, this.size.x*sca.x , this.size.y*sca.y);
        
        ctx.fillStyle = "white";
        ctx.font = `${20*sca.x}px Comic Sans MS`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, pos.x + this.size.x*sca.x / 2, pos.y+ this.size.y*sca.y / 2);

        ctx.restore();
        this.pos = pos
    }

    checkClick() {
        let mouse = controle.getmouse()
        return this.hover(mouse.pos) && mouse.left; 
    }

    hover() {
        let sca = Utils.getScreemScale()
        let mousePos = controle.getmouse().pos;
        return mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + this.size.x*sca.x &&
               mousePos.y >= this.pos.y && mousePos.y <= this.pos.y + this.size.y*sca.y;
    }

    remove() {
        const index = buttons.indexOf(this);
        if (index > -1){
            buttons.splice(index, 1);
        }
    }
}

function add(label, onClick, pos, size) {
    const button = new Button(label, onClick, pos, size);
    buttons.push(button);
    return button.label
}

function GetButton(label){
    for (const b of buttons){
        if (label == b.label) return b;
    }
}


function update() {
    buttons.forEach(button => {
        if (button.hover() && button.checkClick() && countdown > 32) {
            button.onClick();
            countdown = 0
        }
    });
    countdown++
}

function removeAll() {
    buttons.forEach(button => {
        button.remove();
    });
    if (buttons.length > 0) {
        buttons = []
    }
}

export {add, GetButton, update, removeAll};

