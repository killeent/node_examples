var fs = require('fs');
var Twit = require('twit');

if (process.argv.length != 3) {
	console.log('usage: node twitter.js hashtag');
	process.exit(1);
}

var hashtag = process.argv[2];

// read in keys from file
var keys = JSON.parse(fs.readFileSync('./keys', 'utf8'));

var client = new Twit({
  consumer_key: keys['CONSUMER_KEY'],
  consumer_secret: keys['CONSUMER_SECRET'],
  access_token: keys['ACCESS_TOKEN'],
  access_token_secret: keys['ACCESS_TOKEN_SECRET']
});

// create a stream of statuses filtered by the user-specified hashtag
var stream = client.stream('statuses/filter', { track: '#' + hashtag });

stream.on('tweet', function(tweet) {
	console.log(tweet);
});

stream.on('error', function(error) {
	console.log(error);
});