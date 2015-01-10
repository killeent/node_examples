var net = require('net')
var strftime = require('strftime')

if (process.argv.length < 3) {
	console.log('usage: node tcp_server port#')
	process.exit(1)
}

// get the port specified by the user
var port = process.argv[2]

// create a new TCP server
var server = net.createServer()

// when someone connects to the server, respond with the
// datetime and close the connection
server.on('connection', function(socket) {
	socket.end(strftime('%F %R\n').toString(), 'utf8')
})

// log error if the user specifies a port already in use
server.on('error', function(err) {
	if (err.code == 'EADDRINUSE') {
		console.log("Port %d already in use", port)
		server.close()
	}
})

// list on the port specified by the command line argument
server.listen(port, function() {
	console.log('Server listening on port %d', port)
})