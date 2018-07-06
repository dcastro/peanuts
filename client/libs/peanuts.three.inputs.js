Peanuts.Three.Inputs = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Mouse = function(domElement, modifier) {

        var self = this;

        this.domElement = domElement;
        this.enabled = true;
        this.debug = false;

        self.events = {
            onMouseMove: new signals.Signal(),
            onMouseDown: new signals.Signal(),
            onMouseUp: new signals.Signal()
        };

        self.status = { pressed: false, absPosNX : 0, absPosNY: 0};

        var clickHandler = function(event,state, x, y, dx, dy) {

            var size = self.domElement.getBoundingClientRect();
            var unitX = 1 / size.width;
            var unitY = 1 / size.height;
 
            self.status.pressed = state;
            self.status.absPosX = x;
            self.status.absPosY = y;
            self.status.absPosNX = (x * unitX);
            self.status.absPosNY = (y * unitY);
            self.status.absPosCX = self.status.absPosNX - 0.5;
            self.status.absPosCY = self.status.absPosNY - 0.5;

            self.events[event].dispatch(Object.assign({
                    deltaPosX : dx || 0,
                    deltaPosY : dy || 0,
                    deltaPosNX : ((dx || 0) * unitX),
                    deltaPosNY : ((dy || 0) * unitY)
            }, self.status));

        };

        this.domElement.addEventListener('mousedown', function(e) {
            clickHandler("onMouseDown",true, e.offsetX, e.offsetY);
        }, false);

        this.domElement.addEventListener('mouseup', function(e) {
            clickHandler("onMouseUp",false, e.offsetX, e.offsetY);
        }, false);

        this.domElement.addEventListener('mousemove', function(e) {
            clickHandler("onMouseMove",
                self.status.pressed, 
                e.offsetX, 
                e.offsetY, 
                e.offsetX - self.status.absPosX,
                e.offsetY - self.status.absPosY);
        }, false);

        return this;
    }

    return  { Mouse:Mouse };

}(Peanuts)