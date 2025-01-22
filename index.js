// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  let obj = {unix: null, utc: null};

  if (req.params.date) {
    let date = new Date(req.params.date);
    obj.unix = date.getTime();
    obj.utc = date.toUTCString();
  } else {
    obj.unix = Date.now();
    obj.utc = new Date().toUTCString();
  }

  res.json(obj);
})

app.get('/api/:unix', (req, res) => {
  let obj = {unix: null, utc: null};
  obj.unix = req.params.unix;
  obj.utc = new Date(req.params.unix).toUTCString();
  res.json(obj);
})

app.get('/api', (req, res) => {
  let obj = {unix: null, utc: null};
  obj.unix = Date.now();
  obj.utc = new Date().toUTCString();
  res.json(obj);
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
