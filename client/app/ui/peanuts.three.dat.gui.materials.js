Peanuts.Three.DatGui = Peanuts.Three.DatGui || {};
Peanuts.Three.DatGui.Helpers = Peanuts.Three.DatGui.Helpers || {};

Peanuts.Three.DatGui.Helpers.Materials = function(Peanuts) {

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
    var LineBasicMaterialSettingsUIHelper = {

        defaults: {
            lights: false,
            linewidth:1,
            color:"#ff0000"
        },
        options: {},

        add : function (gui, settings, options, onChange) {

            settings = Peanuts.Peanut.mixin(this.defaults, parameters);
            options = Peanuts.Peanut.mixin(this.options, options);

            var controllers = [];

            controllers.push(gui.add(settings, 'lights'));
            controllers.push(gui.add(settings, 'linewidth',0.1,10));
            controllers.push(gui.addColor(settings, 'color'));

            onChangeMapper(controllers, onChange, settings);
        }

    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var MeshBasicMaterialSettingsUIHelper = {

        defaults: {
            color:"#ffffff",
            wireframe: false,
            map: null
        },

        options: {
            map: ["none"]
        },

        add : function (gui, settings, options, onChange) {

            settings = Peanuts.Peanut.mixin(this.defaults, settings);
            options = Peanuts.Peanut.mixin(this.options, options);

            var controllers = [];

            controllers.push(gui.add(settings, 'wireframe'));
            controllers.push(gui.addColor(settings, 'color'));
            controllers.push(gui.add(settings, 'map', options.map));
            
            onChangeMapper(controllers, onChange, settings);
        }

    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var MeshLambertMaterialSettingsUIHelper = {

        defaults: {
            color:"#ffffff",
            wireframe: false,
            opacity: 1,
            map: null,
            specularMap: null
        },

        options: {
            map: ["none"],
            specularMap: ["none"]
        },

        add : function (gui, settings, options, onChange) {

            settings = Peanuts.Peanut.mixin(this.defaults, settings);
            options = Peanuts.Peanut.mixin(this.options, options);

            var controllers = [];

            controllers.push(gui.add(settings, 'wireframe'));
            controllers.push(gui.addColor(settings, 'color'));
            controllers.push(gui.add(settings, 'opacity', 0, 1));
            controllers.push(gui.add(settings, 'map', options.map));
            controllers.push(gui.add(settings, 'specularMap', options.specularMap));

            onChangeMapper(controllers, onChange, settings);
        }

    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var MeshPhongMaterialSettingsUIHelper = {

        defaults: {
            color:"#ffffff",
            wireframe: false,
            map: null,
            specularMap: null,
            normalMap: null
        },

        options: {
            map: ["none"],
            specularMap: ["none"],
            normalMap: ["none"]
        },

        add : function (gui, settings, options, onChange) {

            settings = Peanuts.Peanut.mixin(this.defaults, settings);
            options = Peanuts.Peanut.mixin(this.options, options);

            var controllers = [];

            controllers.push(gui.add(settings, 'wireframe'));
            controllers.push(gui.addColor(settings, 'color'));
            controllers.push(gui.add(settings, 'map', options.map));
            controllers.push(gui.add(settings, 'specularMap', options.specularMap));
            controllers.push(gui.add(settings, 'normalMap', options.normalMap));

            onChangeMapper(controllers, onChange, settings);
        }

    };

    return {
        LineBasic: LineBasicMaterialSettingsUIHelper,
        MeshBasic: MeshBasicMaterialSettingsUIHelper,
        MeshLambert: MeshLambertMaterialSettingsUIHelper,
        MeshPhong: MeshPhongMaterialSettingsUIHelper
    };

}(Peanuts);