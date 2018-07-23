Peanuts.Three.Charts = Peanuts.Three.Charts || {}

Peanuts.Three.Charts = function () {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicMeshMaterialProvider(colors) {

		var self = this;

		return function(chart, index, data) {
			return new THREE.MeshBasicMaterial({
				wireframe: false,
	            color: colors[index]
	        });
		}
	}

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicLambertMaterialProvider(colors, textures) {

		var self = this;

		return function(chart, index, data) {
			return new THREE.MeshLambertMaterial({
				wireframe: false,
	            color: colors[index]
	        });
		}
	}


	//////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	function BasicPhongMaterialProvider(colors, textures) {

		var self = this;

		return function(chart, index, data) {
			return new THREE.MeshPhongMaterial({
				wireframe: false,
	            color: colors[index]
	        });
		}
	}


	return {
		MatProviders : {
			BasicColorProvider : BasicMeshMaterialProvider,
			BasicLambertProvider : BasicLambertMaterialProvider,
			BasicPhongProvider : BasicPhongMaterialProvider
		}
	};

}(Peanuts)