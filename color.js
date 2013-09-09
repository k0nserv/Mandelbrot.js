var hslToRgb = function(h0,s0,l0){
    var h = h0/ 360;
    var s = s0/ 100;
    var l = l0/ 100;

    if (l <= 0.5) var q = l * (1 + s);
    else var q = l + s - (l * s);

    var p = 2 * l - q;
    var tr = h + (1 / 3);
    var tg = h;
    var tb = h - (1 / 3);

    var r = Math.round(hueToRgb(p, q, tr) * 255);
    var g = Math.round(hueToRgb(p, q, tg) * 255);
    var b = Math.round(hueToRgb(p, q, tb) * 255);
    return [r, g, b];
}

var hueToRgb =  function(p, q, h) {
        if (h < 0) h += 1;
        else if (h > 1) h -= 1;

        if ((h * 6) < 1) return p + (q - p) * h * 6;
        else if ((h * 2) < 1) return q;
        else if ((h * 3) < 2) return p + (q - p) * ((2 / 3) - h) * 6;
        else return p;
 }








