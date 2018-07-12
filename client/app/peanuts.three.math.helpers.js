Peanuts.Three.Math = Peanuts.Three.Math || {};

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

    return MathHelpers;

}(Peanuts);