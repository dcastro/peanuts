var GeoDataHelper = function () {

    /**
     * Constructor.
     */
    var GeoData = function () { };

    /**
     * Cache of transformed geo file.
     */
    var dataCache;

    /**
     * Url of maxmind json data.
     */
    const geoAssetUrl = "/assets/geo/geo-data.json";

    /**
     * Enhance data by lat and lng attributes.
     * @param {*} data
     */
    GeoData.prototype.addLatLng = function (data) {
        if (!dataCache) {
            throw new Error('geo data not available yet');
        }
        for (var i = 0; i < data.length; i++) {
            if (!dataCache[data[i].targets_geo_city]) {
                console.log('No location data for ' + JSON.stringify(data[i]))
                continue;
            }
            data[i].lat = dataCache[data[i].targets_geo_city][0];
            data[i].lng = dataCache[data[i].targets_geo_city][1];
        }
        return data;
    }

    /**
     * Load maxmind csv and return promise of it, keyed by location id.
     * @private
     */
    GeoData.prototype.init = async function () {
        if (dataCache) {
            return Promise.resolve(dataCache);
        }

        const response = await fetch(geoAssetUrl);
        dataCache = await response.json();
    }

    return new GeoData();
};

