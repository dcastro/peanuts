Peanuts.Three.Loader = function(Peanuts) {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
    PromisingLoader = function() {
        this.load = function(loader, url) {
            return new Promise(resolve => {
                loader.load(url, resolve);
            });
        }
        return this;
    };

    return  {
        Promising : PromisingLoader 
    };

 
}(Peanuts)