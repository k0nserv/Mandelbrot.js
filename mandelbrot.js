/*
Mandelbrot set generator.

Author:Hugo Tunius ( hugotunius.se )
*/

function Mandelbrot(w,h,canvas,min,max,iter,timer,callback){
    this.width  = (w !== undefined && w !== null) ? w:0;
    this.height = (h !== undefined && h !== null) ? h:0;
    this.canvas = (typeof(canvas) === "object") ? canvas:document.getElementById(canvas);
    this.min    = min;
    this.max    = max;
    this.iter   = iter;
    this.aspectRatio = w/h;
    console.log(w/h);
    this.timer = timer;
    this.colors = [];
    this.totalIter = 0;
    this.callback = callback;
    if ( this.canvas !== undefined && typeof(this.canvas) === "object" ){
        this.context = this.canvas.getContext("2d");
        this.canvas.width   = this.width;
        this.canvas.height  = this.height;
    }
    console.log(this.context);
    this.img    = this.context.createImageData(this.width,this.height);
    this.pixels = [];
    this.scale = this.calculateScale();
    console.log(this.scale);
    console.log(this.min.toString());
    console.log(this.max.toString());
    this.render();
    this.lastZ;
}


Mandelbrot.prototype.render = function(){
    this.timer.reset();
    this.timer.start();
    var x0 = this.min.re;
    var y0 = this.min.im;
    var index = 0;
    for( var y = 0; y < this.height; y++){
        for ( var x = 0; x <  this.width; x++){
            var color = this.iterate(x0,y0);
            var rgba = this.calculateColor(color);
            this.img.data[index] = rgba[0];
            this.img.data[index+1] = rgba[1];
            this.img.data[index+2] = rgba[2];
            this.img.data[index+3] = rgba[3];
            index += 4;
            x0 += this.scale.xS;
        }
        x0 = this.min.re;
        y0 += this.scale.yS;
        
    }
    this.draw();
    this.done();
}


Mandelbrot.prototype.done = function(){
    this.canvas.style.display = "block";
    if ( this.timer !== undefined ){
        this.timer.end();
    }
    if ( typeof(this.callback) === "function" && this.callback !== undefined){
        this.callback.apply(this);
    }
}

Mandelbrot.prototype.iterate = function(x,y){
    var z = new Complex(0,0);
    var c = new Complex(x,y);
    for ( var k = 0; k < this.iter ; k++){
        this.totalIter++;
        /*
         * P(Z) = z^2 +c
         */
        z = z.square();
        z = z.add(c);
        if ( z.dot() > 4 ){
            this.lastZ = z;
            return k;
        }
    }
    return this.iter;
}

Mandelbrot.prototype.zoom = function(x,y,x0,y0){
    this.max.re = ( x > x0 ) ? x : x0;
    this.min.re = ( x < x0 ) ? x : x0;
    this.max.im = ( y > y0 ) ? y0 : y;
    this.min.im = ( y < y0 ) ? y0 : y;
    console.log(this.max);
    console.log(this.min);

    this.scale = this.calculateScale();
    this.render();
}

Mandelbrot.prototype.draw = function(){
    if ( this.context !== undefined && this.context !== null ){
        this.context.clearRect(0,0,this.height,this.width);
        this.context.putImageData(this.img,0,0);
    }
}

Mandelbrot.prototype.calculateColor = function(color){
    if ( color !== undefined ){
        if( color === this.iter ){
            var r = 0;
            var g = 0;
            var b = 0;
            var a = 255;
            return [r,g,b,a];
        }
        else{
            var b = 180;
            var r = 0 + 20 + ( color % 255) ;
            var g = 0 + 20 + ( color % 255) ;
            var a = 255;
        }
        var array = hslToRgb( 225 - color % this.iter ,100,40);
        array[3] = 255;
        return [r,g,b,a];
    }
}

Mandelbrot.prototype.calculateScale = function(){
    var xS = (this.max.re-this.min.re)/this.width;
    var yS = (this.max.im-this.min.im)/this.height;
    
    return {"xS":xS,"yS":yS}
}

Mandelbrot.prototype.smoothColor = function(k){
    return k + 1  - Math.log(Math.log(this.lastZ.abs())/Math.log(this.iter));
}

Mandelbrot.prototype.xCoord = function(x){;
    return this.min.re + x*this.scale.xS;
}

Mandelbrot.prototype.yCoord = function(y){
    return this.max.im - y*this.scale.yS;
}

