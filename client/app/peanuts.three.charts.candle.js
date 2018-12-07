Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts.CandleChart = function () {

	var MatProviders = Peanuts.Three.Charts.MatProviders;

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function CandleChart(data, config, providers) { 
	
		this.renderable = new THREE.Group();

		this.config = Object.assign({
			height : 5,
			width: 10,
			depth: 2,
			space: 1
		},config);

		this.providers = Object.assign({
			geometry : new BasicCandleProvider()
		}, providers );

		this.update(data);
	}

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	CandleChart.prototype.update = function(data) {

		var self = this;

		self.data = data || [{
			min: 0,
			max: 0,
			open: 0,
			close: 0
		}];

		self.min = self.data.reduce(
			function(acc, val) { 
				return Math.min(acc,val.max); 
			}, self.data[0].min
		);

		self.max = self.data.reduce(
			function(acc, val) { 
				return Math.max(acc,val.max); 
			}, self.data[0].max
		);

		var unitHeight = self.config.height / (self.max - self.min);
		var unitWidth = self.config.width / data.length;

		var group = new THREE.Group();

		self.data.forEach(function(item, index) {

			var candleHeight = Math.abs(item.max - item.min) * unitHeight;
			var candleWidth = unitWidth;
			var candleDepth = self.config.depth;
			var bodyHeight = Math.abs(item.open - item.close) * unitHeight;
			var bodyOffset = (Math.min(item.open, item.close) - item.min) * unitHeight;

			var obj = self.providers.geometry(
				self, 
				index, 
				item, 
				candleHeight, 
				candleWidth,
				candleDepth,
				bodyHeight, 
				bodyOffset
			);

			obj.translateY((unitHeight * item.min) + (candleHeight / 2));
			obj.translateX(unitWidth/2);
        	obj.translateX(index * unitWidth);

            group.add(obj);

		});

		group.translateX((self.config.width/2) * -1);
		group.translateY((self.config.height/2) * -1);
		group.translateY((unitHeight * self.min) * -1);

		self.renderable.add(group);
	}


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicCandleProvider(materialProvider) {

		var self = this;

		self.materialProvider = materialProvider;

		return function(chart, index, item, height, width, depth, bodyHeight, bodyOffset) {

			var material = new THREE.MeshPhongMaterial({
	            color: new THREE.Color( 
	            	item.close >= item.open ? "green" : "red"
	            )
	    	});

            var candle = new THREE.Mesh( 
            	new THREE.BoxGeometry(
                	width / 10,
               	 	height,
                	depth / 10,
                	1,1,1
            	), material
            );

			var body = new THREE.Mesh( 
				new THREE.BoxGeometry(
                	width - (width/10),
                	bodyHeight,
                	depth - (depth/10),
                	1,1,1
            	), material
            );

			body.translateY(-height/2);
            body.translateY(bodyHeight/2);
            body.translateY(bodyOffset);

            var group = new THREE.Group();

            group.add(candle);
            group.add(body);

            return group;
		}
	}

	return CandleChart;

}(Peanuts)