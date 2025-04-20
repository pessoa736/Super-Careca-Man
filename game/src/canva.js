
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


let main = document.querySelector('main');


main.appendChild(canvas);


function updateCanvas() {
    main.style.width = parseInt(window.innerWidth)*0.8 + "px"
    main.style.height =parseInt(window.innerHeight)*0.8 + "px"
    canvas.width = main.offsetWidth*0.8;
    canvas.height = main.offsetHeight*0.8;
}

export { canvas, ctx, updateCanvas};
console.log('Canvas carregado');