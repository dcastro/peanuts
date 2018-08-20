Peanuts.Three.Loader = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function PromisingLoader(loader) {
        this.loader = loader;
    };

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    PromisingLoader.prototype.setPath = function(path){
        this.loader.setPath(path);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    PromisingLoader.prototype.load = function(url) {
        var self = this;
        return new Promise(resolve => {
            self.loader.load(url, resolve);
        });
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    function CachingLoader(loader, cache) {
        this.loader = loader;
        this.cache = cache || {};
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    CachingLoader.prototype.setPath = function(path){
        this.loader.setPath(path);
    }

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    CachingLoader.prototype.load = function(url) {
        if(this.cache[url]) { 
            return Promise.resolve(this.cache[url]);
        } else {
            return loader.load(url, resolve).then(asset => {
                this.cache[url] = asset;
            });
        }
    }

    return {
        Promising : PromisingLoader,
        Caching: CachingLoader
    };

}(Peanuts)