Peanuts.Three.View = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function View(app) {

        this.app = app;

        this.viewPort = { x: 0, y: 0, w: 0, h: 0 };

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.setViewPort = function (viewPort) {

        this.viewPort = viewPort;

        this.setCamera(this.camera);

        return this;
    };

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
    View.prototype.setScene = function (scene) {

        this.scene = scene;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.update = function () {

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    View.prototype.render = function () {

        if (this.app && this.scene && this.camera) {
            this.app.renderer.render(this.scene, this.camera);
        }

        return this;
    };

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
    ViewBuilder.prototype.build = function () {

        return this.view;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withPerspectiveCamera = function () {

        this.view.setCamera(new THREE.PerspectiveCamera());

        this.view.camera.position.z = 2;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrthographicCamera = function () {

        this.view.setCamera(new THREE.OrthographicCamera());

        this.view.camera.position.z = 2;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrbitControls = function () {

        this.view.controls = new THREE.OrbitControls(
            this.view.camera,
            this.view.app.renderer.domElement
        );

        this.view.controls.target.set(0, 0, 0);
        this.view.controls.noPan = true;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withTestScene = function () {

        var scene = new THREE.Scene();

        var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        var boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); boxMesh.id = "Box";

        boxMesh.position.x = -2;

        scene.add(boxMesh);

        var sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial); sphereMesh.id = "Sphere";

        scene.add(sphereMesh);

        var coneGeometry = new THREE.ConeGeometry(0.5, 1, 16, 16);
        var coneMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
        var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial); coneMesh.id = "Cone";

        coneMesh.position.x = 2;

        scene.add(coneMesh);

        this.view.setScene(scene);

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.View = {}
    Peanuts.Three.View.View = View;

    return Peanuts.Three.View;

}(Peanuts)