Create Token
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Create][github-create-token] a Github OAuth access [token][github-token].


## Installation

``` bash
$ npm install github-create-token
```


## Usage

``` javascript
var createToken = require( 'github-create-token' );
```

<a name="create-token"></a>
#### createToken( options, clbk )

[Creates][github-create-token] a Github OAuth access [token][github-token].

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop'
};

createToken( opts, clbk );

function clbk( error, results, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( results ) );
	/* returns
		// TODO
	*/
}
```

The `function` accepts the following `options`:
*	__username__: Github username (*required*).
* 	__password__: Github password (*required*).
*	__scopes__: list of scopes (*required*).
*	__note__: a note as to the purpose of the [token][github-token] (*required*).
*	__otp__: Github one-time password (2-factor authentication).
*	__note_url__: an app URL if authorizing an application.
*	__client_id__: a `20` character OAuth app client key for which to create the [token][github-token].
*	__client_secret__: a `40` character OAuth app client secret for which to create the [token][github-token].
*	__fingerprint__: a unique `string` to distinguish a token from others created for the same client id and user.
*	__useragent__: [user agent][github-user-agent] `string`.

The `function` __only__ supports basic authentication using a `username` and `password`. To [authenticate][github-oauth2] with Github, set the `username` and `password` options.

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop',
	'scopes': [ 'public_repo' ],
	'note': 'for my beepboop app'
};

createToken( opts, clbk );
```

To specify a [user agent][github-user-agent], set the `useragent` option.

``` javascript
var opts = {
	'username': 'beep',
	'password': 'boop',
	'scopes': [ 'public_repo' ],
	'note': 'for my beepboop app',
	'useragent': 'hello-github!'
};

createToken( opts, clbk );
```


## Notes

*	[Rate limit][github-rate-limit] information includes the following:
	-	__limit__: maximum number of requests a consumer is permitted to make per hour.
	-	__remaining__: number of remaining requests.
	-	__reset__: time at which the current [rate limit][github-rate-limit] window resets in [UTC seconds][unix-time].


---
## Examples

``` javascript
var createToken = require( 'github-create-token' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g github-create-token
```


### Usage

``` bash
Usage: ghcreatetoken [options]

Options:

  -h,  --help                      Print this message.
  -V,  --version                   Print the package version.
       --username username         Github username.
       --password password         Github password.
       --otp password              Github one-time password.
  -ua, --useragent ua              User agent.
       --scopes scope1,scope2,...  List of scopes.
       --note note                 Token note.
       --note_url url              Application URL.
       --client_id id              Client id.
       --client_secret secret      Client secret.
       --fingerprint fingerprint   Unique token identifier.
```


### Notes

*	In addition to the `username` and `password` options, a `username` and `password` may also be specified by `GITHUB_USERNAME` and `GITHUB_PASSWORD` environment variables. The command-line options __always__ take precedence.
*	[Token][github-token] information is written to `stdout`.
*	[Rate limit][github-rate-limit] information is written to `stderr`.


### Examples

Setting a username and password using the command-line options:

``` bash
$ DEBUG=* ghcreatetoken --username <username> --password <password> --scopes=read_org,repo_status --note 'for my beepboop app'
# => '{...}'
```

Setting a username and password using environment variables:

``` bash
$ DEBUG=* GITHUB_USERNAME=<username> GITHUB_PASSWORD=<password> ghcreatetoken --scopes=read_org,repo_status --note 'for my beepboop app'
# => '{...}'
```

For local installations, modify the command to point to the local installation directory; e.g., 

``` bash
$ DEBUG=* ./node_modules/.bin/ghcreatetoken --username <username> --password <password> --scopes=read_org,repo_status --note 'for my beepboop app'
# => '{...}'
```

Or, if you have cloned this repository and run `npm install`, modify the command to point to the executable; e.g., 

``` bash
$ DEBUG=* node ./bin/cli --username <username> --password <password> --scopes=read_org,repo_status --note 'for my beepboop app'
# => '{...}'
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/github-create-token.svg
[npm-url]: https://npmjs.org/package/github-create-token

[build-image]: http://img.shields.io/travis/kgryte/github-create-token/master.svg
[build-url]: https://travis-ci.org/kgryte/github-create-token

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/github-create-token/master.svg
[coverage-url]: https://codecov.io/github/kgryte/github-create-token?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/github-create-token.svg
[dependencies-url]: https://david-dm.org/kgryte/github-create-token

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/github-create-token.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/github-create-token

[github-issues-image]: http://img.shields.io/github/issues/kgryte/github-create-token.svg
[github-issues-url]: https://github.com/kgryte/github-create-token/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[unix-time]: http://en.wikipedia.org/wiki/Unix_time

[github-api]: https://developer.github.com/v3/
[github-token]: https://github.com/settings/tokens/new
[github-oauth2]: https://developer.github.com/v3/#oauth2-token-sent-in-a-header
[github-user-agent]: https://developer.github.com/v3/#user-agent-required
[github-rate-limit]: https://developer.github.com/v3/rate_limit/
[github-create-token]: https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization
