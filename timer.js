
function Timer(){
    this.reset();
}

Timer.prototype.start = function(){
    this.startTime = new Date().valueOf();
}

Timer.prototype.end = function(){
    this.endTime = new Date().valueOf();
}

Timer.prototype.reset = function(){
     this.startTime = 0;
     this.endTime   = 0;
}

Timer.prototype.toString = function(){
    return "Start:"+this.startTime+" End:"+this.endTime+" Delta:"+this.delta();
}

Timer.prototype.delta = function(){
    if ( this.startTime !== undefined || this.startTime !== 0 ){
        if ( this.endTime !== undefined || this.endTime !== 0 ){
            return this.endTime-this.startTime;
        }
    }
}
