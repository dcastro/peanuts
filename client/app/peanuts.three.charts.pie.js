Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts.PieChart = function () {

	PieChart(config) { 
	
		this.data = [];
		
		this.config = config || {
			radius : 10; 
			depth: 5
		};

		this.renderable = new THREE.Group();

	}

	PieChart.prototype.setMaterialProvider(provider) {
		this.materialProvider = provider;
	}

	PieChart.prototype.setData = function(data) {

		if( data ) {

			var total = (data  || [1]).reduce(
				function(acc, val) { 
					return acc + val; 
				}
			);

			this.data = new Array(data.length);

			data.forEach(function(item) {

				
			})

		}

	}

	return PieChart;

}(Peanuts)