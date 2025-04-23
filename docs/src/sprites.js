import vec2 from "./vec2.js";
import {ctx} from "./canva.js";
import * as utils from "./utils.js";
class Sprite {
  constructor(src, size) {
    this.size = size;
    this.image = new Image(size.x, size.y); 
    this.image.onerror = () => {
        console.error(`Erro ao carregar imagem: ${src}`);
    };
    this.image.src = "https://raw.github.com/pessoa736/Super-Careca-Man/main/docs/" + src;
  }

  draw(pos,scale = vec2(1,1), angle = 0) {
    let sca = utils.getScreemScale()
    
    ctx.arc(0, 0, 5, 0, 2 * Math.PI); 
    ctx.translate(pos.x, pos.y)
    ctx.rotate((Math.PI*angle)/180)
    ctx.scale(sca.x*scale.x, sca.y*scale.y)

    ctx.drawImage(this.image, 
      0,0, this.size.x, this.size.y,
      0, 0, this.size.x*scale.x, this.size.y*scale.y
    );
    
  }
}

export default Sprite;