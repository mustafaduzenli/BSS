// server.js

// set up ======================================================================
// get all the tools we need
var express      = require('express');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var morgan       = require('morgan');
var app          = express();
var port         = process.env.PORT || 8080;

var passport     = require('passport');
var flash        = require('connect-flash');
//var request      = require('request');

// configuration ===============================================================
// connect to our database

require('./server/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//app.set('view engine', 'ejs'); // set up ejs for templating
var fs = require('fs'); // this engine requires the fs module
app.engine('html', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString();
    return callback(null, rendered);
  })
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'html'); // register the template engine

// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./server/route.js')(app, passport); 

/*
// Action: perform a redirect to the home page (index.html)   
function home(req, res) {
   app.use(express.static(__dirname + '/webapp'));
   res.redirect('/index.html');
}
function hometest(req, res) {
   app.use(express.static(__dirname + '/webapp/test'));
   res.redirect('/testService.html');
}

// Now we will set up the routing for the server...
// Look if the request is for a static file in the public directory
// this is where the client side html, css, js and SAPUI5 resources are located
//app.use(express.static(__dirname + '/webapp'));

// If you just call the server (root), redirect to homepage
app.get('/', home);
app.get('/test', hometest);

// Requests starting '/proxy/' are proxied to the ODATA

app.use('/proxy', function(req, res) {  
  var url = req.url.replace('/http/','http://');
  req.pipe(request(url)).pipe(res);
});*/

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
console.log('Current directory: ' + process.cwd());
console.log('__dirname: ' + __dirname);
