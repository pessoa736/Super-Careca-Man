import vec2 from "./vec2.js";
import {ctx} from "./canva.js";
import * as utils from "./utils.js";
class Sprite {
  constructor(src, size = vec2(32, 32)) {
    this.size = size;
    this.image = new Image(size.x, size.y); 
    this.image.onerror = () => {
        console.error(`Erro ao carregar imagem: ${src}`);
    };
    this.image.src = "https://raw.github.com/pessoa736/Super-Careca-Man/main/docs/src/sprites/" + src;
  }

  draw(pos = vec2(), scale = vec2(1,1), angle = 0, directionX = 1) {
    let sca = utils.getScreemScale();
    let posx = directionX > 0 ? pos.x : pos.x + this.size.x*scale.x;
    ctx.save();
    ctx.translate(posx, pos.y);
    ctx.rotate((Math.PI*angle)/180);
    ctx.scale(directionX, 1);
    
    ctx.drawImage(this.image, 
      0, 0, this.size.x, this.size.y,         
      0, 0,          
      this.size.x*scale.x, this.size.y*scale.y              
    );
    ctx.restore();
  }
}

export default Sprite;