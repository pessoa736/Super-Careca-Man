import vec2 from "./vec2.js";
import * as controle from "./controle.js";

let buttons = [];

class Button {
    constructor(label = toString(buttons.length), onClick =  function(){}, pos = vec2(), size = vec2()) {
        this.pos = pos;
        this.size = size;
        this.label = label;
        this.onClick = onClick;
    }
    
    draw(ctx) {
        ctx.save();
        let mousepos = controle.getmouse().pos
        if (this.hover(mousepos)) {
            ctx.scale(1.1, 1.05);
            ctx.translate(-this.size.x * 0.1, -this.size.y * 0.1);
        }
        
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        
        ctx.fillStyle = "white";
        ctx.font = "20px Comic Sans MS";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

        ctx.restore();
    }

    checkClick() {
        let mouse = controle.getmouse()
        return this.hover(mouse.pos) && mouse.left; 
    }

    hover() {
        let mousePos = controle.getmouse().pos;
        return mousePos.x >= this.pos.x && mousePos.x <= this.pos.x + this.size.x &&
               mousePos.y >= this.pos.y && mousePos.y <= this.pos.y + this.size.y;
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
}


function draw(ctx) {
    buttons.forEach(button => {
        button.draw(ctx);
    });
}

function update() {
    buttons.forEach(button => {
        if (button.hover() && button.checkClick()) {
            button.onClick();
        }
    });
}

function removeAll() {
    buttons.forEach(button => {
        button.remove();
    });
    if (buttons.length > 0) {
        buttons = []
    }
}

export {add, draw, update, removeAll};

