'use strict';

var createToken = require( './../lib' );

var opts = {
	'username': '<username>',
	'password': '<password>',
	'otp': '<otp>',
	'scopes': [ 'public_repo' ],
	'note': 'for my beepboop app',
	'useragent': 'beep-boop-bop'
};

createToken( opts, clbk );

function clbk( error, results, info ) {
	if ( info ) {
		console.error( info );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
