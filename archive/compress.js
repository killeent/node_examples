// Compresses the files in a directory into a .tar.gz file

var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var fstream = require('fstream');

// usage: node compress.js [directory] [name]
if (process.argv.length != 4) {
	console.log('usage: node compress.js directory name');
	process.exit(1);
}

// verify directory argument
var directory = process.argv[2];
var stat = fs.stat(directory, function (err, stats) {
	// todo: read more about errors in Node.js
	if (err) {
		console.log(err);
		process.exit(1);
	}

	if (!stats.isDirectory()) {
		console.log('%s is not a directory', directory);
		process.exit(1);
	}
});

// create the output file stream
var output = fs.createWriteStream(process.argv[3]);
output.on('error', function(err) {
	console.log(err);
	process.exit(1);
});

// packer
var packer = tar.Pack();
packer.on('error', function(err) {
	console.log(err);
	process.exit(1);
});

// let's do it
fstream.Reader(directory).pipe(packer).pipe(zlib.createGzip()).pipe(output);
