module.exports = function (server) {
	var util = require('util')
	const IO = require( 'koa-socket.io' )
	const io = new IO()
	io.use(function* (next){
		let start = new Date()
		yield next;
		console.log( `response time: ${ new Date() - start }ms` )
	})
	io.use( function* (next ) {
		this.process = process.pid
		yield next;
	})

	io.use( function *(next ) {
		// ctx is passed along so ctx.process is now available
		console.log( this.process )
	})


	io.on('connection', function *(next){
		process.socket = this.socket
		console.log('a user connected');

	});

	io.start(server);
}