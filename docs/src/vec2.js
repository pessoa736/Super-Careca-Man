
class vector2{
    constructor(x = 0, y = 0){
      this.x = x
      this.y = y
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
    lerp(b, t){
      let a = this
      return new vector2(a.x*(1-t) + b.x*t, a.y*(1-t) + b.y*t)
    }
    around(t = 0.01){
      let a = this
      return new vector2(parseInt(a.x/t)*t, parseInt(a.y/t)*t)
    }
  }

function vec2(x, y){
    return new vector2(x, y)
}

console.log('modulo de Vectores 2D carregado')
export default vec2