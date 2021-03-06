Peanuts.Three.App = Peanuts.Three.App || {}

Peanuts.Three.App.Factory = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function AppFactory(domElement) {

        this.appBuilder = new Peanuts.Three.App.Builder(domElement);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppFactory.prototype.createDemoGLPerspectiveApp = function () {

        var app = this.appBuilder
            .withGLRenderer()
            .withPerspectiveView()
            .withBasicAssetManager()
            .withDatGui()
            //.withStats()
            .build();

        return app;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppFactory.prototype.createDemoGLOrthographicApp = function (container) {

        var app = this.appBuilder
            .withGLRenderer()
            .withOrthograpicView()
            .withBasicAssetManager()
            .withDatGui()
            .build();

        return app;
    }

    return AppFactory;
}
(Peanuts)