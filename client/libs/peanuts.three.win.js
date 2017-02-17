Peanuts.Three.Window = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function ThreeWindow(container, renderer) {

        var self = this;

        this.renderer = renderer;
        this.container = container;
        this.container.appendChild(this.renderer.domElement);
        this.renderer.setClearColor( 0x000000 , 0.5);

        this.signals = {
            mouseMove: new signals.Signal(),
            mouseDown: new signals.Signal(),
            mouseUp: new signals.Signal(),
            resized: new signals.Signal()
        }

        this.container.addEventListener('mousemove', function(evt) { self.mouseMove(evt); } );
        this.container.addEventListener('mousedown', function(evt) { self.mouseDown(evt); } );
        this.container.addEventListener('mouseup', function(evt)  { self.mouseUp(evt); } );
        
        window.addEventListener('resize', function(evt) { self.resize(evt);} );
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.mouseMove = function(evt) {

        var positionW = new THREE.Vector2(evt.x, evt.y);

        var positionS = new THREE.Vector3();
            positionS.x =   ( evt.offsetX / this.width ) * 2 - 1;
            positionS.y = - ( evt.offsetY / this.height ) * 2 + 1;
            positionS.z = 0.5;

        this.signals.mouseMove.dispatch(this, evt, positionW, positionS);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.mouseDown = function(evt) {

        var positionW = new THREE.Vector2(evt.x, evt.y);

        var positionS = new THREE.Vector3();
            positionS.x =   ( evt.offsetX / this.width ) * 2 - 1;
            positionS.y = - ( evt.offsetY / this.height ) * 2 + 1;
            positionS.z = 0.5;

        this.signals.mouseDown.dispatch(this, evt, positionW, positionS);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.mouseUp = function(evt) {

        var positionW = new THREE.Vector2(evt.x, evt.y);

        var positionS = new THREE.Vector2();
            positionS.x =   ( evt.offsetX / this.width ) * 2 - 1;
            positionS.y = - ( evt.offsetY / this.height ) * 2 + 1;

        this.signals.mouseUp.dispatch(this, evt, positionW, positionS);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.resize = function() {

        var bounds = this.container.getBoundingClientRect();

         this.width = bounds.width;
         this.height = bounds.height;

         this.renderer.setSize(this.width, this.height);

         this.signals.resized.dispatch(this.width, this.height);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.render = function(scene, camera) {

        this.renderer.render(scene, camera);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.height = function() {
        return this.container.getBoundingClientRect().height;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ThreeWindow.prototype.width = function() {
        return this.container.getBoundingClientRect().width;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.Window = {};

    Peanuts.Three.Window.Factory = {
        
        createWindow: function(container,renderer) {
            return new ThreeWindow(container, renderer);
        },
        createGLWindow:  function(container) {
            return new ThreeWindow(container, 
                new THREE.WebGLRenderer( {
                    antialias: true,
                    alpha: true
                })
            );
        },

    }
    
    return Peanuts.Three.Window;

}(Peanuts)