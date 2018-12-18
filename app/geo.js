var GeoDataHelper = function () {

    /**
     * Constructor.
     */
    var GeoData = function () { };

    /**
     * Enhance data by lat and lng attributes.
     * @param {*} data
     */
    GeoData.prototype.addLatLng = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (!GeoDataMap[data[i].targets_geo_city]) {
                console.log('No location data for ' + JSON.stringify(data[i]))
                continue;
            }
            data[i].lat = GeoDataMap[data[i].targets_geo_city][0] / 10000.0;
            data[i].lng = GeoDataMap[data[i].targets_geo_city][1] / 10000.0;
        }
        return data;
    }

    return new GeoData();
};

