### tcp\_server

tcp\_server is a simple TCP server that listens for connections on a specific port
and responds to connections by writing the datetime to the socket and closing the
connection.

#### usage

`node tcp_server.js port#`

One can easily test the TCP server using telnet:

`telnet localhost port#`
