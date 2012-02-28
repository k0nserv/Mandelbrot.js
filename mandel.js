/*
 * Mandlebrot set generator using HTML5 Canvas
 * Written by: Hugo Tunius
 */

function Complex(re,im){
    //a+bi
    this.re = re;
    this.im = im;
}

Complex.prototype.square = function(){
        /*
     * (a+bi)^2 = a^2 +2abi + b^2
     *  new a: a = a^2 - b^2
     *  new b: b = 2abi
     */
        this.re = (this.re*this.re) - (this.im*this.im);
        this.im = 2*this.re*this.im;
    }

Complex.prototype.add = function(z){
        /*
     * (a+bi)+(x+yi) = ((a+x)+(bi+yi))
     * 
     */
        if ( typeof(z) !== "ojbect" || typeof(z) !== undefined ){
            if ( z.im !== undefined && z.re !== undefined  ){
                return new complex (this.re+z.re,this.im+z.im);
            }
        }
        return false;
    }
Complex.__proto__.toString = function(){
        return "Re:"+this.re+" Im:"+this.im;
    }







function Mandelbrot(x,y,cName){
    this.debug("Hello");
    this.x = x ? x:0;   //Canvas width
    this.y = y ? y:0;   //Canvas hight
    this.name = cName; //The canvas ID
    this.min = new Complex(-2.5,-1.2);  //define the size of the grid
    this.max = new Complex(1,1.2);      //define the size of the grid 
    this.S = this.scale();//Get the coordinate pixel ratio
    this.canvas = document.getElementById(this.name);
    this.canvas = ( this.canvas !== null || this.canvas !== undefined )  ? this.canvas:false;
    if ( this.canvas){
        this.context = this.canvas.getContext("2d");
    }
    else{
        this.context = false;
    }
    this.pixels = [[]];
}
    
Mandelbrot.prototype.init = function(){
        if ( this.canvas){
            canvas.width = this.x;
            canvas.height = this.y;  
            debug(this.S);
        }
    }
    
Mandelbrot.prototype.render = function(){
        for ( var x = 0; x < this.x ; x++ ){
            for ( var y = 0; y < this.y; y++ ){
                
                
            }
        }
    }

Mandelbrot.prototype.xCoord = function(){
    
}
   
Mandelbrot.prototype.scale = function(){
        var x = (this.max.re-this.min.re)/this.x;
        var y = (this.max.im-this.min.im)/this.y;
        return {"x":x,"y":y}
    }
    
    //Log something
Mandelbrot.prototype.debug = function(s){
        if ( typeof(console) === "ojbect" && this.debug ){
            if ( typeof(console.log) === "function" ){
                console.log(s);
            }
        }       
    }

