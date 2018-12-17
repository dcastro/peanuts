Peanuts.Three.Assets = function (Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function BasicManager(assetPath) {

        var self = this;

        self.assets = {
            fonts : {},
            lights: {},
            textures: {},
            geometries : {}
        };

        var Loader = Peanuts.Three.Loader;

        self.loaders = {
            texture:  new Loader.Promising(new THREE.TextureLoader()),
            font: new Loader.Promising(new THREE.FontLoader())
        };

        self.loaders.texture.setPath(assetPath);
    }

    BasicManager.prototype.setAsset = function(type, id, asset)  {
        this.assets[type][id] = asset;
        return this;
    };

    BasicManager.prototype.getAsset = function(type, id)  {
        return this.assets[type][id];
    };

    BasicManager.prototype.getTexture = function(id)  {
        return this.getAsset("textures",id);
    };

    BasicManager.prototype.getFont = function(id)  {
        return this.getAsset("fonts",id);
    };

    BasicManager.prototype.loadFont = function(assetPath, id) {
        return this.loaders.font.load(assetPath).then( (asset) => {
            this.setAsset("fonts", id, asset);
        });
    };

    BasicManager.prototype.loadTexture = function(assetPath, id) {
        return this.loaders.texture.load(assetPath).then( (asset) => {
            this.setAsset("textures", id, asset);
        });
    };

    return {
        BasicManager : BasicManager
    };
}
(Peanuts)