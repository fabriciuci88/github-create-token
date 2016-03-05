'use strict';

// MODULES //

var tape = require( 'tape' );
var createToken = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof createToken, 'function', 'main export is a function' );
	t.end();
});
