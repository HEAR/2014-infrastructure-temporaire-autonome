// http://expressjs.com/starter/generator.html

//var express      = require('express');
var express      = require('express.io');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var routes       = require('./routes/index');
var users        = require('./routes/users');
var app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Send the client html.
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client.html')
})


/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * EXPRESS.IO
 * sert à créer un socket entre le serveur et la client
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
 */
// npm install express.io
app.http().io();
// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
    req.io.emit('talk', {
        from:'dark vador',
        message: 'io event from an io route on the server'
    })
})

app.listen(7076);



/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ITA irc
 * permet créer un client nodeJS IRC
 * npm install irc --save
 * https://github.com/martynsmith/node-irc/tree/0.3.x
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
 */
var irc = require('irc');


var config = {
    address : 'irc.freenode.net',
    pseudo  : 'loloSuper',
    room    : '#kiwiirc-default',
    port    : 6667
};


var client = new irc.Client(config.address, config.pseudo, {
    channels: [config.room],
});

client.addListener('message', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);

    app.io.broadcast('talk', {
        from : from,
        to : to,
        message: message
    })
});

//client.join(room+' yourpass');
//client.say(config.room, "I'm a bot!");

client.addListener('error', function(message) {
    console.log('error: ', message);
});

client.addListener('registered', function(message) {
    console.log('registered: ', message);

    client.say(config.room, "I'm a bot!");
});


module.exports = app;
