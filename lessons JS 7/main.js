const doc = document

const canvas = doc.querySelector ('#canv')
ctx = canvas.getContext ('2d')

let system = {
    currentTool: null,
    currentColor: '#000',
    brushSize: 5
}

        

function getCoordinates (evt) {
    doc.querySelector ('#x-coord').innerText = evt.offsetX 
    doc.querySelector ('#y-coord').innerText = evt.offsetY 
}

function renderSystem (elem, act) {
    system [elem] = act
}

function handleClick (evt) {
    if (evt.target.classList.contains ('tool-booton')) {
        renderSystem ('currentTool', evt.target.dataset.name)
        
    }
}

function handleInput (evt) {
    if (evt.target.id === 'select-size') {
        renderSystem ('brushSize', evt.target.value)
       
    }
    if (evt.target.id === 'select-color') {
        renderSystem ('currentColor', evt.target.value)
        
    }
}

function startDraw (evt) {
    if (system.currentTool === 'pencil') {
        pencil (evt)
    }
    if (system.currentTool === 'brush') {
        brush (evt)
    }
    if(system.currentTool === 'text'){
        textInput(evt);
    }
}

function endDraw () {
    canvas.onmousemove = null
}



function pencil () {
    canvas.onmousemove = function () {
        let x = +doc.querySelector ('#x-coord').innerText 
        let y = +doc.querySelector ('#y-coord').innerText 
        ctx.fillStyle = system.currentColor
        ctx.fillRect (x, y, system.brushSize, system.brushSize)
    }
}
function brush () {
        canvas.onmousemove = function (evt) {
        let x = +doc.querySelector ('#x-coord').innerText;
        let y = +doc.querySelector ('#y-coord').innerText;
        ctx.fillStyle = system.currentColor;
        ctx.beginPath();
        ctx.arc (x, y, system.brushSize, 0, Math.PI*2, false);
        ctx.fill();
    }
}


function textInput (evt) {
    
    let text = prompt("Введите текст:", "");
    let x = evt.offsetX;
    let y = evt.offsetY;
    if (text) {
        ctx.font = Math.max(20, system.brushSize) + "px Georgia";
        ctx.fillText(text, x, y);
        
    }
    
}
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


canvas.addEventListener ('mousemove', getCoordinates)
canvas.addEventListener ('mousedown', startDraw)
canvas.addEventListener ('mouseup', endDraw)
doc.addEventListener ('click', handleClick)
doc.addEventListener ('input', handleInput)