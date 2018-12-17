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
			height: 0.5
		},config);

		this.providers = Object.assign({
			geometry : new BasicCylinderProvider(),
			material : new MatProviders.BasicPhongProvider([
				"rgba(30, 145, 214, 1)",
				"rgba(0, 114, 187, 1)",
				"rgba(228, 204, 55, 1)",
				"rgba(140, 198, 63, 1)",
				"rgba(225, 131, 53, 1)"
			])
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

		var startAngle = 0;
		var unitAngle = 360 / self.total;

		self.data.forEach(function(item, index) {

			var sizeAngle = (item * unitAngle);

            self.renderable.add(
            	new THREE.Mesh(
            		self.providers.geometry(self, index, item, startAngle, sizeAngle),
            		self.providers.material(self, index, item)
            	)
            );

            startAngle += sizeAngle;
		});
	}


    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicCylinderProvider() {

		var self = this;

		return function(chart, index, item, startAngle, sizeAngle) {

            return new THREE.CylinderGeometry(
                chart.config.radius,
                chart.config.radius,
                chart.config.height,
                30,
                1,
                false,
                THREE.Math.degToRad(startAngle),
                THREE.Math.degToRad(sizeAngle)
            );
		}
	}

	return PieChart;

}(Peanuts)