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

  draw(ctx, pos) {
    ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y);
  }
}

export default Sprite;