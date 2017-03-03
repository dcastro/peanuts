Peanuts.Three.App = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function App(domElement) {

        var self = this;

        self.domElement = domElement;

        self.signals = {
            onMouseMove: new signals.Signal(),
            onMouseDown: new signals.Signal(),
            onMouseUp: new signals.Signal(),
            reSized: new signals.Signal()
        };

        self.driver = new Peanuts.Three.Driver.Driver(function () {

            if (self.stats) {
                self.stats.begin();
            }

            self.update();
            self.render();

            if (self.stats) {
                self.stats.end();
            }

        });

        self.loader = {
            texture: new THREE.TextureLoader()
        }

        self.loader.texture.setPath("/assets/");

        window.addEventListener('resize', function () { onAppReSized(self); });

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
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    App.prototype.setView = function (view) {

        this.view = view;

        onAppReSized(this);
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
    App.prototype.update = function () {

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

        if (app.view) {
            app.view.setViewPort({
                x: 0,
                y: 0,
                w: size.width,
                h: size.height
            });
        }
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.App = {}
    Peanuts.Three.App.App = App

    return Peanuts.Three.App;

}
(Peanuts)