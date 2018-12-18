function IronbarkService() { }

IronbarkService.prototype.topN = function (metric, from, to, granularity) {

    var jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoiMS4wIiwiaXNzIjoic3BvdHgtd2ViLWFwaWdhdGV3YXkiLCJhdWQiOiJzcG90eC13ZWItaXJvbmJhcmsiLCJleHAiOjE1OTk5OTk5OTksInNjb3BlIjpbIlJlcG9ydGluZyJdLCJjYXBhYmlsaXR5IjpbInJlYWQiXX0.D-79ZlnXIN0cTpiOTi6CxIeQdi4YU9iENNIYxx7u-b8";
    var promise = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:1058/Query", true);
        xhr.setRequestHeader("Authorization", `Bearer ${jwt}`)
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject("Failed calling ironbark")
                }
            }
        }

        var data = {
            "dataSource": "market.forecast.impressions",
            "interval": `${from || "2018-12-15T00:00:00+00:00"}/${to || "2018-12-15T10:00:00+00:00"}`,
            "granularity": granularity || "all",
            "grouping": {
                "dimension": "targets_geo_city",
                "limit": 1000,
                "orderBy": metric || "impressions"
            },
            "measurements": [metric || "impressions"]
        }

        xhr.send(JSON.stringify(data));
    })

    return promise;
}