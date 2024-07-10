const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

function startDraw(e) {
    console.log('mouse click')
    isDrawing = true;
    ctx.beginPath(); // create  new position to start drawing  
    ctx.moveTo(e.offsetX, e.offsetY); // Start a new path at the mouse position
    ctx.lineWidth = 4;
}

function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to x and y axis
    ctx.stroke(); // Filling the line with color
}

function stopDraw() {
    isDrawing = false;
    ctx.closePath(); // End the path
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw); // Stops drawing if the mouse leaves the canvas
