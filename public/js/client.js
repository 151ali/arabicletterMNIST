var X = new Array();
var Y = new Array();
var D = new Array();

var canvasWidth             = 150;
var canvasHeight            = 150;

var canvasStrokeColor       = "white";
var canvasLineJoin			= "round";
var canvasLineWidth       	= 10;
var canvasBackgroundColor 	= "black";
var canvasId              	= "canvas";

var drawing;
var empty;


canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;


ctx = canvas.getContext("2d");


//---------------------
// MOUSE DOWN function
//---------------------
$("#canvas").mousedown(function(e) {
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;

	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();
});

//-----------------------
// TOUCH START function
//-----------------------
canvas.addEventListener("touchstart", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}

	var rect = canvas.getBoundingClientRect();
	var touch = e.touches[0];

	var mouseX = touch.clientX - rect.left;
	var mouseY = touch.clientY - rect.top;

	drawing = true;
	addUserGesture(mouseX, mouseY);
	drawOnCanvas();

}, false);

//---------------------
// MOUSE MOVE function
//---------------------
$("#canvas").mousemove(function(e) {
	if(drawing) {
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
});

//---------------------
// TOUCH MOVE function
//---------------------
canvas.addEventListener("touchmove", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	if(drawing) {
		var rect = canvas.getBoundingClientRect();
		var touch = e.touches[0];

		var mouseX = touch.clientX - rect.left;
		var mouseY = touch.clientY - rect.top;

		addUserGesture(mouseX, mouseY, true);
		drawOnCanvas();
	}
}, false);

//-------------------
// MOUSE UP function
//-------------------
$("#canvas").mouseup(function(e) {
	drawing = false;
});

//---------------------
// TOUCH END function
//---------------------
canvas.addEventListener("touchend", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

//----------------------
// MOUSE LEAVE function
//----------------------
$("#canvas").mouseleave(function(e) {
	drawing = false;
});

//-----------------------
// TOUCH LEAVE function
//-----------------------
canvas.addEventListener("touchleave", function (e) {
	if (e.target == canvas) {
    	e.preventDefault();
  	}
	drawing = false;
}, false);

//--------------------
// ADD CLICK function
//--------------------
function addUserGesture(x, y, dragging) {
	X.push(x);
    Y.push(y);
	D.push(dragging);
}

//-------------------
// RE DRAW function
//-------------------
function drawOnCanvas() {
    empty = false;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	ctx.strokeStyle = canvasStrokeColor;
	ctx.lineJoin    = canvasLineJoin;
	ctx.lineWidth   = canvasLineWidth;

	for (var i = 0; i < X.length; i++) {
		ctx.beginPath();
		if(D[i] && i) {
			ctx.moveTo(X[i-1], Y[i-1]);
		} else {
			ctx.moveTo(X[i]-1, Y[i]);
		}
		ctx.lineTo(X[i], Y[i]);
		ctx.closePath();
		ctx.stroke();
	}
    
    
    // console.log(X);
    // console.log(Y)
    // console.log(D)
}

































//------------------------
// CLEAR CANVAS function
//------------------------
function clearCanvas(id) {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	X = new Array();
	Y = new Array();
	D = new Array();
    empty = true ;
}


/*
* get the array of value 
*/

var pixels = new Array();


function btn(image){
    var tensor ;
    var label = document.getElementById("label").value;
    
    
    /* resize the input to siez (1,28*28) */
    tensor = tf.browser.fromPixels(image)
            .resizeNearestNeighbor([28, 28])
		    .mean(2)
		    .toFloat()
			.reshape([1 , 784]);
           
    
// convert tensor to js array 
        if ( empty == false && label != "" ){
            const values = tensor.dataSync();
            pixels = Array.from(values);
            
            
            pixels.unshift(label);
            console.log("pixels ->",pixels);

          // send the array to the server 
            
  var socket = io.connect(document.location.href);
        socket.emit(
        "event_button_clicked", 
        { text: pixels });
            
            
            
        }else{
            // customize later 
            alert('u should draw && give the label ');
        }

}
