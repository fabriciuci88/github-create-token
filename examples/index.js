'use strict';

var createToken = require( './../lib' );

var opts = {
	'token': '<your_token_goes_here>',
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
