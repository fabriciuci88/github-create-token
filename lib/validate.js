'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isStringArray = require( 'validate.io-string-primitive-array' );
var isURI = require( 'validate.io-uri' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.token - Github access token
* @param {String[]} options.scopes - list of scopes
* @param {String} options.note - note regarding the purpose of the token
* @param {String} [options.note_url] - application URL
* @param {String} [options.client_id] - app OAuth client id
* @param {String} [options.client_secret] - app OAuth client secret
* @param {String} [options.fingerprint] - unique token id
* @param {String} [options.useragent] - user agent string
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.token = options.token;
	if ( !isString( opts.token ) ) {
		return new TypeError( 'invalid option. `token` option must be a string primitive. Option: `' + opts.token + '`.' );
	}
	opts.scopes = options.scopes;
	if ( !isStringArray( opts.scopes ) ) {
		return new TypeError( 'invalid option. `scopes` option must be a string array. Option: `' + opts.scopes + '`.' );
	}
	opts.note = options.note;
	if ( !isString( opts.note ) ) {
		return new TypeError( 'invalid option. `note` option must be a string primitive. Option: `' + opts.note + '`.' );
	}
	if ( options.hasOwnProperty( 'note_url' ) ) {
		opts.note_url = options.note_url;
		if ( !isURI( opts.note_url ) ) {
			return new TypeError( 'invalid option. `note_url` option must be a valid URI. Option: `' + opts.note_url + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'client_id' ) ) {
		opts.client_id = options.client_id;
		if ( !isString( opts.client_id ) || opts.client_id.length !== 20 ) {
			return new TypeError( 'invalid option. `client_id` option must be a 20-character string primitive. Option: `' + opts.client_id + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'client_secret' ) ) {
		opts.client_secret = options.client_secret;
		if ( !isString( opts.client_secret ) || opts.client_secret.length !== 40 ) {
			return new TypeError( 'invalid option. `client_secret` option must be a 40-character string primitive. Option: `' + opts.client_secret + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'fingerprint' ) ) {
		opts.fingerprint = options.fingerprint;
		if ( !isString( opts.fingerprint ) ) {
			return new TypeError( 'invalid option. `fingerprint` option must be a string primitive. Option: `' + opts.fingerprint + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
