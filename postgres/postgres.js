var pg = require('pg');

// Process CL args
if (process.argv.length != 6) {
	console.log("usage: node postgres.js username password db query");
	process.exit(1);
}

var username = process.argv[2];
var password = process.argv[3];
var db = process.argv[4];
var queryStr = process.argv[5];

// Create the connection string
var conStr = "postgres://" + username + ":"  + password + "@localhost/" + db;

// Create client, attempt to connect
var client = new pg.Client(conStr);
client.connect(function(err) {
	if (err) {
		return console.error('connection failed:', err);
	}
	var query = client.query(queryStr);
	query.on('error', function(error) {
		console.error('error running query', error);
		client.end();
	});
	query.on('row', function(row) {
		console.log(row);
	});
	query.on('end', function(result) {
		console.log('query complete');
		client.end();
	});
});
