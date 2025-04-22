
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


let main = document.querySelector('main');
main.style.justifyItems = "center"
main.style.alignItems = "center"
canvas.style.borderRadius = "10px"


main.appendChild(canvas);


function updateCanvas() {
    let aspect = 240/136;
    let hx = parseInt(window.innerHeight*aspect)*0.7
    let hy = parseInt(window.innerHeight)*0.7
    let wx = parseInt(window.innerWidth)*0.7
    let wy = parseInt(window.innerWidth/aspect)*0.7

    if (hx < wx) {
        main.style.width =  hx + "px"
    } else {
        main.style.width =  wx + "px"
    } 
    
    if (hy < wy) {
        main.style.height = hy + "px"
    } else {
        main.style.height = wy + "px"
    } 
    
    canvas.width = main.offsetWidth - 0.075*main.offsetWidth;
    canvas.height = main.offsetHeight - 0.15*main.offsetHeight;
}

export { canvas, ctx, updateCanvas};
console.log('Canvas carregado');
