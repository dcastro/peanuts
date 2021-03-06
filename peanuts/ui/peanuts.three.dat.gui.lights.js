Peanuts.Three.DatGui = Peanuts.Three.DatGui || {};
Peanuts.Three.DatGui.Helpers = Peanuts.Three.DatGui.Helpers || {};

Peanuts.Three.DatGui.Helpers.Lights = function(Peanuts) {

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
    var AmbientLightSettingsUIHelper = {

        defaults: {
            color:"#ffffff"
        },

        add : function (gui, settings, options, onChange) {
            
            settings = Peanuts.Peanut.mixin(this.defaults, settings);
            options = Peanuts.Peanut.mixin(this.defaults, options);

            var controllers = [];

            controllers.push(gui.addColor(settings, 'color'));

            onChangeMapper(controllers, onChange, settings);
        }

    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    var DirectionalLightSettingsUIHelper = {

        defaults: {
            color:"#ffffff",
            intensity: 3,
            distance: 3,
            phi: 0,
            theta: Math.PI
        },

        add : function (gui, settings, options, onChange) {
            
            settings = Peanuts.Peanut.mixin(this.defaults, settings);
            options = Peanuts.Peanut.mixin(this.defaults, options);

            var controllers = [];

            controllers.push(gui.addColor(settings, 'color'));
            controllers.push(gui.add(settings, 'intensity',0,10));
            controllers.push(gui.add(settings, 'distance',0,5));
            controllers.push(gui.add(settings, 'phi',0,Math.PI*2));
            controllers.push(gui.add(settings, 'theta',0,Math.PI*2));
            

            onChangeMapper(controllers, onChange, settings);
        }

    };

    return {
        Ambient: AmbientLightSettingsUIHelper,
        Directional: DirectionalLightSettingsUIHelper
    };

}(Peanuts);