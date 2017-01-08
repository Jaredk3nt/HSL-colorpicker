var app = {};
app.hueValue = 150;
app.satValue = .5;
app.lumValue = .5;

$(function() {
	app.$colorPicker = $('#color-picker');
	app.$huePicker = $('#hue-picker');
	app.colorctx = app.$colorPicker[0].getContext('2d');
	app.huectx = app.$huePicker[0].getContext('2d');

	app.buildColorPalette = function() {
		var gradient = app.colorctx.createLinearGradient(0, 0, app.$colorPicker.width(), 0);

		// Creating the color gradient
		gradient.addColorStop(0, "hsl(" + app.hueValue + ", 100%, 100%)");
		gradient.addColorStop(1, "hsl(" + app.hueValue + ", 100%, 50%)");

		app.colorctx.fillStyle = gradient;
		app.colorctx.fillRect(0,0, app.colorctx.canvas.width, app.colorctx.canvas.height);

		// add the lightness gradient
		gradient = app.colorctx.createLinearGradient(0, 0, 0, app.$colorPicker.height());
		gradient.addColorStop(0, "hsla(0 , 0%, 100%, 0.0)");
		gradient.addColorStop(1, "hsla(0 , 0%, 0%, 1.0)")

		app.colorctx.fillStyle = gradient;
		app.colorctx.fillRect(0,0, app.colorctx.canvas.width, app.colorctx.canvas.height);
	}

	app.buildHueSelector = function() {
		var gradient = app.huectx.createLinearGradient(0, 0, 0, app.$huePicker.height());

		for(var i = 1; i < 361; i++){
			gradient.addColorStop((i/360), "hsl("+ i +", 100%, 50%)")
		}

		app.huectx.fillStyle = gradient;
		app.huectx.fillRect(0, 0, app.huectx.canvas.width, app.huectx.canvas.height);

	}

	var canvasOffset = app.$huePicker.offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;

	//select the hue from the hueSelector
	app.$huePicker.mousedown( function(e) {
		mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
		//console.log("Down: "+ mouseX + " / " + mouseY);

		$(document).mousemove(function(e) {
			mouseX = parseInt(e.clientX - offsetX);
 	        mouseY = parseInt(e.clientY - offsetY);
		})

		app.colorTimer = setInterval(app.getHue(e), 50);
	})

	.mouseup(function(e) {
    	//clearInterval(ms.colorTimer);
    	$(document).unbind('mousemove');
  	});

	app.getHue = function(e) {
		//mouseX = parseInt(e.clientX-offsetX);
        mouseY = parseInt(e.clientY - offsetY);

		app.hueValue = mouseY * (360/app.$huePicker.height());
		console.log(app.$huePicker.height());
		app.buildColorPalette();
	}

	// build the initial states
	app.buildColorPalette();
	app.buildHueSelector();
});
