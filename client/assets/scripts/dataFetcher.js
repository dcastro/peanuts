function DataFetcher() {}

DataFetcher.prototype.fetch = function(url, handler) {

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {

            var resp = JSON.parse(xhr.responseText);

            handler(resp);

        }
        
    };

    xhr.send();
}

