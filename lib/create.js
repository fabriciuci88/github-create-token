'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var copy = require( 'utils-copy' );
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var query = require( './query.js' );


// CREATE //

/**
* FUNCTION: create( options, clbk )
*	Creates a token.
*
* @param {Object} options - function options
* @param {String} options.username - Github username
* @param {String} options.password - Github password
* @param {String[]} options.scopes - list of scopes
* @param {String} options.note - note regarding the purpose of the token
* @param {String} [options.otp] - Github one-time password
* @param {String} [options.note_url] - application URL
* @param {String} [options.client_id] - app OAuth client id
* @param {String} [options.client_secret] - app OAuth client secret
* @param {String} [options.fingerprint] - unique token id
* @param {String} [options.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for creating a token
*/
function create( options, clbk ) {
	var opts;
	var err;
	opts = copy( defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	query( opts, done );
	/**
	* FUNCTION: done( error, data, info )
	*	Callback invoked after receiving an API response.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object[]} data - query data
	* @param {Object} info - response info
	* @returns {Void}
	*/
	function done( error, data, info ) {
		error = error || null;
		data = data || null;
		info = info || null;
		clbk( error, data, info );
	} // end FUNCTION done()
} // end FUNCTION create()


// EXPORTS //

module.exports = create;
