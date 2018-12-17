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
     * Url of maxmind csv file.
     */
    const geoAssetUrl = "/assets/geo/GeoLiteCity-Location.csv";

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
            data[i].lat = dataCache[data[i].targets_geo_city].latitude;
            data[i].lng = dataCache[data[i].targets_geo_city].longitude;
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

        return new Promise((resolve, reject) => {
            Papa.parse(geoAssetUrl, {
                download: true,
                worker: true,
                comments: 'Copyright',
                header: true,
                skipEmptyLines: 'greedy',
                complete: (results) => {
                    if (results.errors.length > 0) {
                        reject(results.errors);
                    } else {
                        // keys: locId,country,region,city,postalCode,latitude,longitude,metroCode,areaCode
                        dataCache = _.mapKeys(results.data, (v) => v.locId)
                        resolve(dataCache);
                    }
                }
            });
        });

    }

    init();
    return new GeoData();
};
