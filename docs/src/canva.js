
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');


let main = document.querySelector('main');
main.style.justifyItems = "center"
main.style.alignItems = "center"
canvas.style.borderRadius = "10px"


main.appendChild(canvas);


function updateCanvas() {
    let aspect = 240/136;
        
    main.style.width = parseInt(window.innerHeight*aspect)*0.7 + "px"
    main.style.height =parseInt(window.innerHeight)*0.7 + "px"
    canvas.width = main.offsetWidth - 0.075*main.offsetWidth;
    canvas.height = main.offsetHeight - 0.15*main.offsetHeight;
}

export { canvas, ctx, updateCanvas};
console.log('Canvas carregado');
