'use strict';

// MODULES //

var tape = require( 'tape' );
var data = require( './../lib/data.js' );


// FUNCTIONS //

function setup() {
	return {
		'scopes': ['public_repo'],
		'note': 'beep'
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof data, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a string', function test( t ) {
	t.equal( typeof data( setup() ), 'string', 'returns a string' );
	t.end();
});

tape( 'the function sets the `scopes` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( opts );
	out = JSON.parse( out );

	t.deepEqual( out.scopes, opts.scopes, 'sets the `scopes` field' );
	t.end();
});

tape( 'the function sets the `note` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	out = data( opts );
	out = JSON.parse( out );

	t.equal( out.note, opts.note, 'sets the `note` field' );
	t.end();
});

tape( 'the function sets the `note_url` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.note_url = 'https://github.com/kgryte';

	out = data( opts );
	out = JSON.parse( out );

	t.equal( out.note_url, opts.note_url, 'sets the `note_url` field' );
	t.end();
});

tape( 'the function sets the `client_id` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.client_id = 'aaaaaaaaaaaaaaaaaaaa';

	out = data( opts );
	out = JSON.parse( out );

	t.equal( out.client_id, opts.client_id, 'sets the `client_id` field' );
	t.end();
});

tape( 'the function sets the `client_secret` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.client_secret = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

	out = data( opts );
	out = JSON.parse( out );

	t.equal( out.client_secret, opts.client_secret, 'sets the `client_secret` field' );
	t.end();
});

tape( 'the function sets the `fingerprint` field', function test( t ) {
	var opts;
	var out;

	opts = setup();
	opts.fingerprint = 'abcdefg';

	out = data( opts );
	out = JSON.parse( out );

	t.equal( out.fingerprint, opts.fingerprint, 'sets the `fingerprint` field' );
	t.end();
});
