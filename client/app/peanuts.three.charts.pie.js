Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts.PieChart = function () {

	var MatProviders = Peanuts.Three.Charts.MatProviders;

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function PieChart(data, config, providers) { 
	
		this.renderable = new THREE.Group();

		this.renderable.rotateZ(THREE.Math.degToRad(180));
		this.renderable.rotateX(THREE.Math.degToRad(90));

		this.config = Object.assign({
			radius : 1,
			depth: 0.5
		},config);

		this.providers = Object.assign({
			geometry : new BasicCylinderGeometryProvider(),
			material : new MatProviders.BasicColorProvider(['red', 'green', 'blue'])
		}, providers );

		this.update(data);
	}

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	PieChart.prototype.update = function(data) {

		var self = this;

		self.data = data || [1];

		self.total = self.data.reduce(
			function(acc, val) { 
				return acc + val; 
			}
		);

		var startRads = 0;
		var unitRads = 360 / self.total;

		self.data.forEach(function(item, index) {

			var sizeRads = (item * unitRads);

            self.renderable.add(
            	new THREE.Mesh(
            		self.providers.geometry(self, index, startRads, sizeRads),
            		self.providers.material(self, index, item)
            	)
            );

            startRads += sizeRads;
		});
	}


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicCylinderGeometryProvider() {

		var self = this;

		return function(chart, index, startDeg, sizeDeg) {

            return new THREE.CylinderGeometry(
                chart.config.radius,	
                chart.config.radius,
                chart.config.depth,
                30,
                1,
                false,
                THREE.Math.degToRad(startDeg),
                THREE.Math.degToRad(sizeDeg)
            );
		}
	}

	return PieChart;

}(Peanuts)