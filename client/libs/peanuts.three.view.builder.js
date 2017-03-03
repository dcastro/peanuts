Peanuts.Three.View.Builder = function (Peanuts) {


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function ViewBuilder(app) {

        this.view = new Peanuts.Three.View.View(app);

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

        this.view.camera.position.z = 5;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrthographicCamera = function () {

        this.view.setCamera(new THREE.OrthographicCamera());

        this.view.camera.position.z = 5;

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withFirstPersonControls = function() {

    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withOrbitControls = function () {

        this.view.setCameraControls(new THREE.OrbitControls(
            this.view.camera,
            this.view.app.renderer.domElement
        ));

        this.view.controls.target.set(0, 0, 0);
        this.view.controls.noPan = true;

        return this;
    };


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    ViewBuilder.prototype.withTestScene = function () {

        var scene = new THREE.Scene();

        var boxGeometry = new THREE.BoxGeometry(2, 2, 2, 4, 4);
        var boxMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); boxMesh.name = "Box";


        boxMesh.position.x = -4;

        scene.add(boxMesh);

        var sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
        var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial); sphereMesh.name = "Sphere";

        scene.add(sphereMesh);

        var coneGeometry = new THREE.ConeGeometry(1, 2, 16, 16);
        var coneMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
        var coneMesh = new THREE.Mesh(coneGeometry, coneMaterial); coneMesh.name = "Sphere";

        coneMesh.position.x = 4;

        scene.add(coneMesh);

        this.view.setScene(scene);

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.View.Builder = ViewBuilder;

    return Peanuts.Three.View.Builder;

}(Peanuts)