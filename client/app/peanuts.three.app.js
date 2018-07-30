Peanuts.Three.App = Peanuts.Three.App || {}

Peanuts.Three.App.App = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function App(domElement) {

        var self = this;

        self.domElement = domElement;

        self.driver = new Peanuts.Three.Driver(function () {

            if (self.stats) {
                self.stats.begin();
            }

            self.update();
            self.render();

            if (self.stats) {
                self.stats.end();
            }

        });

        self.inputs  =  {
            mouse : new Peanuts.Three.Inputs.Mouse(self.domElement)
        };

        self.events = {
            onReSized: new signals.Signal()
        };

        self.loader = {
            promising: new Peanuts.Three.Loader.Promising(),
            texture: new THREE.TextureLoader(),
            font: new THREE.FontLoader()
        };

        self.loader.texture.setPath("/assets/");

        window.addEventListener('resize', function () { 
            onAppReSized(self); 
        });

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.setRenderer = function (renderer) {

        this.renderer = renderer;
        this.renderer.setClearColor(0x000000, 0.2);

        this.domElement.appendChild(this.renderer.domElement);

        onAppReSized(this);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.setView = function (view) {

        this.view = view;

        onAppReSized(this);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.initialise = function () {

        if (this.view && this.view.initialise) {
            this.view.initialise();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.onUpdate = function (func) {

        this.updateDelegate = func;
        
        return this;
    };


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.update = function () {

        if (this.updateDelegate) {
            this.updateDelegate();
        }

        if (this.view && this.view.update) {
            this.view.update();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.render = function () {

        if (this.view && this.view.render) {
            this.view.render();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.start = function () {

        this.view.controls.update();

        this.driver.start();

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.stop = function () {

        this.driver.stop();

        return this;
    }

    function onAppReSized(app) {

        var size = app.domElement.getBoundingClientRect();

        if (app.renderer) {
            app.renderer.setSize(
                size.width,
                size.height
            );
        }

        app.events.onReSized.dispatch({
                x: 0,
                y: 0,
                w: size.width,
                h: size.height
        });

    }

    return App;
}
(Peanuts)