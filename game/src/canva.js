
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth*0.8;
canvas.height = window.innerHeight*0.8;
canvas.style.position = 'fixed';

let main = document.querySelector('main');
main.appendChild(canvas);


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

export { canvas, ctx, resizeCanvas};
console.log('Canvas carregado');