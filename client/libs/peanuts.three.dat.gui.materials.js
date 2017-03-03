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

        add : function (gui, parameters, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);

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

        add : function (gui, parameters, options, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);
            var options = Peanuts.Object.mixin(this.options, options);

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
            map: null
        },

        options: {
            map: ["none"]
        },

        add : function (gui, parameters, options, onChange) {

            var settings = Peanuts.Object.mixin(this.defaults, parameters);
            var options = Peanuts.Object.mixin(this.options, options);

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
    var MaterialsSettingsHelpers =  {
        LineBasic: LineBasicMaterialSettingsUIHelper,
        MeshBasic: MeshBasicMaterialSettingsUIHelper,
        MeshLambert: MeshLambertMaterialSettingsUIHelper
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    Peanuts.Three.DatGui.Helpers.Materials = MaterialsSettingsHelpers;

    return Peanuts.Three.DatGui.Helpers.Materials;

}(Peanuts);