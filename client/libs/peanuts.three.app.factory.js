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
            .withDatGui()
            .withStats()
            .build();

        return app;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    AppFactory.prototype.createDemoGLOrthograpicApp = function (container) {

        var app = this.appBuilder
            .withGLRenderer()
            .withOrthograpicView()
            .withDatGui()
            .build();

        return app;
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.App.Factory = AppFactory;

    return Peanuts.Three.App.Factory;

}
(Peanuts)