var app = {};
app.hueValue = 150;

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

	//select the hue from the hueSelector
	app.$huePicker.mousedown( function(e) {

	})

	// build the initial states
	app.buildColorPalette();
	app.buildHueSelector();
});
