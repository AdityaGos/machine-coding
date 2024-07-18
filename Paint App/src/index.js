const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const toolButtons = document.querySelectorAll(".tool");
const undoButtons = document.querySelector(".undo");
const fillColorLabel = document.querySelector("#fillcolorlabel")
const fillColorInput = document.querySelector("#fill-color")
const brushSliderCtx = document.querySelector("#size-slider")


const ToolsName = Object.freeze({
  brush: "brush",
  eraser: "eraser",
  rectangle: "rectangle",
  triangle: "triangle",
  circle: "circle",
  fillcolorlabel:"fillcolorlabel"
});

let selectedTool = ToolsName.brush;

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    button.classList.add("active");
    selectedTool = ToolsName[button.id] ? ToolsName[button.id] :ToolsName.brush;
    console.log(selectedTool);
  });
});

let isDrawing = false;
let prevMouseX;
let prevMouseY;
let snapshot;
let drawHistory=[]
let brushWidth=10

const toggleCheckbox = () => {
  fillColorInput.checked = !fillColorInput.checked;
};

fillColorLabel.addEventListener('click',()=> { toggleCheckbox()})


fillColorInput.addEventListener('click',(e)=>{
    e.stopPropagation();
  })


  brushSliderCtx.addEventListener('change',()=>{
    brushWidth = brushSliderCtx.value
  })
function drawRectangle(e)
{
  if(!fillColorInput.checked)
  {
    return ctx.strokeRect(e.offsetX,e.offsetY , prevMouseX-e.offsetX, prevMouseY-e.offsetY);
  }
  ctx.fillRect(e.offsetX,e.offsetY , prevMouseX-e.offsetX, prevMouseY-e.offsetY)
    
}

function drawCircle(e)
{
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow(prevMouseX-e.offsetX,2) + Math.pow(prevMouseY - e.offsetY,2));
  ctx.arc(prevMouseX, prevMouseY,radius,0,2*Math.PI);
  fillColorInput.checked ? ctx.fill() :ctx.stroke()
}

function drawTriangle(e){
  console.log('clicked triangle')
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.lineTo(prevMouseX*2-e.offsetX, e.offsetY)
  ctx.closePath()

  fillColorInput.checked ? ctx.fill(): ctx.stroke()

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
  ctx.lineWidth = brushWidth;
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
  else if (selectedTool === ToolsName.circle)
  {
    drawCircle(e)
  }
  else if (selectedTool === ToolsName.triangle)
  {
    
    drawTriangle(e)
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
brushSliderCtx.addEventListener('change',()=>{
  brushWidth = brushSliderCtx.value
})
document.addEventListener('keydown',(e)=>{
    if (e.ctrlKey && e.key === 'z') {
        undo()
      }
})