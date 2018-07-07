var canvas = document.getElementsByClassName('canvas')[0]
var context = canvas.getContext('2d')

//自动设置canvas大小
autoSetCanvasSize()

//设置canvas背景颜色
setCanvasColor()

//特性检测
if('ontouchstart' in document) {
    //监听触摸事件
    listenToTouch()
}else {
    //监听鼠标事件            
    listenToMouse()
}

//改变画笔颜色
changeBrushColor()

//改变画笔的粗细
var lineWidth = 4
changeLineWidth()

//清除屏幕
clearScreen()

//下载
download()

//橡皮擦
var eraserEnable = false, usingEaser = false

brush.onclick = function () {
    eraserEnable = false
    this.classList.add('active')
    this.nextElementSibling.classList.remove('active')
}

eraser.onclick = function () {
    eraserEnable = true
    this.classList.add('active')
    this.previousElementSibling.classList.remove('active')
}

//画圆
function drawCirle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//划线
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize() {
    setCanvasSize()

    //监听屏幕宽度变化
    window.onresize = function () {
        setCanvasSize()
    }

    //设置canvas尺寸
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenToMouse() {
    var painting = false
    //按下鼠标
    var lastPoint = { x: undefined, y: undefined }
    document.onmousedown = function (event) {
        painting = true, usingEaser = true
        var x = event.clientX
        var y = event.clientY
        lastPoint = {
            x: x,
            y: y
        }
        // drawCirle(x, y, 2)
    }

    //松开鼠标
    document.onmouseup = function (event) {
        painting = false, usingEaser = false
    }

    //移动鼠标
    document.onmousemove = function (event) {
        var x = event.clientX
        var y = event.clientY
        if (eraserEnable && usingEaser) {
            context.clearRect(x, y, 20, 20);
        } else {
            if (painting) {
                // drawCirle(x, y, 2)
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint = { x: x, y: y }
            }
        }
    }
}

function listenToTouch() {
    var painting = false
    //按下鼠标
    var lastPoint = { x: undefined, y: undefined }
    document.ontouchstart = function (event) {
        painting = true, usingEaser = true
        var x = event.touches[0].clientX
        var y = event.touches[0].clientY
        lastPoint = {
            x: x,
            y: y
        }
        // drawCirle(x, y, 2)
    }

    //松开鼠标
    document.ontouchend = function (event) {
        painting = false, usingEaser = false
    }

    //移动鼠标
    document.ontouchmove = function (event) {
        var x = event.touches[0].clientX
        var y = event.touches[0].clientY
        if (eraserEnable && usingEaser) {
            context.clearRect(x, y, 20, 20);
        } else {
            if (painting) {
                // drawCirle(x, y, 2)
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint = { x: x, y: y }
            }
        }
    }
}

//改变画笔颜色
function changeBrushColor() {
    black.onclick= function() {
        context.strokeStyle='black';
        this.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
        green.classList.remove('active')
    }

    red.onclick= function() {
        context.strokeStyle='red';
        this.classList.add('active')
        black.classList.remove('active')
        blue.classList.remove('active')
        green.classList.remove('active')
    }

    blue.onclick= function() {
        context.strokeStyle='blue';
        this.classList.add('active')
        red.classList.remove('active')
        black.classList.remove('active')
        green.classList.remove('active')
    }
    
    green.onclick= function() {
        context.strokeStyle='green';
        this.classList.add('active')
        red.classList.remove('active')
        black.classList.remove('active')
        blue.classList.remove('active')
    }
}

//改变画笔的粗细
function changeLineWidth() {
    thinLine.onclick = function() {
        lineWidth = 4
        this.classList.add('active')
        this.nextElementSibling.classList.remove('active')
    }

    thickLine.onclick = function() {
        lineWidth = 6
        this.classList.add('active')
        this.previousElementSibling.classList.remove('active')
    }
}

//清除屏幕
function clearScreen() {
    trash.onclick = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

//下载
function download() {
    save.onclick = function() {
        console.log('aaaaaaaaaaa')        
        console.log(111111)
        var url = canvas.toDataURL('image/png');
        var a = document.createElement('a')
        a.href = url
        a.target = '_blank'
        a.download = '我的画儿'
        document.body.appendChild(a)
        a.click()
    }
}

//设置canvas背景颜色
function setCanvasColor() {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
}