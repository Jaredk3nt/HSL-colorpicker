var app = {};
app.hueValue = 150;
app.satValue = 100;
app.lumValue = 50;

$(function() {
	app.$colorPicker = $('#color-picker');
	app.$huePicker = $('#hue-picker');
	app.$colorDisplay = $('#color-display');
	app.colorctx = app.$colorPicker[0].getContext('2d');
	app.huectx = app.$huePicker[0].getContext('2d');
	app.displayctx = app.$colorDisplay[0].getContext('2d');

	// HUE PICKER INTERACTIONS
	var hueCanvasOffset = app.$huePicker.offset();
	var hueOffsetX = hueCanvasOffset.left;
	var hueOffsetY = hueCanvasOffset.top;

	//COLOR PICKER INTERACTIONS
	var colorCanvasOffset = app.$colorPicker.offset();
	var colorOffsetX = colorCanvasOffset.left;
	var colorOffsetY = colorCanvasOffset.top;

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

	app.buildColorDisplay = function() {
		var color = "hsl(" + app.hueValue + "," + (app.satValue)+ "%," + (app.lumValue) + "%)";
		console.log(color);
		app.$colorDisplay[0].style.backgroundColor = color;
		$('#hsl').text('hsl( ' + app.hueValue + ', ' + app.satValue + ', ' + app.lumValue + ')');
	}

	app.update = function() {
		app.buildColorPalette();
		app.buildHueSelector();
		app.buildColorDisplay();
	}

	// INTERACTIONS //

	//select the hue from the hueSelector
	app.$huePicker.mousedown( function(e) {
		mouseX = parseInt(e.clientX - hueOffsetX);
		mouseY = parseInt(e.clientY - hueOffsetY);
		//console.log("Down: "+ mouseX + " / " + mouseY);

		$(document).mousemove(function(e) {
			mouseX = parseInt(e.clientX - hueOffsetX);
			mouseY = parseInt(e.clientY - hueOffsetY);
		})

		app.colorTimer = setInterval(app.getHue(e), 50);
	})

	app.$huePicker.mouseup(function(e) {
		//clearInterval(ms.colorTimer);
		$(document).unbind('mousemove');
	});

	app.getHue = function(e) {
		//mouseX = parseInt(e.clientX-offsetX);
		mouseY = parseInt(e.clientY - hueOffsetY);

		app.hueValue = (mouseY * (360/app.$huePicker.height())).toFixed(0);
		app.update();
	}

	//select the hue from the hueSelector
	app.$colorPicker.mousedown( function(e) {
		mouseX = parseInt(e.clientX - colorOffsetX);
		mouseY = parseInt(e.clientY - colorOffsetY);
		//console.log("Down: "+ mouseX + " / " + mouseY);

		$(document).mousemove(function(e) {
			mouseX = parseInt(e.clientX - colorOffsetX);
			mouseY = parseInt(e.clientY - colorOffsetY);
		})

		app.colorTimer = setInterval(app.getColor(e), 50);
	})

	app.$colorPicker.mouseup(function(e) {
		//clearInterval(ms.colorTimer);
		$(document).unbind('mousemove');
	});

	app.getColor = function(e) {
		mouseX = parseInt(e.clientX - colorOffsetX);
		mouseY = parseInt(e.clientY - colorOffsetY);

		app.satValue = (mouseX * (100/app.$colorPicker.width())).toFixed(0);
		app.lumValue = ((app.$colorPicker.height() - mouseY) * (100/app.$colorPicker.height())).toFixed(0);
		app.update();
	}

	// build the initial states
	app.update();
});
