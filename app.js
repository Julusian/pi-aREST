// Require
var express = require('express');
var gpio = require("pi-gpio");

// Create app
var app = express();

// Parameters
var id = 'cQ4eR';
var name = 'my_pi';

// Id
app.get('/id', function(req, res){
  
  var answer = new Object();
  answer.id = id;
  answer.name  = name;
  answer.connected = true;
  
  res.json(answer);
});

// Analog
app.get('/analog/:pin/:state', function(req, res){
  res.send('Analog command' + req.params.pin + req.params.state);
});

app.get('/analog/:pin', function(req, res){
  res.send('Analog command' + req.params.pin);
});

// Digital write
app.get('/digital/:pin/:state', function(req, res){

  var answer = new Object();

  answer.id = id;
  answer.name  = name;
  answer.connected = true;

  answer.message = 'Pin ' + req.params.pin + ' set to ' + req.params.state;

  gpio.open(parseInt(req.params.pin), "output", function(err) {     
    gpio.write(parseInt(req.params.pin), parseInt(req.params.state), function() {  
      gpio.close(parseInt(req.params.pin));                   
    });
  });

  // Send answer
  res.json(answer);
});

// Digital read
app.get('/digital/:pin', function(req, res){

  var answer = new Object();

  answer.id = id;
  answer.name  = name;
  answer.connected = true;

  gpio.open(parseInt(req.params.pin), "input", function(err) {
    gpio.read(parseInt(req.params.pin), function(err, value) {
      answer.return_value = value;
       gpio.close(parseInt(req.params.pin));  
    });
  });
  
  // Send answer
  res.json(answer);

});

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});