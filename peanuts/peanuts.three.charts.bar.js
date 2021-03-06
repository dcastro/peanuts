Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts.BarChart = function () {

	var MatProviders = Peanuts.Three.Charts.MatProviders;

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BarChart(data, config, providers) { 
	
		this.renderable = new THREE.Group();

		this.config = Object.assign({
			height : 5,
			width: 10,
			depth: 2,
			space: 1
		},config);

		this.providers = Object.assign({
			geometry : new BasicBarGeometryProvider(),
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
	BarChart.prototype.update = function(data) {

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
	function BasicBarGeometryProvider() {

		var self = this;

		return function(chart, index, height, width, depth) {	
			return new THREE.BoxGeometry(
                width - (width/10),
                height,
                depth,
                1,
                1,
                1
            );
		}
	}


	//////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicCylinderGeometryProvider() {

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

	return BarChart;

}(Peanuts)