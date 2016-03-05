'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var create = require( './../lib/create.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );
var info = require( './fixtures/info.json' );


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof create, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws if provided an invalid options argument', function test( t ) {
	var values;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			create({
				'username': value,
				'password': 'boop',
				'scopes': ['public_repo'],
				'note': 'beep'
			}, noop );
		};
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			create( opts, value );
		};
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when creating a token (no rate limit info)', function test( t ) {
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./query.js': query
	});

	opts = getOpts();
	create( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when creating a token', function test( t ) {
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./query.js': query
	});

	opts = getOpts();
	create( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), null, info );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./query.js': query
	});

	expected = data;

	opts = getOpts();
	create( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data, info );
		}
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback', function test( t ) {
	var expected;
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./query.js': query
	});

	expected = info;

	opts = getOpts();
	create( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data, info );
		}
	}

	function done( error, data, info ) {
		t.deepEqual( info, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns rate limit info to a provided callback (error)', function test( t ) {
	var expected;
	var create;
	var opts;

	create = proxyquire( './../lib/create.js', {
		'./query.js': query
	});

	expected = info;

	opts = getOpts();
	create( opts, done );

	function query( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ), null, info );
		}
	}

	function done( error, data, info ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );

		t.equal( data, null, 'data is null' );

		t.deepEqual( info, expected, 'deep equal' );

		t.end();
	}
});
