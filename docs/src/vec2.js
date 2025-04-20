
class vector2{
    constructor(x = 0, y = 0){
      this.x = parseInt(x)
      this.y = parseInt(y)
    }
    add(b){
      let a = this
      return new vector2(a.x + b.x, a.y + b.y)
    }
    sub(b){
      let a = this
      return new vector2(a.x - b.x, a.y - b.y)
    }
    mult(b){
      let a = this
      return new vector2(a.x * b.x, a.y * b.y)
    }
    div(b){
      let a = this
      return new vector2(a.x / b.x, a.y / b.y)
    }
    idiv(b){
      let a = this
      return new vector2(parseInt(a.x / b.x), parseInt(a.y / b.y))
    }
  }

function vec2(x, y){
    return new vector2(x, y)
}

console.log('modulo de Vectores 2D carregado')
export default vec2