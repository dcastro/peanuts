var Peanuts = function() {

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	var Peanut = function() {};

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	Peanut.prototype.mixin = function ( obj, source ) {

		if ( Object.keys ) {

			var keys = Object.keys( source );

			for (var i = 0, il = keys.length; i < il; i++) {

				var prop = keys[i];

				Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );

			}

		} else {

			var safeHasOwnProperty = {}.hasOwnProperty;

			for ( var prop in source ) {

				if ( safeHasOwnProperty.call( source, prop ) ) {

					obj[prop] = source[prop];

				}

			}

		}

		return obj;
	};

    //////////////////////////////////////////////////////////
    //
    //////////////////////////////////////////////////////////
	Peanut.prototype.selfInvoke = function(self, func) {
		return function() {
			return func.apply(self, arguments);
		}
	}

	return {
		Peanut : new Peanut(),
		Three : {}
	};

}();