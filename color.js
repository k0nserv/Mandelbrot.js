var hslToRgb = function(h0,s0,l0){
    var h = h0/ 360,
    s = s0/ 100,
    l = l0/ 100,
    q, p, tr, tg, tb, result = new Array(3);

    if (l <= 0.5) q = l * (1 + s);
    else q = l + s - (l * s);

    p = 2 * l - q;
    tr = h + (1 / 3);
    tg = h;
    tb = h - (1 / 3);

    result[0] = Math.round(hueToRgb(p, q, tr) * 255);
    result[1] = Math.round(hueToRgb(p, q, tg) * 255);
    result[2] = Math.round(hueToRgb(p, q, tb) * 255);
    return result;
}

var hueToRgb =  function(p, q, h) {
        if (h < 0) h += 1;
        else if (h > 1) h -= 1;

        if ((h * 6) < 1) return p + (q - p) * h * 6;
        else if ((h * 2) < 1) return q;
        else if ((h * 3) < 2) return p + (q - p) * ((2 / 3) - h) * 6;
        else return p;
 }








