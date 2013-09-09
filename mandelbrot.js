(function(win) {
    "use strict";

    var Mandelbrot = function (w, h, canvas, min, max, iter, timer, hue, callback) {
        this.width = (w !== undefined && w !== null) ? w : 0;
        this.height = (h !== undefined && h !== null) ? h : 0;
        this.canvas = (typeof(canvas) === "object") ? canvas : document.getElementById(canvas);
        this.min = min;
        this.max = max;
        this.hue = hue;
        this.iter = iter;
        this.aspectRatio = w / h;
        this.timer = timer;
        this.colors = [];
        this.totalIter = 0;
        this.callback = callback;
        if (this.canvas !== undefined && typeof(this.canvas) === "object") {
            this.context = this.canvas.getContext("2d");
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        this.img = this.context.createImageData(this.width, this.height);
        this.pixels = [];
        this.scale = this.calculateScale();
        this.render();
    };

    Mandelbrot.prototype.render = function() {
        this.timer.reset();
        this.timer.start();
        var x0 = this.min.re,
            y0 = this.min.im,
            index = 0,
            color, rgba;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                color = this.iterate(x0, y0);
                rgba = this.calculateColor(color);
                this.img.data[index] = rgba[0];
                this.img.data[index + 1] = rgba[1];
                this.img.data[index + 2] = rgba[2];
                this.img.data[index + 3] = rgba[3];
                index += 4;
                x0 += this.scale.xS;
            }
            x0 = this.min.re;
            y0 += this.scale.yS;

        }
        this.draw();
        this.done();
    };


    Mandelbrot.prototype.done = function() {
        this.canvas.style.display = "block";
        if (this.timer !== undefined) {
            this.timer.end();
        }
        if (typeof(this.callback) === "function" && this.callback !== undefined) {
            this.callback.apply(this);
        }
    };

    Mandelbrot.prototype.iterate = function(x, y) {
        var z = new Complex(0, 0),
            c = new Complex(x, y),
            i,
            maxIter = this.iter;

        for (var k = 0; k < maxIter; k++) {
            this.totalIter++;
            i++;
            /*
             * P(Z) = z^2 +c
             */
            z = z.square();
            z = z.add(c);
            if (z.dot() > 400) {
                this.lastZ = z;
                return k;
            }
        }
        return i;
    };

    Mandelbrot.prototype.zoom = function(x, y, x0, y0) {
        this.max.re = (x > x0) ? x : x0;
        this.min.re = (x < x0) ? x : x0;
        this.max.im = (y > y0) ? y0 : y;
        this.min.im = (y < y0) ? y0 : y;

        this.scale = this.calculateScale();
        this.render();
    };

    Mandelbrot.prototype.draw = function() {
        if (this.context !== undefined && this.context !== null) {
            this.context.clearRect(0, 0, this.height, this.width);
            this.context.putImageData(this.img, 0, 0);
        }
    };

    Mandelbrot.prototype.calculateColor = function(color) {
        var array, r, g, b, a;

        if (color !== undefined) {
            if (color === this.iter) {
                r = 0;
                g = 0;
                b = 0;
                a = 255;
                return [r, g, b, a];
            } else {
                b = 128 * this.smoothColor(color);
                r = 255 * this.smoothColor(color);
                g = 32 * this.smoothColor(color);
                a = 255;
            }
            array = hslToRgb(this.hue + 360 * this.smoothColor(color), 90, 40);
            array[3] = 255;

            return array;
        }
    };

    Mandelbrot.prototype.calculateScale = function() {
        var xS = (this.max.re - this.min.re) / this.width,
            yS = (this.max.im - this.min.im) / this.height;

        return {
            "xS": xS,
            "yS": yS
        };
    };

    Mandelbrot.prototype.smoothColor = function(k) {
        return (k + 1 - Math.log(Math.log(this.lastZ.abs()) / Math.log(4))) / this.iter;
    };

    Mandelbrot.prototype.xCoord = function(x) {
        return this.min.re + x * this.scale.xS;
    };

    Mandelbrot.prototype.yCoord = function(y) {
        return this.max.im - y * this.scale.yS;
    };

    win.Mandelbrot = Mandelbrot;

}(window));