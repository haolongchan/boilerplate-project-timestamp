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

app.get('/api/:input', (req, res) => {
  let obj = {unix: null, utc: null};
  let input = req.params.input;

  if (/^\d+$/.test(input)) {
    // Numeric Unix timestamp
    let unixTime = parseInt(input, 10);
    obj.unix = unixTime;
    obj.utc = new Date(unixTime).toUTCString();
  } else {
    // String date
    let date = new Date(input);
    if (!isNaN(date.getTime())) {
      obj.unix = date.getTime();
      obj.utc = date.toUTCString();
    } else {
      return res.status(400).json({error: "Invalid Date"});
    }
  }

  res.json(obj);
});


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
