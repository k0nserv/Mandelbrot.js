(function(win) {
    "use strict";

    var Complex = function Complex(re, im) {
        this.re = re;
        this.im = im;
    };



    Complex.prototype.add = function(z) {
        /* (a+bi)(x+yi) = (a+x) + (bi+yi)
         *
         */
        if (typeof(z) === "object") {
            return new Complex(this.re + z.re, this.im + z.im);
        }
    };

    Complex.prototype.sub = function(z) {
        /*
         *
         */
    };

    Complex.prototype.square = function() {
        /*
         * (a+bi)(a+bi) a^2 + 2abi + b^2
         *  a = a^2-b^2
         *  b = 2abi
         */
        var temp = (this.re * this.re) - (this.im * this.im);
        var im = 2 * this.re * this.im;
        var re = temp;
        return new Complex(re, im);
    };

    Complex.prototype.abs = function() {
        /*
         *  sqrt(a^2+b^2)
         */
        return Math.sqrt(this.dot());
    };

    Complex.prototype.dot = function() {
        return (this.re * this.re) + (this.im * this.im);
    };

    Complex.prototype.toString = function() {
        return "" + this.re + "+" + this.im + "i";
    };

    win.Complex = Complex;
}(window));