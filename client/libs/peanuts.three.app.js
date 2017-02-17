Peanuts.Three.App = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function App(win3D) {

        var self = this;

        this.win3D = win3D;

        this.win3D.signals.resized.add(function(width, height) {
            if(self.view) { self.view.onResized(width,height);}
        });

        this.renderLoop = new Peanuts.Three.Driver.Looper(function() {
            
            if(self.stats) { 
               self.stats.begin(); 
            }
            
            self.update();
            self.render();
            
            if(self.stats) { 
               self.stats.end(); 
            }

        });
        
        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.stop = function() {
        this.renderLoop.stop();
        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.start = function() {
        this.renderLoop.start();
        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.initialise = function() {

        if(this.view) {
           this.view.initialise();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.update = function() {

        if(this.view) {
           this.view.update();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.render = function() {

        if(this.view) {
           this.view.render();
        }

        return this;
    }


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function AppBuilder() {

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.build = function() {

        this.app.win3D.resize();

        return this.app;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withGLWindow = function(container) {

        this.app = new App(
            Peanuts.Three.Window.Factory.createGLWindow(container)
        );

        return this; 
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withPerspectiveView = function(view) {

        var viewBuilder = new Peanuts.Three.View.Builder(this.app);

        this.app.view = viewBuilder
                       .withPerspectiveCamera()
                       .withOrbitControls()
                       .withScene()
                       .build();

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withOrthograpicView = function(view) {

        var viewBuilder = new Peanuts.Three.View.Builder(this.app);

        this.app.view = viewBuilder
                       .withOrthographicCamera()
                       .withOrbitControls()
                       .withScene()
                       .build();

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withDatGui = function() {

        this.app.datGui = new dat.GUI({ autoPlace: false });
        this.app.datGui.domElement.style.top="0px";
        this.app.datGui.domElement.style.right="0px";
        this.app.datGui.domElement.style.position="Absolute";
        this.app.win3D.container.appendChild(this.app.datGui.domElement);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withStats = function() {

        this.app.stats = new Stats();
        this.app.stats.domElement.style.top="0px";
        this.app.stats.domElement.style.left="0px";
        this.app.stats.domElement.style.position="Absolute";
        this.app.win3D.container.appendChild(this.app.stats.domElement);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withAudio = function() {

        this.app.audio = new Peanuts.Audio.SimplePlayer();

        return this;
    }

 
    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.App = {}
    Peanuts.Three.App.Builder = AppBuilder;

    return Peanuts.Three.App;

}(Peanuts)