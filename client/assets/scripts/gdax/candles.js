
function Candles() {}

Candles.prototype.fetch = function(product, granularity, start, end, handler) {

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api.gdax.com/products/"+product+"/candles?granularity=" + granularity + "&start=" + start + "&end=" + end, true);

	xhr.onreadystatechange = function() {

	  	if (xhr.readyState == 4) {

	    	var resp = JSON.parse(xhr.responseText);

	    	handler(resp);

		}
		
	};

	xhr.send();
}