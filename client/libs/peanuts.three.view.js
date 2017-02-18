
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
    View.prototype.setScene = function(scene) {

        this.scene = scene;

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
            this.view.app.win3D.height() / - (this.view.app.win3D.height()/2),
            -100, 100
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
    ViewBuilder.prototype.withTestScene = function() {

        var scene = new THREE.Scene();

        var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
        var boxMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true });
        var boxMesh = new THREE.Mesh( boxGeometry, boxMaterial );

        boxMesh.position.x = -2;

        scene.add(boxMesh);

        var sphereGeometry = new THREE.SphereGeometry( 0.5, 16, 16 );
        var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true });
        var sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );

        scene.add(sphereMesh);

        var coneGeometry = new THREE.ConeGeometry( 0.5, 1, 16, 16 );
        var coneMaterial = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:true });
        var coneMesh = new THREE.Mesh( coneGeometry, coneMaterial );

        coneMesh.position.x = 2;

        scene.add( coneMesh );

        this.view.setScene(scene);

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