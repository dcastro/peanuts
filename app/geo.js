// TODO: Merge with druid request

var geoData;

/**
 * Load maxmind csv and return promise of it, keyed by location id.
 */
async function initGeoData() {
    if (geoData) {
        return Promise.resolve(geoData);
    }

    const geoAssetUrl = "/assets/geo/GeoLiteCity-Location.csv";
    return new Promise((resolve, reject) => {
        Papa.parse(geoAssetUrl, {
            download: true,
            worker: true,
            comments: 'Copyright',
            header: true,
            skipEmptyLines: 'greedy',
            complete:
                (results) => {
                    if (results.errors.length > 0) {
                        reject(results.errors);
                    } else {
                        // keys: locId,country,region,city,postalCode,latitude,longitude,metroCode,areaCode
                        geoData = _.mapKeys(results.data, (v) => v.locId)
                        resolve(geoData);
                    }
                }
        });
    });

}

/**
 * Enhance data by lat and lng attributes.
 * @param {*} data
 */
async function addLatLng(data) {
    const geo = await initGeoData();
    for (var i = 0; i < data.length; i++) {
        if (!geo[data[i].locId]) {
            throw new Error('No location data for ' + JSON.stringify(data[i]))
        }
        data[i].lat = geo[data[i].locId].latitude;
        data[i].lng = geo[data[i].locId].longitude;
    }
    return Promise.resolve();
}


var druidResponseData = [{ locId: 63 }];
addLatLng(druidResponseData).then(() => {
    console.log(druidResponseData);
});

