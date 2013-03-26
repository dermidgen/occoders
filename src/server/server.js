var fs = require('fs');
var ws = require('ws').Server;
var http = require('http');

var config = JSON.parse(fs.readFileSync('config.json','utf8'));

var DEBUG_VERBOSE = 4
var DEBUG_INFO = 3
var DEBUG_WARNING = 2
var DEBUG_ERROR = 1
var DEBUG_MSG = 0
var debugLevel = 4;

var http_s = http.createServer(function(req, res){
	if (req.url === '/login/oauth/github') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<!DOCTYPE html><html><head><title>Github Auth</title></head><body></body></html>');
	}
	res.writeHead(400, {'Content-Type': 'text/html'});
	res.end('<!DOCTYPE html><html><head><title>Bad Request</title></head><body><h1>Error 400 - Bad Request</h1>This server does not accept HTTP connnections.</body></html>');
}).listen(1337);

var ws_s = new ws({server: http_s});

var debug = function(msg,level,type){
	if (level === null) level = DEBUG_INFO;
	if (type === null) type = 'log';
	if (debugLevel >= level) {
		switch(type){
			case 'log':
				console.log.apply(console,msg);
			break;
			case 'dir':
				console.dir.apply(console,msg);
			break;
			default:
				console.log.apply(console,msg);
		}
	}
};

var server = function()
{
	var _msg = function(socket, data){
		debug(['Socket message recieved',socket,data],DEBUG_VERBOSE,'dir');
	};

	var _close = function(socket, data){
		debug(['Socket closed',socket,data],DEBUG_VERBOSE,'dir');
		if (socket.session) socket.session.close();
	};

	var _open = function(socket){
		debug(['Socket opened',socket],DEBUG_VERBOSE,'dir');
		socket.on('message', function(data){ _msg(socket,data) });
		socket.on('close', function(data){ _close(socket,data); });
		_init(socket);
	};

	var _init = function(socket){
		var user = {uid:1001,name:"John Doe"};
		var session = new server.session(socket, user);
		debug(['Session init',session],DEBUG_INFO,'dir');
	};

	ws_s.on('connection', function (socket){
		_open(socket);
	});

	debug(['Server started'],DEBUG_INFO,'log');
};

server._instance = null;
server.getInstance = function()
{
	if (server._instance === null) server._instance = new server();
	return server._instance;
};

server.session = function(socketRef, userObj)
{
	var socket = null;
	var user = null;
	var tkn = null;
	var authd = false;

	var createToken = function(){
		var d = new Date();
		return d.getMilliseconds();
	};

	this.start = function(socketRef, userObj){
		socket = socketRef;
		user = userObj;
		tkn = createToken();
		socket.session = this;
	};

	this.close = function(){

	};

	this.authorize = function(code){

	};

	this.token = function(newToken){
		if (newToken === true) tkn = createToken();
		return tkn;
	};

	if (socketRef && userObj) this.start(socketRef,userObj)
};

exports.occoders = server;