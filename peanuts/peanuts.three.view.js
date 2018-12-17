Peanuts.Three.View = Peanuts.Three.View || {};

Peanuts.Three.View.View = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function View(app, parent) {

        var self = this;

        this.app = app;

        this.parent = parent || app;

        this.viewPort = { x: 0, y: 0, w: 0, h: 0 };

        this.parent.events.onReSized.add(function(size) {

            self.viewPort = size;

            self.setCamera(self.camera);
        });

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.onUpdate = function(func) {
        this.updateDelegate = func;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.setCameraControls = function (controls) {

        this.controls = controls;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.setCamera = function (camera) {

        this.camera = camera;

        if (this.camera) {

            if (this.camera instanceof THREE.OrthographicCamera ) {
                this.camera.left   = this.viewPort.w / - (this.viewPort.h / 2);
                this.camera.right  = this.viewPort.w /   (this.viewPort.h / 2);
                this.camera.top    = this.viewPort.h /   (this.viewPort.h / 2);
                this.camera.bottom = this.viewPort.h / - (this.viewPort.h / 2);
            }

            if( this.camera instanceof THREE.PerspectiveCamera ) {
                this.camera.aspect = this.viewPort.w / this.viewPort.h;
            }

            this.camera.updateProjectionMatrix();
        }

        return this;
    };


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.setComposer = function (composer) {

        this.composer = composer;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.setScene = function (scene) {

        this.scene = scene;
        this.scene.addIt = function(obj) {
            this.add(obj);
            return obj;
        }

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.update = function () {

        if (this.updateDelegate) {
            this.updateDelegate(this);
        }

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.render = function () {

        if (this.app && this.scene && this.camera) {
            if(this.composer) {
               this.composer.render();
            } else {
                this.app.renderer.render(this.scene, this.camera);
            }
        }

        return this;
    };


    return View;

}(Peanuts)