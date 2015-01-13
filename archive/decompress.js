// Extracts the files in a .tar.gz; mimics running gunzip [file.tar.gz] 
// followed by tar -xf [file.tar]

var fs = require('fs');
var tar = require('tar');
var zlib = require('zlib');
var path = require('path');

// usage: node decompress.js [file.tar.gz] [path]
if (process.argv.length != 4) {
	console.log("usage: node decompress.js [filename].tar.gz path");
	process.exit(1);
}

// create read stream
var rs = fs.createReadStream(process.argv[2]);
rs.on('error', function(err) {
	console.log(err);
	process.exit(1);
});

// create 'Gunzip'-er
var gunzip = zlib.createGunzip();

// create extractor stream
var extractor = tar.Extract(
{
	path: process.argv[4]
});
extractor.on('error', function(err) {
	console.log(err);
	process.exit(1);
});

// let's do it!
rs.pipe(gunzip).pipe(extractor);