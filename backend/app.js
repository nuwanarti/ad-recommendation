var express = require('express');
var cors = require('cors')

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongodb-session')(session);

// connect to a database
// mongodb://<user>:<password>@<host>/<database>
// mongoose.connect('mongodb://lintang:1234@localhost/signin');
mongoose.connect('mongodb+srv://lahiru2:lahiru2@cluster0.ce9ph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
//mongoose.connect('mongodb+srv://nuwanarti:nuwanarti@cluster0.ocds4.mongodb.net/myFirstDatabase')
// mongoose.connect('mongodb://localhost:27017/recommendersystems')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});

app.use(cors())
// use express-sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  // store: MongoStore.create({ mongoUrl: 'mongodb://lintang:1234@localhost/signin'})
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser({limit: '100mb'}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static(__dirname + '/views'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler, define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3210
app.listen(3210, function () {
  console.log('Listening on port 3210...');
});