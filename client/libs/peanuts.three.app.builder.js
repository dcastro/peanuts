Peanuts.Three.App.Builder = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function AppBuilder(domElement) {

        this.app = new Peanuts.Three.App.App(domElement);

        return this;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.build = function () {

        this.app.initialise();

        return this.app;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withGLRenderer = function () {

        this.app.setRenderer(
            new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
        );

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withPerspectiveView = function () {

        console.log(Peanuts.Three);

        var viewBuilder = new Peanuts.Three.View.Builder(this.app);

        this.app.setView(viewBuilder
            .withPerspectiveCamera()
            .withOrbitControls()
            .withTestScene()
            .build()
        );

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withOrthograpicView = function () {

        var viewBuilder = new Peanuts.Three.View.Builder(this.app);

        this.app.setView(viewBuilder
            .withOrthographicCamera()
            .withOrbitControls()
            .withTestScene()
            .build()
        );

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withDatGui = function () {

        this.app.datGui = new dat.GUI({autoPlace: false});
        this.app.datGui.domElement.style.top = "0px";
        this.app.datGui.domElement.style.right = "0px";
        this.app.datGui.domElement.style.position = "Absolute";
        this.app.domElement.appendChild(this.app.datGui.domElement);

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withAudio = function () {

        this.app.audio = new Peanuts.Audio.SimplePlayer();

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppBuilder.prototype.withStats = function () {

        this.app.stats = new Stats();
        this.app.stats.domElement.style.top = "0px";
        this.app.stats.domElement.style.left = "0px";
        this.app.stats.domElement.style.position = "Absolute";
        this.app.domElement.appendChild(this.app.stats.domElement);

        return this;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.App.Builder = AppBuilder;

    return Peanuts.Three.App.Builder;

}
(Peanuts)