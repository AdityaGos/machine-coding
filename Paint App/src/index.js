const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const toolButtons = document.querySelectorAll(".tool");
const undoButtons = document.querySelector(".undo");
const ToolsName = Object.freeze({
  brush: "brush",
  eraser: "eraser",
  rectangle: "rectangle",
  triangle: "triangle",
  circle: "circle",
});

let selectedTool = ToolsName.brush;

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    button.classList.add("active");
    selectedTool = ToolsName[button.id];
    console.log(selectedTool);
  });
});
let isDrawing = false;
let prevMouseX;
let prevMouseY;
let snapshot;
let drawHistory=[]
function drawRectangle(e)
{
    ctx.strokeRect(e.offsetX,e.offsetY , prevMouseX-e.offsetX, prevMouseY-e.offsetY);
}
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

function startDraw(e) {

  isDrawing = true;
  prevMouseX = e.offsetX
  prevMouseY = e.offsetY
  ctx.beginPath(); // create  new position to start drawing
  ctx.moveTo(e.offsetX, e.offsetY); // Start a new path at the mouse position
  ctx.lineWidth = 4;
  snapshot= ctx.getImageData(0,0,canvas.width,canvas.height)
  drawHistory.push(snapshot)
}

function draw(e) {
  if (!isDrawing) return;
  ctx.putImageData(snapshot,0,0)
  if (selectedTool === ToolsName.brush) {
    ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to x and y axis
    ctx.stroke(); // Filling the line with color
  }
  else if (selectedTool === ToolsName.rectangle)
  {
    drawRectangle(e)
  }
}

function undo()
{

    let prevDrawingSnapshot = drawHistory[drawHistory.length - 1];
    if(prevDrawingSnapshot){ ctx.putImageData(prevDrawingSnapshot,0,0) }
    drawHistory.pop()
}
function stopDraw() {
  isDrawing = false;
  ctx.closePath(); // End the path
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw); // Stops drawing if the mouse leaves the canvas
undoButtons.addEventListener('click', ()=>{undo()})

document.addEventListener('keydown',(e)=>{
    if (e.ctrlKey && e.key === 'z') {
        undo()
      }
})