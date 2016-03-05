'use strict';

// MODULES //

var debug = require( 'debug' )( 'github-create-token:data' );
var lpad = require( 'utils-left-pad-string' );


// DATA //

/**
* FUNCTION: data( opts )
*	Extracts data to be posted to a remote endpoint.
*
* @param {String[]} opts.scopes - list of scopes
* @param {String} opts.note - note regarding the purpose of the token
* @param {String} [opts.note_url] - application URL
* @param {String} [opts.client_id] - app OAuth client id
* @param {String} [opts.client_secret] - app OAuth client secret
* @param {String} [opts.fingerprint] - unique token id
* @returns {String} data to post
*/
function data( opts ) {
	var out;
	var str;

	out = {};

	out.scopes = opts.scopes;
	debug( 'Token scopes: %s', opts.scopes );

	out.note = opts.note;
	debug( 'Token note: %s', opts.note );

	if ( opts.note_url ) {
		out.note_url = opts.note_url;
		debug( 'Token note URL: %s', opts.note_url );
	}
	if ( opts.client_id ) {
		out.client_id = opts.client_id;
		str = opts.client_id.substring( opts.client_id.length-4 );
		str = lpad( str, 20, 'x' );
		debug( 'Token client id: %s', str );
	}
	if ( opts.client_secret ) {
		out.client_secret = opts.client_secret;
		str = opts.client_secret.substring( opts.client_secret.length-4 );
		str = lpad( str, 40, 'x' );
		debug( 'Token client secret: %s', str );
	}
	if ( opts.fingerprint ) {
		out.fingerprint = opts.fingerprint;
		debug( 'Token fingerprint: %s', opts.fingerprint );
	}
	return JSON.stringify( out );
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
