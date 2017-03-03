Peanuts.Three.DatGui.Helpers.Geometry = function(Peanuts) {

    var onChangeMapper = function(controllers, onChange, settings) {

        if(onChange) {

            controllers.map(function (controller) {
                controller.__onChange = function() {
                    onChange(settings);
                };
            });

            onChange(settings);
        }

    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var SphereSettingsUIHelper = {

        defaults: {
            radius: 1,
            widthSegments:16,
            heightSegments:16,
            phiStart: 0,
            phiLength: Math.PI*2,
            thetaStart: 0,
            thetaLength: Math.PI
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'radius'));
            controllers.push(gui.add(settings, 'widthSegments',3,20));
            controllers.push(gui.add(settings, 'heightSegments',3,20));
            controllers.push(gui.add(settings, 'phiLength',0, Math.PI*2));
            controllers.push(gui.add(settings, 'thetaLength',0, Math.PI));
            controllers.push(gui.add(settings, 'phiStart',0, Math.PI*2));
            controllers.push(gui.add(settings, 'thetaStart',0, Math.PI*2));

            onChangeMapper(controllers, onChange, settings);
        }

    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var BoxSettingsUIHelper = {

        defaults: {
            width : 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'width',1,20));
            controllers.push(gui.add(settings, 'height',1,20));
            controllers.push(gui.add(settings, 'depth',1,20));
            controllers.push(gui.add(settings, 'widthSegments',0, 20));
            controllers.push(gui.add(settings, 'heightSegments',0, 20));
            controllers.push(gui.add(settings, 'depthSegments',0, 20));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var CircleSettingsUIHelper = {

        defaults: {
            radius:1,
            segments:20,
            thetaStart:0,
            thetaLength: Math.PI*2
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'radius',1,40));
            controllers.push(gui.add(settings, 'segments',1,40));
            controllers.push(gui.add(settings, 'thetaLength',0, Math.PI*2));
            controllers.push(gui.add(settings, 'thetaStart',0, Math.PI*2));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var ConeSettingsUIHelper = {

        defaults: {
            openEnded:false,
            radius:1,
            height:1,
            radialSegments:10,
            heightSegments:10,
            thetaStart:0,
            thetaLength: Math.PI*2
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'openEnded',false));
            controllers.push(gui.add(settings, 'radius',1,40));
            controllers.push(gui.add(settings, 'height',1,40));
            controllers.push(gui.add(settings, 'radialSegments',1, 40));
            controllers.push(gui.add(settings, 'heightSegments',1, 40));
            controllers.push(gui.add(settings, 'thetaLength',0, Math.PI*2));
            controllers.push(gui.add(settings, 'thetaStart',0, Math.PI*2));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var CylinderSettingsUIHelper = {

        defaults: {
            radiusTop:1,
            radiusBottom:1,
            height:1,
            radiusSegments:20,
            heightSegments:5,
            openEnded:false,
            thetaStart:0,
            thetaLength: Math.PI*2
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'openEnded',false));
            controllers.push(gui.add(settings, 'radiusTop',1,40));
            controllers.push(gui.add(settings, 'radiusBottom',1,40));
            controllers.push(gui.add(settings, 'height',1,40));
            controllers.push(gui.add(settings, 'radiusSegments',1, 40));
            controllers.push(gui.add(settings, 'heightSegments',1, 40));
            controllers.push(gui.add(settings, 'thetaLength',0, Math.PI*2));
            controllers.push(gui.add(settings, 'thetaStart',0, Math.PI*2));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var DodecahedronSettingsUIHelper = {

        defaults: {
            radius:1
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'radius',1,40));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var IcosahedronSettingsUIHelper = {

        defaults: {
            radius:1
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'radius',1,40));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var OctahedronSettingsUIHelper = {

        defaults: {
            radius:1
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'radius',1,40));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var PlaneSettingsUIHelper = {

        defaults: {
            width:1,
            height:1,
            widthSegments:2,
            heightSegments:2
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'width',1,40));
            controllers.push(gui.add(settings, 'height',1,40));
            controllers.push(gui.add(settings, 'widthSegments',1,40));
            controllers.push(gui.add(settings, 'heightSegments',1,40));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var RingSettingsUIHelper = {

        defaults: {
            innerRadius: 0.5,
            outerRadius: 1,
            thetaSegments:10,
            phiSegments:10,
            thetaStart:0,
            thetaLength: Math.PI*2
        },

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

            var controllers = [];

            controllers.push(gui.add(settings, 'innerRadius',1,40));
            controllers.push(gui.add(settings, 'outerRadius',1.5,40));
            //controllers.push(gui.add(settings, 'thetaSegments',3,40));
            //controllers.push(gui.add(settings, 'phiSegments',4,40));
            controllers.push(gui.add(settings, 'thetaStart',0,Math.PI*2));
            controllers.push(gui.add(settings, 'thetaLength',0,Math.PI*2));

            onChangeMapper(controllers, onChange, settings);
        }
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var GeometrySettingsHelpers =  {
        Sphere: SphereSettingsUIHelper,
        Box: BoxSettingsUIHelper,
        Circle: CircleSettingsUIHelper,
        Cone: ConeSettingsUIHelper,
        Cylinder: CylinderSettingsUIHelper,
        Dodecahedron: DodecahedronSettingsUIHelper,
        Icosahedron: IcosahedronSettingsUIHelper,
        Octahedron: OctahedronSettingsUIHelper,
        Plane: PlaneSettingsUIHelper,
        Ring: RingSettingsUIHelper
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.DatGui.Helpers.Geometry = GeometrySettingsHelpers;

    return Peanuts.Three.DatGui.Helpers.Geometry;

}(Peanuts);