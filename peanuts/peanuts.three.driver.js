Peanuts.Three.Driver = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Driver = function(func) {

        this.running = false;
        this.func = func;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Driver.prototype.start = function() {

        if(this.running == false) {
           this.running = true;
           this.run();
        }
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Driver.prototype.stop = function() {
        this.running = false;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Driver.prototype.run = function() {

        var self = this;

        requestAnimationFrame( function() {
            if(self.running) {
               self.func();
               self.run();
            }
        });
    }

    return Driver;

}(Peanuts)