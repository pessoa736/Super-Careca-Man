import vec2 from "./vec2.js";

class Sprite {
  constructor(src, size) {
    this.size = size;
    this.image = new Image(size.x, size.y); 
    this.image.onerror = () => {
        console.error(`Erro ao carregar imagem: ${src}`);
    };
    this.image.src = "https://raw.github.com/pessoa736/Super-Careca-Man/main/docs/" + src;
  }

  draw(ctx, pos,scale = vec2(1,1)) {
    ctx.drawImage(this.image, 
      0,0, this.size.x, this.size.y,
      pos.x, pos.y, this.size.x*scale.x, this.size.y*scale.y
    );
    
    console.log(scale.mult(this.size))
  }
}

export default Sprite;