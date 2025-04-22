
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


let main = document.querySelector('main');
main.style.justifyItems = "center"
main.style.alignItems = "center"
canvas.style.borderRadius = "8px"


main.appendChild(canvas);


function updateCanvas() {
    let aspect = 240/136;
    let hx = parseInt(window.innerHeight*aspect)
    let hy = parseInt(window.innerHeight)
    let wx = parseInt(window.innerWidth)
    let wy = parseInt(window.innerWidth/aspect)

    if (hx <= wx) {
        main.style.width =  hx + "px"
    } else {
        main.style.width =  wx + "px"
    } 
    
    if (hy <= wy) {
        main.style.height = hy + "px"
    } else {
        main.style.height = wy + "px"
    } 
    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;
}

export { canvas, ctx, updateCanvas};
console.log('Canvas carregado');
