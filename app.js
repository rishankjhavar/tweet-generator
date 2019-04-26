var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var logic = require("./logic.js");

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*/css',express.static('public/css'));

app.get("/", (req, res) => {
  res.render("render");
});

app.post('/', async function(req, res) {
  var result  = await logic.generateTweet(req.body.dateselect, req.body.entity);
  res.render("render", {result});
    });

app.listen(process.env.PORT || 4000, function(){
      console.log('Server is running');
    });