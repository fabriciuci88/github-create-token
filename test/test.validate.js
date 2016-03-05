'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'file exports a validation function', function test( t ) {
	t.equal( typeof validate, 'function', 'file exports a function' );
	t.end();
});

tape( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `token` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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
		err = validate( {}, {
			'token': values[i],
			'scopes': ['public_repo'],
			'note': 'beep'
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'a `token` option is required', function test( t ) {
	var err = validate( {}, {
		'scopes': ['public_repo'],
		'note': 'beep'
	});
	t.ok( err instanceof TypeError, 'a token option is required' );
	t.end();
});

tape( 'if provided a `useragent` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': 'beep',
			'useragent': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `scopes` option which is not a string array, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		['beep',null],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'token': 'abcdefg',
			'note': 'beep',
			'scopes': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'a `scopes` option is required', function test( t ) {
	var err = validate( {}, {
		'token': 'abcdefg',
		'note': 'beep'
	});
	t.ok( err instanceof TypeError, 'a scopes option is required' );
	t.end();
});

tape( 'if provided a `note` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'a `note` option is required', function test( t ) {
	var err = validate( {}, {
		'token': 'abcdefg',
		'scopes': ['public_repo']
	});
	t.ok( err instanceof TypeError, 'a note option is required' );
	t.end();
});

tape( 'if provided a `note_url` option which is not a valid URI, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'beep',
		'be/ep/bo',
		'//beep',
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': 'beep',
			'note_url': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `client_id` option which is not a 20-character primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'beep',
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': 'beep',
			'client_id': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `client_secret` option which is not a 40-character primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'beep',
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': 'beep',
			'client_secret': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'if provided a `fingerprint` option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
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
		err = validate( {}, {
			'token': 'abcdefg',
			'scopes': ['public_repo'],
			'note': 'beep',
			'fingerprint': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var options;
	var opts;
	var err;

	options = {
		'token': 'abcdefg',
		'useragent': 'beeper-booper',
		'scopes': ['public_repo'],
		'note': 'beep',
		'note_url': 'https://github.com/kgryte',
		'client_id': 'aaaaaaaaaaaaaaaaaaaa',
		'client_secret': 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		'fingerprint': 'abcdefg12345678'
	};

	opts = {};
	err = validate( opts, options );

	t.equal( err, null, 'returns null' );
	t.deepEqual( opts, options, 'sets all options' );

	t.end();
});

tape( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'token': 'abcdefg',
		'scopes': ['public_repo'],
		'note': 'beep',
		'beep': 'boop',
		'a': 5,
		'b': null,
		'c': 'woot'
	});
	t.equal( err, null, 'returns null' );

	t.end();
});
