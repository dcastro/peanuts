Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts.LineChart = function () {

	var MatProviders = Peanuts.Three.Charts.MatProviders;

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function LineChart(data, config, providers) { 
	
		this.renderable = new THREE.Group();

		this.config = Object.assign({
			height : 5,
			width: 10,
			depth: 2,
			space: 1
		},config);

		this.providers = Object.assign({
			geometry : new BasicLineProvider()
		}, providers );

		this.update(data);
	}

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	LineChart.prototype.update = function(data) {

		var self = this;

		self.data = data || [1];

		self.total = self.data.reduce(
			function(acc, val) { 
				return acc + val; 
			}
		);

		self.max = self.data.reduce(
			function(acc, val) { 
				return Math.max(acc,val); 
			}
		);

		var unitHeight = self.config.height / self.max;
		var unitWidth = self.config.width / data.length;

		var group = new THREE.Group();

		self.data.forEach(function(item, index) {

			var height = (item * unitHeight);

			var mesh =  new THREE.Mesh(
        		self.providers.geometry(self, index, height, unitWidth, self.config.depth),
        		self.providers.material(self, index, item)
        	);

			mesh.translateY(height/2);
			mesh.translateX(unitWidth/2);
        	mesh.translateX(index * unitWidth);

            group.add(mesh);

		});

		group.translateX((self.config.width/2) * -1);
		group.translateY((self.config.height/2) * -1);

		self.renderable.add(group);
	}

	//////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicLineProvider() {

		var self = this;

		return function(chart, index, height, width, depth) {

            return new THREE.CylinderGeometry(
                width/2,
                width/2,
                height,
                20,
                1,
                false,
                THREE.Math.degToRad(0),
                THREE.Math.degToRad(360)
            );

		}
	}

	return LineChart;

}(Peanuts)