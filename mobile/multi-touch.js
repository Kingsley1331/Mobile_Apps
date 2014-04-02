function initialize(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#D0D0D0';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	canvas.addEventListener('touchstart', handleStart, false);
	canvas.addEventListener('touchend', handleEnd, false);
	canvas.addEventListener('touchcancel', handleCancel, false);
	canvas.addEventListener('touchleave', handleEnd, false);
	canvas.addEventListener('touchmove', handleMove, false);
}

var ongoingTouches = [];

function handleStart(evt){
	evt.preventDefault();
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var touches = evt.changedTouches;
	var rect = canvas.getBoundingClientRect();
	var scrollX = document.body.scrollLeft;
	var scrollY = document.body.scrollTop;
	var offsetX = rect.left + scrollX;
	var offsetY = rect.top + scrollY;
	
	for(var i=0; i < touches.length; i++){
		ongoingTouches.push(copyTouch(touches[i]));
		/*var colour = colourForTouch(touches[i]);
		ctx.beginPath();
		ctx.arc(touches[i].pageX - offsetX, touches[i].pageY - offsetY, 4, 0,2*Math.PI, false);  // a circle at the start
		ctx.fillStyle = colour;
		ctx.fill();*/
	}
}


function handleMove(evt) {
	evt.preventDefault();
	var canvas = document.getElementsByTagName("canvas")[0];
	var ctx = canvas.getContext("2d");
	var touches = evt.changedTouches;
	var rect = canvas.getBoundingClientRect();
	var scrollX = document.body.scrollLeft;
	var scrollY = document.body.scrollTop;
	var offsetX = rect.left + scrollX;
	var offsetY = rect.top + scrollY;
	
	for (var i=0; i < touches.length; i++) {
	var colour = colourForTouch(touches[i]);
	var index = ongoingTouchIndexById(touches[i].identifier);

	if(index >= 0) {
		ctx.beginPath();
		ctx.moveTo(ongoingTouches[index].pageX - offsetX, ongoingTouches[index].pageY - offsetY);
		ctx.lineTo(touches[i].pageX - offsetX, touches[i].pageY - offsetY);
		ctx.lineWidth = 1;
		ctx.strokeStyle = colour;
		ctx.stroke();

		ongoingTouches.splice(index, 1, copyTouch(touches[i]));  // swap in the new touch record
	}else{
		}
	}
}

function handleEnd(evt) {
	evt.preventDefault();
	var canvas = document.getElementsByTagName("canvas")[0];
	var ctx = canvas.getContext("2d");
	var touches = evt.changedTouches;
	var rect = canvas.getBoundingClientRect();
	var scrollX = document.body.scrollLeft;
	var scrollY = document.body.scrollTop;
	var offsetX = rect.left + scrollX;
	var offsetY = rect.top + scrollY;
	
	for (var i=0; i < touches.length; i++){
	var colour = colourForTouch(touches[i]);
	var index = ongoingTouchIndexById(touches[i].identifier);

	if(index >= 0) {
		ctx.lineWidth = 4;
		ctx.fillStyle = colour;
		ctx.beginPath();
		ctx.moveTo(ongoingTouches[index].pageX - rect.left, ongoingTouches[index].pageY - offsetY);
		ctx.lineTo(touches[i].pageX - offsetX, touches[i].pageY - offsetY);
		//ctx.fillRect(touches[i].pageX - offsetX -4, touches[i].pageY - offsetY -4, 8, 8);  // and a square at the end
		ongoingTouches.splice(index, 1);  // remove it; we're done
		}
	}
}

function handleCancel(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
  
	for (var i=0; i < touches.length; i++) {
		ongoingTouches.splice(i, 1);
	}
}


function colourForTouch(touch) {
	var colours = ['black', 'red', 'blue', '#FF00FF', 'green', 'lightgreen', 'pink', 'aqua', 'purple', 'violet', 'orange', 'beige', 'white', 'yellow', 'darkgrey'];
	colour = colours[touch.identifier];
	return colour;
}

function copyTouch(touch) {
	return {identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY};
}

function ongoingTouchIndexById(idToFind){
	for (var i=0; i < ongoingTouches.length; i++){
		var id = ongoingTouches[i].identifier;
		if (id == idToFind){
			return i;
		}
	}
	return -1;	// not found
}

function logger(msg) {
  var p = document.getElementById('logger');
  p.innerHTML = msg + "\n" + p.innerHTML;
}