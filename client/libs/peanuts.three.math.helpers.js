Peanuts.Three.Math.Helpers = function(Peanuts) {

	var PolarHelper = {

		polarToCartesian : function(radius, alpha, polar) {
			var position = new THREE.Vector3(
				radius * Math.sin(polar) * Math.cos(alpha),
				radius * Math.sin(polar) * Math.sin(alpha),
				radius * Math.cos(polar)
			);

			return position;
		}
	}

    var MathHelpers = {
    	Polar: PolarHelper
    };

    console.log('returning math helpers', MathHelpers);

    return MathHelpers;

}(Peanuts);