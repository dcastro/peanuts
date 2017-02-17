Peanuts.Three.View = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function View(app) {

        var self = this;

        this.app = app;

        this.win = app.win3D;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.onResized = function(width, height) {

        if(this.camera) {
           this.camera.aspect = width / height;
           this.camera.updateProjectionMatrix();
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.initialise = function() {

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.update = function() {

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.render = function() {

        if(this.win && this.scene && this.camera) {
           this.win.render(this.scene, this.camera);
        }

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function ViewBuilder(app) {

        this.view = new View(app);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.build = function() {

        return this.view;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withPerspectiveCamera = function() {
        
        this.view.camera = new THREE.PerspectiveCamera();
        this.view.camera.position.z = 4;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrthographicCamera = function() {

        this.view.camera = new THREE.OrthographicCamera(
            this.view.app.win3D.width() / - (this.view.app.win3D.height()/2),
            this.view.app.win3D.width() / (this.view.app.win3D.height()/2), 
            this.view.app.win3D.height() / (this.view.app.win3D.height()/2), 
            this.view.app.win3D.height() / - (this.view.app.win3D.height()/2)
        );

        this.view.camera.position.z = 1;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrbitControls = function() {

        this.view.controls = new THREE.OrbitControls(
            this.view.camera, 
            this.view.win.renderer.domElement
        );

        this.view.controls.target.set(0, 0, 0);
        this.view.controls.noPan = true;

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withScene = function() {

        this.view.scene = new THREE.Scene();

        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true });
        var mesh = new THREE.Mesh( geometry, material );

        this.view.scene.add(mesh);

        this.view.win.resize();

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.View = {}
    Peanuts.Three.View.Builder = ViewBuilder;

    return Peanuts.Three.View;

}(Peanuts)