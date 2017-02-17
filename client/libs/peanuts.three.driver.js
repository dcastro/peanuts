Peanuts.Three.Driver = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Looper = function(func) {

        this.running = false;
        this.func = func;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Looper.prototype.start = function() {

        if(this.running == false) {
           this.running = true;
           this.run();
        }
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Looper.prototype.stop = function() {
        this.running = false;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Looper.prototype.run = function() {

        var self = this;

        requestAnimationFrame( function() {
            if(self.running) {
               self.func();
               self.run();
            }
        });
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.Driver  = {}
    Peanuts.Three.Driver.Looper = Looper;
    
    return Peanuts.Three.Driver;

}(Peanuts)